import { create } from 'zustand';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Mặc định: Nha Trang, Khánh Hòa
const DEFAULT_LAT = 12.2388;
const DEFAULT_LNG = 109.1968;
const DEFAULT_CITY = 'Nha Trang, Khánh Hòa';

interface LocationState {
  latitude: number;
  longitude: number;
  cityName: string;
  loading: boolean;
  permissionGranted: boolean | null; // null = chưa hỏi
  error: string | null;

  // Actions
  requestLocation: () => Promise<void>;
  setManualLocation: (
    cityName: string,
    latitude?: number,
    longitude?: number,
  ) => void;
}

const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=vi`,
      {
        headers: { 'User-Agent': 'TableCheckApp/1.0' },
      },
    );
    const data = await response.json();
    console.log('====', data);
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

export const useLocationStore = create<LocationState>((set, get) => ({
  latitude: DEFAULT_LAT,
  longitude: DEFAULT_LNG,
  cityName: DEFAULT_CITY,
  loading: false,
  permissionGranted: null,
  error: null,

  setManualLocation: (
    cityName,
    latitude = DEFAULT_LAT,
    longitude = DEFAULT_LNG,
  ) => {
    set({
      cityName,
      latitude,
      longitude,
    });
  },

  requestLocation: async () => {
    // Tránh gọi nhiều lần
    if (get().loading) {
      return;
    }

    set({ loading: true, error: null });

    // Xin quyền trên Android
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Quyền truy cập vị trí',
            message: 'Ứng dụng cần truy cập vị trí để tìm nhà hàng gần bạn.',
            buttonPositive: 'Đồng ý',
            buttonNegative: 'Từ chối',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          // Từ chối → giữ vị trí mặc định Nha Trang
          set({
            loading: false,
            permissionGranted: false,
            latitude: DEFAULT_LAT,
            longitude: DEFAULT_LNG,
            cityName: DEFAULT_CITY,
          });
          return;
        }
      } catch {
        set({ loading: false, permissionGranted: false });
        return;
      }
    }

    // Lấy vị trí thực
    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const cityName = await reverseGeocode(latitude, longitude);
        set({
          latitude,
          longitude,
          cityName,
          loading: false,
          permissionGranted: true,
          error: null,
        });
      },
      error => {
        console.warn('Geolocation error:', error.message);
        // Lỗi → giữ vị trí mặc định Nha Trang
        set({
          loading: false,
          permissionGranted: false,
          error: error.message,
          latitude: DEFAULT_LAT,
          longitude: DEFAULT_LNG,
          cityName: DEFAULT_CITY,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  },
}));
