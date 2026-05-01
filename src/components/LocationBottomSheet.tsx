import React, { useCallback, useMemo, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { MapPin, Check, Target } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { scale, verticalScale, moderateScale } from '../utils/responsive';
import { LOCATIONS } from '../data/booking';

interface LocationBottomSheetProps {
  selectedLocation?: string;
  onSelect?: (location: string) => void;
}

import { useTranslation } from 'react-i18next';

const LocationBottomSheet = forwardRef<
  BottomSheetModal,
  LocationBottomSheetProps
>(({ onSelect, selectedLocation }, ref) => {
  const { t } = useTranslation();
  // variables
  const snapPoints = useMemo(() => ['75%'], []);

  // callbacks
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleSelect = (location: string) => {
    onSelect?.(location);
    (ref as any).current?.dismiss();
  };

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const isActive = item === selectedLocation;

      return (
        <TouchableOpacity
          style={[styles.locationItem, isActive && styles.activeItem]}
          onPress={() => handleSelect(item)}
        >
          <View style={styles.leftContent}>
            {item === 'Vị trí hiện tại' && (
              <Target size={18} color={COLORS.primary} style={{ marginRight: scale(8) }} />
            )}
            <Text
              style={[
                styles.locationText,
                isActive && styles.activeLocationText,
                item === 'Vị trí hiện tại' && { color: COLORS.primary, fontWeight: 'bold' }
              ]}
            >
              {item}
            </Text>
          </View>
          {isActive && (
            <Check color={COLORS.primary} size={20} strokeWidth={3} />
          )}
        </TouchableOpacity>
      );
    },
    [handleSelect, selectedLocation],
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>{t('select_location')}</Text>
      </View>
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableOverDrag={false}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: '#e5e7eb', width: scale(40) }}
      backgroundStyle={styles.background}
    >
      <BottomSheetFlatList
        data={LOCATIONS}
        keyExtractor={item => item}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollContent: {
    paddingVertical: verticalScale(10),
    paddingBottom: verticalScale(40),
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  activeItem: {
    backgroundColor: '#f5f3ff',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: 18,
    backgroundColor: '#f5f3ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(15),
  },
  activeIconContainer: {
    backgroundColor: COLORS.primary,
  },
  locationText: {
    fontSize: moderateScale(16),
    color: COLORS.text,
    fontWeight: '500',
  },
  activeLocationText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default LocationBottomSheet;
