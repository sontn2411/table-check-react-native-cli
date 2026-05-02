import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  handleBooking: () => void;
  insetsBottom: number;
}

const DetailFooter = ({ handleBooking, insetsBottom }: Props) => {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5"
      style={{ paddingBottom: insetsBottom + 8, paddingTop: 12 }}
    >
      <View className="flex-row items-center justify-center">
        <TouchableOpacity
          onPress={handleBooking}
          className="flex-1 bg-primary py-3.5 rounded-2xl shadow-sm shadow-primary/30 items-center justify-center"
        >
          <Text className="text-white font-bold text-[15px]">Đặt bàn ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailFooter;
