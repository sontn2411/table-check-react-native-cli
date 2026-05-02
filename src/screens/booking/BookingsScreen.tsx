import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import SafeScreen from '../../components/SafeScreen';
import HeaderCustom from '../../components/HeaderCustom';
import BookingFilter from '../../components/booking/BookingFilter';
import BookingBottomSheet from '../../components/BookingBottomSheet';
import LocationBottomSheet from '../../components/LocationBottomSheet';
import RestaurantCard from '../../components/common/RestaurantCard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLocationStore } from '../../store/useLocationStore';
import { useBookingStore } from '../../store/useBookingStore';
import { MOCK_RESTAURANTS } from '../../data/restaurants';
import { LOCATION_COORDS } from '../../data/booking';

const BookingsScreen = () => {
  const { t } = useTranslation();
  const { location, setLocation } = useBookingStore();

  const bookingSheetRef = useRef<BottomSheetModal>(null);
  const locationSheetRef = useRef<BottomSheetModal>(null);

  const [bookingType, setBookingType] = useState<'date' | 'time' | 'guests'>(
    'date',
  );

  // Filter restaurants based on location
  const filteredRestaurants = React.useMemo(() => {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/thành phố|tp\.|quận|q\.|phường|p\./gi, '')
        .trim();

    const normalizedLocation = normalize(location);

    return MOCK_RESTAURANTS.filter(restaurant => {
      const normalizedAddress = normalize(restaurant.address);
      return (
        normalizedAddress.includes(normalizedLocation) ||
        normalizedLocation.includes(normalizedAddress)
      );
    });
  }, [location]);

  const handleOpenBookingSheet = (type: 'date' | 'time' | 'guests') => {
    setBookingType(type);
    bookingSheetRef.current?.present();
  };

  const handleOpenLocationSheet = () => {
    locationSheetRef.current?.present();
  };

  const handleSelectLocation = (loc: string) => {
    if (loc === 'Vị trí hiện tại') {
      const globalCity = useLocationStore.getState().cityName;
      setLocation(globalCity);
      return;
    }
    setLocation(loc);
  };

  return (
    <SafeScreen>
      <ScrollView className="flex-1 mb-20" showsVerticalScrollIndicator={false}>
        <HeaderCustom
          title={t('bookings')}
          subtitle="Tìm bàn trống phù hợp với bạn"
        />
        <BookingFilter
          onOpenSheet={handleOpenBookingSheet}
          onOpenLocation={handleOpenLocationSheet}
        />

        <View className="px-5 mt-8 pb-10">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-lg font-bold text-gray-900">
              {filteredRestaurants.length > 0
                ? `Nhà hàng tại ${location.split(',')[0]}`
                : 'Gợi ý cho bạn'}
            </Text>
            <Text className="text-primary text-xs font-bold">
              {filteredRestaurants.length} kết quả
            </Text>
          </View>

          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(item => (
              <RestaurantCard
                key={item.id}
                restaurant={item}
                horizontal={false}
              />
            ))
          ) : (
            <View className="bg-gray-50 py-10 rounded-3xl items-center justify-center border border-gray-100 border-dashed">
              <Text className="text-gray-400 font-medium">
                {t('home.no_restaurants')}
              </Text>
              <TouchableOpacity
                onPress={handleOpenLocationSheet}
                className="mt-3 bg-primary/10 px-4 py-2 rounded-xl"
              >
                <Text className="text-primary font-bold text-xs">
                  Thay đổi vị trí
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Sheets */}
      <BookingBottomSheet ref={bookingSheetRef} initialType={bookingType} />

      <LocationBottomSheet
        ref={locationSheetRef}
        selectedLocation={location}
        onSelect={handleSelectLocation}
      />
    </SafeScreen>
  );
};

export default BookingsScreen;
