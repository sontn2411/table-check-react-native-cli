import React, { useState, useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const DAYS_SHORT = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

interface DateSelectorProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const DateSelector = ({ selectedDate, onSelect }: DateSelectorProps) => {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const DAYS_SHORT =
    i18n.language === 'vi'
      ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const monthName = currentDate.toLocaleString(
    i18n.language === 'vi' ? 'vi-VN' : 'en-US',
    { month: 'long' },
  );
  const capitalizedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentDate]);

  const handlePrevMonth = () => {
    const prev = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    if (
      prev.getMonth() >= today.getMonth() ||
      prev.getFullYear() > today.getFullYear()
    ) {
      setCurrentDate(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthTitle}>
          {i18n.language === 'vi'
            ? t('booking.month', {
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear(),
              })
            : t('booking.month', {
                monthName: capitalizedMonth,
                year: currentDate.getFullYear(),
              })}
        </Text>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={handlePrevMonth} style={styles.navBtn}>
            <ChevronLeft size={20} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextMonth} style={styles.navBtn}>
            <ChevronRight size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekRow}>
        {DAYS_SHORT.map(day => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {calendarData.map((date, index) => {
          if (!date)
            return <View key={`empty-${index}`} style={styles.dayBox} />;

          const isPast = date < today;
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);

          return (
            <TouchableOpacity
              key={index}
              disabled={isPast}
              onPress={() => onSelect(date)}
              style={[
                styles.dayBox,
                isSelected && styles.selectedDay,
                isToday && !isSelected && styles.todayBox,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  isPast && styles.pastText,
                  isSelected && styles.selectedDayText,
                  isToday && !isSelected && styles.todayText,
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  monthTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  navButtons: {
    flexDirection: 'row',
    gap: scale(10),
  },
  navBtn: {
    padding: scale(5),
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  weekDay: {
    width: (width - scale(40)) / 7,
    textAlign: 'center',
    fontSize: moderateScale(12),
    color: '#9ca3af',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayBox: {
    width: (width - scale(40)) / 7,
    height: verticalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(5),
    borderRadius: 12,
  },
  dayText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.text,
  },
  pastText: {
    color: '#d1d5db',
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  todayBox: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  todayText: {
    color: COLORS.primary,
  },
});

export default DateSelector;
