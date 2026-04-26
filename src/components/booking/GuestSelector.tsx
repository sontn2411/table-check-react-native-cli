import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Users } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';

import { useTranslation } from 'react-i18next';
import { GUEST_OPTIONS } from '../../data/booking';
import { useBookingStore } from '../../store/useBookingStore';

const GuestSelector = () => {
  const { t } = useTranslation();
  const { guests: selected, setGuests: setSelected } = useBookingStore();

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <View style={styles.iconBox}>
          <Users color={COLORS.primary} size={22} />
        </View>
        <View>
          <Text style={styles.sectionTitle}>{t('booking.num_guests')}</Text>
          <Text style={styles.subText}>
            {selected === '> 10'
              ? t('booking.large_group')
              : t('booking.adult_guests', { count: selected })}
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        {GUEST_OPTIONS.map(option => {
          const isSelected = selected === option;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionCard,
                isSelected && styles.selectedCard,
                option === '> 10' && styles.largeOption,
              ]}
              onPress={() => setSelected(option)}
            >
              <Text
                style={[styles.optionText, isSelected && styles.selectedText]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected === '> 10' && (
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>{t('booking.guest_note')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(10),
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    marginBottom: verticalScale(20),
  },
  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subText: {
    fontSize: moderateScale(12),
    color: '#6b7280',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  optionCard: {
    width: '16.5%', // 4 columns
    height: verticalScale(50),
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  largeOption: {
    width: '47.5%', // Takes 2 columns space
  },
  selectedCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  optionText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  selectedText: {
    color: COLORS.white,
  },
  noteBox: {
    marginTop: verticalScale(20),
    padding: scale(15),
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  noteText: {
    fontSize: moderateScale(12),
    color: '#92400e',
    fontStyle: 'italic',
    lineHeight: verticalScale(18),
  },
});

export default GuestSelector;
