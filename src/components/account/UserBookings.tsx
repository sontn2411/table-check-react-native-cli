import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight, MapPin, Calendar, Users } from 'lucide-react-native';

const UserBookings = () => {
  const { t } = useTranslation();
  return (
    <View className="mx-4 mt-8">
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-900">
          {t('settings.my_bookings')}
        </Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-primary text-xs font-medium mr-1">
            {t('settings.see_all')}
          </Text>
          <ChevronRight color="#8e4ae7" size={14} />
        </TouchableOpacity>
      </View>

      {/* Booking Card */}
      <TouchableOpacity
        activeOpacity={0.9}
        className="bg-white rounded-2xl py-2 px-2 border border-gray-50 shadow-sm flex-row items-center"
      >
        {/* Restaurant Image */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=300&auto=format&fit=crop',
          }}
          className="w-20 h-20 rounded-xl"
          resizeMode="cover"
        />

        {/* Content Section */}
        <View className="ml-4 flex-1">
          <View className="flex-row justify-between items-start">
            <Text className="text-gray-900 font-bold text-base flex-1 mr-2">
              Grill & Chill
            </Text>
            <View className="bg-primary/10 px-2 py-1 rounded-lg">
              <Text className="text-primary text-[10px] font-bold">
                {t('settings.upcoming')}
              </Text>
            </View>
          </View>

          {/* Location */}
          <View className="flex-row items-center mt-1">
            <MapPin color="#8e4ae7" size={12} />
            <Text
              className="text-gray-500 text-[10px] ml-1 flex-1"
              numberOfLines={1}
            >
              Steak • Quận Ba Đình, Hà Nội
            </Text>
          </View>

          {/* Date & Time */}
          <View className="flex-row items-center mt-2">
            <Calendar color="#8e4ae7" size={12} />
            <Text className="text-gray-500 text-[10px] ml-1">
              24/05/2025 • 19:00 • 2 {t('num_people', { count: 2 }).split(' ')[1]}
            </Text>
          </View>
        </View>

        {/* Chevron Center Right */}
        <ChevronRight color="#d1d5db" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default UserBookings;
