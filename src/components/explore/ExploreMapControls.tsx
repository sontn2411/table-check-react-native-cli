import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RefreshCw, Navigation2 } from 'lucide-react-native';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';

interface ExploreMapControlsProps {
  onSearchAreaPress?: () => void;
  onRecenterPress?: () => void;
}

const ExploreMapControls = ({
  onSearchAreaPress,
  onRecenterPress,
}: ExploreMapControlsProps) => {
  return (
    <View style={styles.mapButtons} pointerEvents="box-none">
      <TouchableOpacity style={styles.searchAreaBtn} onPress={onSearchAreaPress}>
        <RefreshCw size={13} color={COLORS.primary} />
        <Text style={styles.searchAreaText}>Tìm kiếm khu vực này</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.recenterBtn}
        onPress={onRecenterPress}
      >
        <Navigation2 size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mapButtons: {
    position: 'absolute',
    bottom: '14%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  searchAreaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    gap: scale(6),
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchAreaText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: moderateScale(12),
  },
  recenterBtn: {
    position: 'absolute',
    right: scale(20),
    width: scale(44),
    height: scale(44),
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});

export default ExploreMapControls;
