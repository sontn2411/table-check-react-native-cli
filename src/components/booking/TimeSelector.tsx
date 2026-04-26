import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { ALL_TIMES } from '../../data/booking';

import { useTranslation } from 'react-i18next';
import { useBookingStore } from '../../store/useBookingStore';

interface TimeSelectorProps {
  selectedDate?: Date;
}

const TimeSelector = ({ selectedDate = new Date() }: TimeSelectorProps) => {
  const { t } = useTranslation();
  const { time: selectedTime, setTime: setSelectedTime } = useBookingStore();
  const now = useMemo(() => new Date(), []);
  const isToday = useMemo(
    () => selectedDate.toDateString() === now.toDateString(),
    [selectedDate, now],
  );

  const availableTimes = useMemo(() => {
    if (!isToday) return ALL_TIMES;

    return ALL_TIMES.filter(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const timeDate = new Date(now);
      timeDate.setHours(hours, minutes, 0, 0);

      // Show times at least 30 minutes in the future
      return timeDate.getTime() > now.getTime() + 30 * 60000;
    });
  }, [isToday, now]);


  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('booking.select_time')}</Text>
      {availableTimes.length > 0 ? (
        <View style={styles.grid}>
          {availableTimes.map(time => {
            const isSelected = time === selectedTime;
            return (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, isSelected && styles.selectedSlot]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[styles.timeText, isSelected && styles.selectedText]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('booking.no_time_available')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: verticalScale(15),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: scale(10),
  },
  timeSlot: {
    width: '22%', // 4 columns roughly
    paddingVertical: verticalScale(10),
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: verticalScale(5),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: COLORS.text,
  },
  selectedText: {
    color: COLORS.white,
  },
  emptyContainer: {
    padding: scale(20),
    alignItems: 'center',
    backgroundColor: '#fff1f2',
    borderRadius: 12,
  },
  emptyText: {
    color: '#e11d48',
    textAlign: 'center',
    fontSize: moderateScale(14),
  },
});

export default TimeSelector;
