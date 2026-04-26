import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const BookingsScreen = () => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-2xl font-bold text-primary">Bookings Screen</Text>
    </View>
  );
};

export default BookingsScreen;
