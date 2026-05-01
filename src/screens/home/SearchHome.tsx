import { Search } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Calendar, Timer, Users } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';

interface SearchHomeProps {
  onOpenSheet: (type: 'date' | 'time' | 'guests') => void;
}

import { useBookingStore } from '../../store/useBookingStore';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../navigation/types';

import { useLocationStore } from '../../store/useLocationStore';

const SearchHome = ({ onOpenSheet }: SearchHomeProps) => {
  const { t } = useTranslation();
  const { date, time, guests, setLocation } = useBookingStore();
  const { cityName } = useLocationStore();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

  const handleSearch = () => {
    // Đồng bộ địa điểm từ Home sang Booking trước khi chuyển trang
    setLocation(cityName);
    navigation.navigate('Bookings');
  };

  return (
    <View
      style={styles.container}
      className="bg-white rounded-2xl p-2 flex-row items-center"
    >
      {/* Date Section */}
      <TouchableOpacity
        onPress={() => onOpenSheet('date')}
        style={styles.section}
      >
        <View className="flex-row items-center gap-1 opacity-80 mb-1">
          <Calendar size={14} color={COLORS.primary} />
          <Text style={styles.label}>{t('booking.date')}</Text>
        </View>
        <Text style={styles.value}>{date.toLocaleDateString('vi-VN')}</Text>
      </TouchableOpacity>

      {/* Vertical Divider */}
      <View style={styles.divider} />

      {/* Time Section */}
      <TouchableOpacity
        onPress={() => onOpenSheet('time')}
        style={styles.section}
      >
        <View className="flex-row items-center gap-1 opacity-80 mb-1">
          <Timer size={14} color={COLORS.primary} />
          <Text style={styles.label}>{t('booking.time')}</Text>
        </View>
        <Text style={styles.value}>{time}</Text>
      </TouchableOpacity>

      {/* Vertical Divider */}
      <View style={styles.divider} />

      {/* Guests Section */}
      <TouchableOpacity
        onPress={() => onOpenSheet('guests')}
        style={styles.section}
      >
        <View className="flex-row items-center gap-1 opacity-80 mb-1">
          <Users size={14} color={COLORS.primary} />
          <Text style={styles.label}>{t('booking.guests')}</Text>
        </View>
        <Text style={styles.value}>
          {guests === '> 10' ? guests : t('num_people', { count: guests })}
        </Text>
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity
        onPress={handleSearch}
        style={styles.searchButton}
        className="bg-primary"
      >
        <Search size={20} color={COLORS.white} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  section: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(8),
    borderRadius: 12,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: verticalScale(20),
    backgroundColor: '#e5e7eb',
  },
  label: {
    fontSize: moderateScale(10),
    fontWeight: '500',
    color: COLORS.text,
  },
  value: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: COLORS.text,
  },
  searchButton: {
    width: scale(45),
    height: scale(45),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(5),
  },
});

export default SearchHome;
