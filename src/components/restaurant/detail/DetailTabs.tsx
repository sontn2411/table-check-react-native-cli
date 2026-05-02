import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MapPin, ChevronRight, ChevronDown } from 'lucide-react-native';
import { Restaurant } from '../../../data/restaurants';
import { COLORS } from '../../../constants/theme';
import { scale } from '../../../utils/responsive';

interface Props {
  restaurant: Restaurant;
  handleDirection: () => void;
}

const TABS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'menu', label: 'Thực đơn' },
  { id: 'images', label: 'Hình ảnh' },
  { id: 'reviews', label: 'Đánh giá' },
  { id: 'offers', label: 'Ưu đãi' },
];

const DetailTabs = ({ restaurant, handleDirection }: Props) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <View className="mb-8">
      {/* Tab Bar */}
      <View className="border-b border-gray-100 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className="mr-6 py-3"
              >
                <Text
                  className={`text-sm font-medium ${
                    isActive ? 'text-primary' : ''
                  }`}
                >
                  {tab.label}
                </Text>
                {isActive && (
                  <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <View className="">
        {activeTab === 'overview' && (
          <View className="flex-row items-start justify-between">
            {/* Left side: Description */}
            <View className="flex-1 pr-4">
              <Text className="text-base font-bold text-gray-900 mb-2">
                Giới thiệu
              </Text>
              <Text
                className="text-[13px] text-gray-600 leading-5"
                numberOfLines={isDescriptionExpanded ? undefined : 4}
              >
                {restaurant.description || 'Chưa có thông tin giới thiệu.'}
              </Text>
              <TouchableOpacity
                className="flex-row items-center mt-2"
                onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                <Text className="text-primary text-xs font-medium mr-1">
                  {isDescriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
                </Text>
                <ChevronDown
                  size={14}
                  color={COLORS.primary}
                  style={{
                    transform: [
                      { rotate: isDescriptionExpanded ? '180deg' : '0deg' },
                    ],
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Right side: Map Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleDirection}
              className="w-[150px] bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200 p-2"
            >
              {/* Map Placeholder */}
              <View className="h-[90px] bg-[#f0f3f5] rounded-xl items-center justify-center overflow-hidden mb-2 relative">
                {/* Decorative lines to look like roads */}
                <View className="absolute w-[120%] h-[2px] bg-white transform -rotate-12 top-4" />
                <View className="absolute w-[120%] h-[2px] bg-white transform 45deg bottom-6" />
                <View className="absolute w-[2px] h-[120%] bg-white left-8" />

                <View className="w-10 h-10 bg-primary/20 rounded-full items-center justify-center">
                  <View className="w-7 h-7 bg-primary rounded-full items-center justify-center shadow-sm">
                    <MapPin size={14} color="#fff" fill="#fff" />
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <Text
                  className="text-[10px] text-gray-700 font-medium flex-1 mr-1"
                  numberOfLines={2}
                >
                  {restaurant.address.replace(/Phường/gi, 'P.')}
                </Text>
                <ChevronRight size={14} color="#94a3b8" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Placeholders for other tabs */}
        {activeTab === 'menu' && (
          <Text className="text-gray-500 text-center py-4">
            Đang phát triển...
          </Text>
        )}
        {activeTab === 'images' && (
          <Text className="text-gray-500 text-center py-4">
            Đang phát triển...
          </Text>
        )}
        {activeTab === 'reviews' && (
          <Text className="text-gray-500 text-center py-4">
            Đang phát triển...
          </Text>
        )}
        {activeTab === 'offers' && (
          <Text className="text-gray-500 text-center py-4">
            Đang phát triển...
          </Text>
        )}
      </View>
    </View>
  );
};

export default DetailTabs;
