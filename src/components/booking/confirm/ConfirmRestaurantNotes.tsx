import React from 'react';
import { View, Text } from 'react-native';
import { Clock, Info, CreditCard } from 'lucide-react-native';

const ConfirmRestaurantNotes = () => {
  return (
    <View className="px-5 mb-10">
      <Text className="text-base font-bold text-gray-900 mb-3">
        Lưu ý từ nhà hàng
      </Text>
      <View className="bg-primary/5 p-4 rounded-3xl">
        <View className="flex-row items-start mb-3">
          <Clock size={14} color="#8e4ae7" className="mt-0.5" />
          <Text className="text-xs text-gray-600 ml-2 flex-1">
            Nhà hàng sẽ giữ bàn trong 15 phút kể từ thời gian đặt.
          </Text>
        </View>
        <View className="flex-row items-start mb-3">
          <Info size={14} color="#8e4ae7" className="mt-0.5" />
          <Text className="text-xs text-gray-600 ml-2 flex-1">
            Vui lòng đến đúng giờ để có trải nghiệm tốt nhất.
          </Text>
        </View>
        <View className="flex-row items-start">
          <CreditCard size={14} color="#8e4ae7" className="mt-0.5" />
          <Text className="text-xs text-gray-600 ml-2 flex-1">
            Có thể tính phí nếu không đến hoặc hủy muộn.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmRestaurantNotes;
