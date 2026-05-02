import React from 'react';
import { View, Text } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { Restaurant } from '../../../data/restaurants';
import { COLORS } from '../../../constants/theme';

interface Props {
  restaurant: Restaurant;
}

const DetailInfo = ({ restaurant }: Props) => {
  return (
    <View className="px-5  bg-gray-50 rounded-2xl pt-6 pb-5 border border-gray-200">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-3">
          <Text className="text-2xl font-bold text-gray-900">
            {restaurant.name}
          </Text>
          <View className="flex-row items-center mt-2">
            <View className="bg-amber-50 flex-row items-center px-2.5 py-1 rounded-lg">
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <Text className="text-sm font-bold text-amber-600 ml-1">
                {restaurant.rating}
              </Text>
            </View>
            <Text className="text-sm text-gray-400 ml-2">
              ({restaurant.reviews} đánh giá)
            </Text>
            <View className="bg-primary/10 px-3 py-1.5 rounded-full">
              <Text className="text-primary text-xs font-bold">
                {restaurant.category}
              </Text>
            </View>
          </View>
        </View>
        {restaurant.isFeatured && (
          <View className="bg-primary/10 px-3 py-1.5 rounded-full">
            <Text className="text-primary text-xs font-bold">HOT 🔥</Text>
          </View>
        )}
      </View>

      <View className="flex flex-row gap-1 items-center pl-2">
        <View className="bg-primary/10  rounded-xl">
          <MapPin size={18} color={COLORS.primary} />
        </View>
        <Text className="text-sm text-gray-900 font-medium">
          {restaurant.address.replace(/Phường/gi, 'P.')}
        </Text>
      </View>
    </View>
  );
};

export default DetailInfo;
