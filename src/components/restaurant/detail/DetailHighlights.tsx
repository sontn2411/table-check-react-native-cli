import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Sun, Heart, ConciergeBell, Martini } from 'lucide-react-native';
import { COLORS } from '../../../constants/theme';

const HIGHLIGHTS = [
  { id: '1', label: 'View rooftop đẹp', icon: <Sun size={16} color={COLORS.primary} /> },
  { id: '2', label: 'Không gian lãng mạn', icon: <Heart size={16} color={COLORS.primary} /> },
  { id: '3', label: 'Phục vụ chuyên nghiệp', icon: <ConciergeBell size={16} color={COLORS.primary} /> },
  { id: '4', label: 'Cocktail', icon: <Martini size={16} color={COLORS.primary} /> },
];

const DetailHighlights = () => {
  return (
    <View className="mb-6">
      <Text className="text-base font-bold text-gray-900 mb-3 px-2">Điểm nổi bật</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {HIGHLIGHTS.map((item) => (
          <View 
            key={item.id} 
            className="flex-row items-center border border-gray-100 bg-white rounded-full px-4 py-2.5 mr-3 shadow-sm shadow-gray-100"
          >
            <View className="mr-2">
              {item.icon}
            </View>
            <Text className="text-[13px] text-gray-800 font-medium">{item.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailHighlights;
