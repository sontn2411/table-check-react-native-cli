import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Heart, Ticket, Star } from 'lucide-react-native';

const QuickActions = () => {
  const actions = [
    { icon: Calendar, label: 'Lưu đặt bàn' },
    { icon: Heart, label: 'Yêu thích' },
    { icon: Ticket, label: 'Mã giảm giá' },
    { icon: Star, label: 'Điểm tích lũy' },
  ];

  return (
    <View className="mt-4 mx-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <View className="flex-row items-center py-4">
        {actions.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-1 items-center ${
              index !== actions.length - 1 ? 'border-r border-gray-200' : ''
            }`}
          >
            <item.icon color="#8e4ae7" size={24} strokeWidth={1.5} />
            <Text className="text-[11px] font-bold text-gray-800 mt-2">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="bg-purple-50/30 py-2 items-center border-t border-gray-100">
        <Text className="text-[10px] text-gray-400 italic">
          Đăng nhập để xem thông tin chi tiết
        </Text>
      </View>
    </View>
  );
};

export default QuickActions;
