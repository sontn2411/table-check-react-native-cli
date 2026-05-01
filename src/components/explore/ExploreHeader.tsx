import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, ChevronDown, SlidersHorizontal } from 'lucide-react-native';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import LocationBottomSheet from '../LocationBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLocationStore } from '../../store/useLocationStore';
import { LOCATION_COORDS } from '../../data/booking';

interface ExploreHeaderProps {
  location: string;
  onFilterPress?: () => void;
}

const ExploreHeader = ({
  location,
  onFilterPress,
}: ExploreHeaderProps) => {
  const { setManualLocation, requestLocation } = useLocationStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenLocationSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleSelectLocation = (loc: string) => {
    if (loc === 'Vị trí hiện tại') {
      requestLocation();
      return;
    }

    const coords = LOCATION_COORDS[loc];
    if (coords) {
      setManualLocation(loc, coords.lat, coords.lng);
    } else {
      setManualLocation(loc);
    }
  };

  return (
    <View style={styles.topBar} pointerEvents="box-none">
      <View>
        <Text style={styles.title}>Khám phá</Text>
        <Text style={styles.subtitle}>Tìm nhà hàng yêu thích của bạn</Text>
      </View>
      <View style={styles.topActions} pointerEvents="box-none">
        <TouchableOpacity style={styles.locationChip} onPress={handleOpenLocationSheet}>
          <MapPin size={13} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={styles.locationText}>{location.split(',')[0]}</Text>
          <ChevronDown size={11} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onFilterPress}>
          <SlidersHorizontal size={17} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <LocationBottomSheet
        ref={bottomSheetRef}
        selectedLocation={location}
        onSelect={handleSelectLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '900',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: '#64748b',
    fontWeight: '500',
  },
  topActions: {
    flexDirection: 'row',
    gap: scale(8),
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(7),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: scale(4),
  },
  locationText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: moderateScale(12),
  },
  iconBtn: {
    width: scale(38),
    height: scale(38),
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});

export default ExploreHeader;
