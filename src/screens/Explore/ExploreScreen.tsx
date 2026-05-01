import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  SlidersHorizontal,
  Calendar,
  Target,
  Navigation2,
} from 'lucide-react-native';
import { scale } from '../../utils/responsive';
import { MOCK_RESTAURANTS, Restaurant } from '../../data/restaurants';
import { useTranslation } from 'react-i18next';
import { useLocationStore } from '../../store/useLocationStore';

// Components
import ExploreHeader from '../../components/explore/ExploreHeader';
import ExploreSearchBar from '../../components/explore/ExploreSearchBar';
import ExploreFilterList from '../../components/explore/ExploreFilterList';
import ExploreMapControls from '../../components/explore/ExploreMapControls';
import ExploreRestaurantMarker from '../../components/explore/ExploreRestaurantMarker';
import ExploreBottomSheet from '../../components/explore/ExploreBottomSheet';

const { width, height } = Dimensions.get('window');

const ExploreScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  // Vị trí từ store toàn cục
  const { latitude, longitude, cityName, loading } = useLocationStore();

  const currentRegion = useMemo(
    () => ({
      latitude,
      longitude,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    }),
    [latitude, longitude],
  );

  const cityRestaurants = useMemo(() => {
    const isNhaTrang = cityName?.toLowerCase().includes('nha trang');
    return MOCK_RESTAURANTS.filter(item => {
      const addressLower = item.address.toLowerCase();
      if (isNhaTrang) {
        return addressLower.includes('nha trang');
      } else {
        return addressLower.includes('hà nội');
      }
    });
  }, [cityName]);

  // Di chuyển bản đồ khi có vị trí mới
  useEffect(() => {
    if (!loading && mapRef.current) {
      mapRef.current.animateToRegion(currentRegion, 800);
    }
  }, [loading, latitude, longitude]);

  const snapPoints = useMemo(() => ['10%', '40%'], []);

  const filters = [
    { id: 'filter', label: 'Bộ lọc', icon: SlidersHorizontal, badge: 1 },
    { id: 'table', label: 'Tìm bàn trống', icon: Calendar },
    { id: 'nearby', label: 'Gần tôi', icon: Target },
    { id: 'offers', label: 'Có ưu đãi', icon: Navigation2 },
  ];

  const handleMarkerPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    if (restaurant.latitude && restaurant.longitude) {
      mapRef.current?.animateToRegion(
        {
          // Trừ 0.005 (thay vì 0.012) để đẩy marker xuống dưới một chút
          // Giúp cho Callout popup (nằm trên marker) hiển thị ngay giữa phần bản đồ trống
          latitude: restaurant.latitude - 0.005,
          longitude: restaurant.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
        500,
      );
    }
  };

  const handleDismissMarker = () => {
    setSelectedRestaurant(null);
  };

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(currentRegion, 500);
  };

  return (
    <View style={styles.container}>
      {/* Map Layer */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={currentRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        onPress={Keyboard.dismiss}
      >
        {cityRestaurants
          .filter(r => r.latitude && r.longitude)
          .map(restaurant => (
            <ExploreRestaurantMarker
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={selectedRestaurant?.id === restaurant.id}
              onPress={handleMarkerPress}
              onDismiss={handleDismissMarker}
            />
          ))}
      </MapView>

      {/* Top UI Overlay */}
      <View
        style={[styles.floatingUI, { paddingTop: insets.top }]}
        pointerEvents="box-none"
      >
        <ExploreHeader location={cityName} />
        <ExploreSearchBar />
        {/* <ExploreFilterList filters={filters} /> */}
      </View>

      {/* Map Controls */}
      <ExploreMapControls onRecenterPress={handleRecenter} />

      {/* Bottom Sheet */}
      <ExploreBottomSheet
        ref={bottomSheetRef}
        restaurants={cityRestaurants}
        selectedRestaurantId={selectedRestaurant?.id}
        onRestaurantPress={handleMarkerPress}
        snapPoints={snapPoints}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  floatingUI: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default ExploreScreen;
