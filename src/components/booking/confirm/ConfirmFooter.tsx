import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Lock } from 'lucide-react-native';
import { verticalScale } from '../../../utils/responsive';

interface Props {
  originalPrice: number;
  finalPrice: number;
  onConfirm: () => void;
}

const ConfirmFooter = ({ originalPrice, finalPrice, onConfirm }: Props) => {
  return (
    <View
      className="bg-white px-5 pt-4 border-t border-gray-100"
      style={{ paddingBottom: verticalScale(30) }}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-xs text-gray-500">Tổng tiền</Text>
          <View className="flex-row items-baseline">
            <Text className="text-xl font-bold text-primary mr-2">
              {finalPrice.toLocaleString('vi-VN')}đ
            </Text>
            <Text className="text-xs text-gray-400 line-through">
              {originalPrice.toLocaleString('vi-VN')}đ
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onConfirm}
          className="bg-primary px-8 py-3.5 rounded-2xl shadow-sm shadow-primary/30"
        >
          <Text className="text-white font-bold text-base">
            Xác nhận đặt bàn
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center mt-2">
        <Lock size={10} color="#94a3b8" />
        <Text className="text-[10px] text-gray-400 ml-1">
          Thông tin của bạn được bảo mật
        </Text>
      </View>
    </View>
  );
};

export default ConfirmFooter;
