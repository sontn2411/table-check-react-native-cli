import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Users, Edit2 } from 'lucide-react-native';

interface Props {
  date: Date;
  time: string;
  guests: string | number;
  onEdit: (type: 'date' | 'time' | 'guests') => void;
}

const ConfirmBookingInfo = ({ date, time, guests, onEdit }: Props) => {
  return (
    <View className="px-5 mb-6">
      <Text className="text-base font-bold text-gray-900 mb-3">
        Thông tin đặt bàn
      </Text>
      <View className="flex-row bg-white rounded-2xl items-center py-1 border border-gray-100">
        {/* Date */}
        <TouchableOpacity
          onPress={() => onEdit('date')}
          activeOpacity={0.7}
          className="flex-1 p-3 relative items-center"
        >
          <View className="flex-row items-center mb-1">
            <Calendar size={14} color="#8e4ae7" />
            <Text className="text-xs text-gray-500 ml-1">Ngày</Text>
          </View>
          <Text className="text-sm font-bold text-gray-900 mt-1 text-center">
            {date.toLocaleDateString('vi-VN')}
          </Text>
          <View className="absolute top-2 right-1 bg-gray-100 p-1 rounded-full">
            <Edit2 size={10} color="#94a3b8" />
          </View>
        </TouchableOpacity>

        <View className="w-[1px] h-8 bg-gray-100" />

        {/* Time */}
        <TouchableOpacity
          onPress={() => onEdit('time')}
          activeOpacity={0.7}
          className="flex-1 p-3 relative items-center"
        >
          <View className="flex-row items-center mb-1">
            <Clock size={14} color="#8e4ae7" />
            <Text className="text-xs text-gray-500 ml-1">Giờ</Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Text className="text-sm font-bold text-gray-900 text-center">
              {time}
            </Text>
          </View>
          <View className="absolute top-2 right-1 bg-gray-100 p-1 rounded-full">
            <Edit2 size={10} color="#94a3b8" />
          </View>
        </TouchableOpacity>

        <View className="w-[1px] h-8 bg-gray-100" />

        {/* Guests */}
        <TouchableOpacity
          onPress={() => onEdit('guests')}
          activeOpacity={0.7}
          className="flex-1 p-3 relative items-center"
        >
          <View className="flex-row items-center mb-1">
            <Users size={14} color="#8e4ae7" />
            <Text className="text-xs text-gray-500 ml-1">Số người</Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Text className="text-sm font-bold text-gray-900 text-center">
              {guests}
            </Text>
          </View>
          <View className="absolute top-2 right-1 bg-gray-100 p-1 rounded-full">
            <Edit2 size={10} color="#94a3b8" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmBookingInfo;
