import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  Utensils,
  CircleDollarSign,
  Clock,
  Car,
  Wifi,
} from 'lucide-react-native';
import { Restaurant } from '../../../data/restaurants';
import { COLORS } from '../../../constants/theme';

interface Props {
  restaurant: Restaurant;
}

const DetailQuickInfo = ({ restaurant }: Props) => {
  const hasParking = restaurant.amenities?.includes('parking');
  const hasWifi = restaurant.amenities?.includes('wifi');

  const infoItems = [
    {
      id: 'hours',
      title: 'Giờ mở cửa',
      value: restaurant.openingHours || 'Đang cập nhật',
      icon: <Clock size={20} color={COLORS.primary} />,
    },
    {
      id: 'parking',
      title: 'Chỗ đỗ xe',
      value: hasParking ? 'Có' : 'Không',
      icon: <Car size={20} color={COLORS.primary} />,
    },
    {
      id: 'wifi',
      title: 'Wifi',
      value: hasWifi ? 'Miễn phí' : 'Không',
      icon: <Wifi size={20} color={COLORS.primary} />,
    },
  ];

  return (
    <View className="px-0 mb-6 mt-4">
      <View className=" rounded-2xl overflow-hidden py-4 bg-white border border-gray-200 shadow-white ">
        <View className="flex-row items-center justify-between px-2">
          {infoItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <View className="flex-1 items-center justify-center px-1">
                <View className="bg-primary/10 w-10 h-10 rounded-full items-center justify-center mb-2">
                  {item.icon}
                </View>
                <Text
                  className="text-[13px] text-gray-800 font-medium mb-1 text-center"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-xs text-gray-500 text-center"
                  numberOfLines={1}
                >
                  {item.value}
                </Text>
              </View>

              {/* Divider */}
              {index < infoItems.length - 1 && (
                <View className="w-[1px] h-10 bg-gray-200 self-center" />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DetailQuickInfo;
