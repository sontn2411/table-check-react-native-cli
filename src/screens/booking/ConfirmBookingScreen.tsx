import React, { useState, useRef, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RootStackParamList } from '../../navigation/types';
import SafeScreen from '../../components/SafeScreen';
import { useBookingStore } from '../../store/useBookingStore';
import { useAuthStore } from '../../store/useAuthStore';

import ConfirmHeader from '../../components/booking/confirm/ConfirmHeader';
import ConfirmRestaurantCard from '../../components/booking/confirm/ConfirmRestaurantCard';
import ConfirmBookingInfo from '../../components/booking/confirm/ConfirmBookingInfo';
import ConfirmTableLocation from '../../components/booking/confirm/ConfirmTableLocation';
import ConfirmNote from '../../components/booking/confirm/ConfirmNote';
import ConfirmContactInfo from '../../components/booking/confirm/ConfirmContactInfo';
import ConfirmRestaurantNotes from '../../components/booking/confirm/ConfirmRestaurantNotes';
import ConfirmFooter from '../../components/booking/confirm/ConfirmFooter';
import BookingBottomSheet from '../../components/BookingBottomSheet';

type ConfirmBookingScreenRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmBooking'
>;

const ConfirmBookingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ConfirmBookingScreenRouteProp>();
  const { restaurant } = route.params;

  const { isAuthenticated } = useAuthStore();
  const { date, time, guests } = useBookingStore();
  const [selectedLocation, setSelectedLocation] = useState('indoor');
  const [note, setNote] = useState('');

  const bookingSheetRef = useRef<BottomSheetModal>(null);
  const [bookingType, setBookingType] = useState<'date' | 'time' | 'guests'>(
    'date',
  );

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) return null;

  const handleOpenBookingSheet = (type: 'date' | 'time' | 'guests') => {
    setBookingType(type);
    bookingSheetRef.current?.present();
  };

  return (
    <SafeScreen>
      <ConfirmHeader />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ConfirmRestaurantCard restaurant={restaurant} />

        <ConfirmBookingInfo
          date={date}
          time={time}
          guests={guests}
          onEdit={handleOpenBookingSheet}
        />

        <ConfirmTableLocation
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />

        <ConfirmNote note={note} onChangeNote={setNote} />

        <ConfirmContactInfo />

        <ConfirmRestaurantNotes />
      </ScrollView>

      <ConfirmFooter
        originalPrice={250000}
        finalPrice={200000}
        onConfirm={() => {
          // Xử lý xác nhận đặt bàn
        }}
      />

      <BookingBottomSheet
        ref={bookingSheetRef}
        initialType={bookingType}
        onClose={() => {}}
      />
    </SafeScreen>
  );
};

export default ConfirmBookingScreen;
