import React from 'react';
import { View, Text, Image } from 'react-native';
import { ChevronRight, Star, MapPin } from 'lucide-react-native';
import { scale } from '../../../utils/responsive';
import { Restaurant } from '../../../data/restaurants';

interface Props {
  restaurant: Restaurant;
}

const ConfirmRestaurantCard = ({ restaurant }: Props) => {
  return (
    <View className="bg-white p-4 m-5 rounded-2xl  flex-row">
      <Image
        source={{ uri: restaurant.image }}
        style={{ width: scale(80), height: scale(80), borderRadius: 16 }}
      />
      <View className="flex-1 ml-4 justify-between py-1">
        <View className="flex-row justify-between items-start">
          <Text
            className="text-base font-bold text-gray-900 flex-1"
            numberOfLines={1}
          >
            {restaurant.name}
          </Text>
          <ChevronRight color="#cbd5e1" size={18} />
        </View>

        <View className="flex-row items-center mt-1">
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <Text className="text-xs font-bold text-gray-700 ml-1">
            {restaurant.rating}
          </Text>
          <Text className="text-xs text-gray-400 ml-1">
            ({restaurant.reviews})
          </Text>
          <Text className="text-gray-300 mx-1.5">•</Text>
          <Text className="text-xs text-gray-500">{restaurant.category}</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <MapPin size={12} color="#8e4ae7" />
          <Text className="text-xs text-gray-500 ml-1 flex-1" numberOfLines={1}>
            {restaurant.address.replace(/Phường/gi, 'P.')}
          </Text>
        </View>

        <View className="bg-primary/10 self-start px-2 py-1 rounded-md mt-2">
          <Text className="text-[10px] text-primary font-medium">
            Ưu đãi -20%{' '}
            <Text className="text-gray-500">cho bàn đặt trước 20:00</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmRestaurantCard;
