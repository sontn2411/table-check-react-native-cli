import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

const UserRewardPoints = () => {
  return (
    <View className="mx-4 mt-4 bg-white rounded-2xl py-5 px-4 border border-gray-50 shadow-sm flex-row items-center">
      {/* Icon Section */}
      <View className="w-20 h-20 rounded-full bg-primary/5 items-center justify-center">
        <Image
          source={require('../../../assets/images/giftProfile.webp')}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      {/* Text Info Section */}
      <View className="ml-4 flex-1">
        <Text className="text-gray-500 text-xs mb-1">Điểm thưởng của bạn</Text>
        <Text className="text-primary text-xl font-bold">3.250 điểm</Text>
      </View>

      {/* Button Section */}
      <TouchableOpacity
        style={{ backgroundColor: '#8e4ae71a' }}
        className="px-4 py-2 rounded-full flex-row items-center"
      >
        <Text className="text-primary text-[10px] font-bold mr-1">
          Xem chi tiết
        </Text>
        <ArrowRight color="#8e4ae7" size={12} />
      </TouchableOpacity>
    </View>
  );
};

export default UserRewardPoints;
