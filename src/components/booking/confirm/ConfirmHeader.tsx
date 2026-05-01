import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmHeader = () => {
  const navigation = useNavigation();

  return (
    <View className="px-5 py-3">
      <View className="flex-row items-center relative h-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 z-10 p-2 -ml-2"
        >
          <ChevronLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-gray-900">
            Xác nhận đặt bàn
          </Text>
          <Text className="text-xs text-gray-500 mt-0.5">
            Vui lòng kiểm tra thông tin đặt bàn trước khi xác nhận
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmHeader;
