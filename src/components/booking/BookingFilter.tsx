import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Calendar,
  Timer,
  Users,
  MapPin,
  ChevronDown,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '../../store/useBookingStore';
import { COLORS } from '../../constants/theme';

interface BookingFilterProps {
  onOpenSheet: (type: 'date' | 'time' | 'guests') => void;
  onOpenLocation: () => void;
}

const BookingFilter = ({ onOpenSheet, onOpenLocation }: BookingFilterProps) => {
  const { t, i18n } = useTranslation();
  const { date, time, guests, location } = useBookingStore();

  const formattedDate = date.toLocaleDateString(
    i18n.language === 'vi' ? 'vi-VN' : 'en-US',
    {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    },
  );

  return (
    <View
      style={styles.container}
      className="bg-white rounded-3xl mx-5 mt-4 p-5 shadow-sm border border-gray-50"
    >
      {/* Row 1: Date & Time */}
      <View className="flex-row items-center justify-between pb-5 border-b border-gray-100">
        {/* Date Slot */}
        <TouchableOpacity
          onPress={() => onOpenSheet('date')}
          className="flex-1 items-start pr-4 border-r border-gray-100"
        >
          <View className="flex-row items-center gap-3">
            <View className="bg-primary/5 p-2 rounded-xl">
              <Calendar size={20} color={COLORS.primary} strokeWidth={2} />
            </View>
            <View>
              <Text className="text-gray-400 text-[10px] font-medium ">
                {t('booking.date')}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-gray-900 text-sm font-bold mr-1">
                  {formattedDate}
                </Text>
                <ChevronDown size={14} color="#94a3b8" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Time Slot */}
        <TouchableOpacity
          onPress={() => onOpenSheet('time')}
          className="flex-1 items-start pl-4"
        >
          <View className="flex-row items-center gap-3">
            <View className="bg-primary/5 p-2 rounded-xl">
              <Timer size={20} color={COLORS.primary} strokeWidth={2} />
            </View>
            <View>
              <Text className="text-gray-400 text-[10px] font-medium ">
                {t('booking.time')}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-gray-900 text-sm font-bold mr-1">
                  {time}
                </Text>
                <ChevronDown size={14} color="#94a3b8" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Row 2: Guests & Location */}
      <View className="flex-row items-center justify-between pt-5">
        {/* Guests Slot */}
        <TouchableOpacity
          onPress={() => onOpenSheet('guests')}
          className="flex-1 items-start pr-4 border-r border-gray-100"
        >
          <View className="flex-row items-center gap-3">
            <View className="bg-primary/5 p-2 rounded-xl">
              <Users size={20} color={COLORS.primary} strokeWidth={2} />
            </View>
            <View>
              <Text className="text-gray-400 text-[10px] font-medium ">
                {t('booking.guests')}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-gray-900 text-sm font-bold mr-1">
                  {guests === '> 10'
                    ? guests
                    : t('num_people', { count: guests })}
                </Text>
                <ChevronDown size={14} color="#94a3b8" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Location Slot */}
        <TouchableOpacity
          onPress={onOpenLocation}
          className="flex-1 items-start pl-4"
        >
          <View className="flex-row items-center gap-3">
            <View className="bg-primary/5 p-2 rounded-xl">
              <MapPin size={20} color={COLORS.primary} strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-gray-400 text-[10px] font-medium ">
                {t('booking.your_location')}
              </Text>
              <View className="flex-row items-center">
                <Text
                  className="text-gray-900 text-sm font-bold mr-1"
                  numberOfLines={1}
                >
                  {location}
                </Text>
                <ChevronDown size={14} color="#94a3b8" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
});

export default BookingFilter;
