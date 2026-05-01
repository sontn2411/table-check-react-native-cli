import { useState, useEffect, useCallback } from 'react';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface LocationState {
  latitude: number;
  longitude: number;
  cityName: string;
  loading: boolean;
  error: string | null;
}

const DEFAULT_LOCATION: LocationState = {
  latitude: 21.0285,
  longitude: 105.8542,
  cityName: 'Hà Nội',
  loading: true,
  error: null,
};

/**
 * Hook lấy vị trí hiện tại của người dùng và reverse geocode thành tên thành phố.
 */
const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationState>(DEFAULT_LOCATION);

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=vi`,
        {
          headers: {
            'User-Agent': 'TableCheckApp/1.0',
          },
        },
      );
      const data = await response.json();
      // Ưu tiên: city → town → county → state
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.county ||
        data.address?.state ||
        'Không xác định';
      const state = data.address?.state || '';
      return state && city !== state ? `${city}, ${state}` : city;
    } catch {
      return 'Không xác định';
    }
  };

  const requestPermissionAndroid = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Quyền truy cập vị trí',
          message: 'Ứng dụng cần truy cập vị trí của bạn để tìm nhà hàng gần đây.',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Từ chối',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  };

  const fetchLocation = useCallback(async () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));

    // Request permission on Android
    if (Platform.OS === 'android') {
      const hasPermission = await requestPermissionAndroid();
      if (!hasPermission) {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: 'Quyền vị trí bị từ chối',
        }));
        return;
      }
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const cityName = await reverseGeocode(latitude, longitude);
        setLocation({
          latitude,
          longitude,
          cityName,
          loading: false,
          error: null,
        });
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { ...location, refetch: fetchLocation };
};

export default useCurrentLocation;
