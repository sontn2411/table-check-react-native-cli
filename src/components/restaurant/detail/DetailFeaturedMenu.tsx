import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ChevronRight, Plus } from 'lucide-react-native';
import { COLORS } from '../../../constants/theme';
import { MenuItem } from '../../../data/restaurants';
import { scale, verticalScale } from '../../../utils/responsive';

interface Props {
  menu?: MenuItem[];
}

const DetailFeaturedMenu = ({ menu }: Props) => {
  if (!menu || menu.length === 0) return null;

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-2 mb-4">
        <Text className="text-base font-bold text-gray-900">
          Món ăn nổi bật
        </Text>
        {/* <TouchableOpacity className="flex-row items-center">
          <Text className="text-primary text-[13px] font-medium mr-0.5">
            Xem thực đơn
          </Text>
          <ChevronRight size={14} color={COLORS.primary} />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {menu.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-2xl p-2 mr-3 border border-gray-100 shadow-sm shadow-gray-100"
            style={{ width: scale(150) }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: verticalScale(110),
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
            <View className="pt-3 pb-1 px-1">
              <Text
                className="text-[13px] font-medium text-gray-800 mb-2"
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] text-gray-900 font-bold">
                  {item.price}
                </Text>
                {/* <TouchableOpacity className="bg-primary/10 w-7 h-7 rounded-full items-center justify-center">
                  <Plus size={16} color={COLORS.primary} />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailFeaturedMenu;
