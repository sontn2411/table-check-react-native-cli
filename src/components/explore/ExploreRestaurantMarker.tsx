import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Marker, Callout, CalloutSubview } from 'react-native-maps';
import { Star, MapPin } from 'lucide-react-native';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { Restaurant } from '../../data/restaurants';
import { Platform } from 'react-native';

interface ExploreRestaurantMarkerProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onPress: (restaurant: Restaurant) => void;
  onDismiss: () => void;
}

const ExploreRestaurantMarker = ({
  restaurant,
  isSelected,
  onPress,
  onDismiss,
}: ExploreRestaurantMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: restaurant.latitude!,
        longitude: restaurant.longitude!,
      }}
      onPress={() => onPress(restaurant)}
      tracksViewChanges={false}
    >
      <View
        style={[styles.markerContainer, isSelected && styles.markerSelected]}
      >
        <Image source={{ uri: restaurant.image }} style={styles.markerImage} />
        <View style={styles.markerRating}>
          <Star size={8} color="#f59e0b" fill="#f59e0b" />
          <Text style={styles.markerRatingText}>{restaurant.rating}</Text>
        </View>
      </View>

      {/* Custom Callout popup */}
      <Callout tooltip>
        <View style={styles.calloutContainer}>
          <Image
            source={{ uri: restaurant.image }}
            style={styles.calloutImage}
          />
          <View style={styles.calloutBody}>
            <View style={styles.calloutHeader}>
              <Text style={styles.calloutName} numberOfLines={1}>
                {restaurant.name}
              </Text>
              {Platform.OS === 'ios' ? (
                <CalloutSubview onPress={onDismiss}>
                  <TouchableOpacity style={styles.calloutClose}>
                    <Text style={styles.calloutCloseText}>×</Text>
                  </TouchableOpacity>
                </CalloutSubview>
              ) : (
                <TouchableOpacity
                  onPress={onDismiss}
                  style={styles.calloutClose}
                >
                  <Text style={styles.calloutCloseText}>×</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.calloutRow}>
              <Star size={11} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.calloutRating}>{restaurant.rating}</Text>
              <Text style={styles.calloutReviews}>({restaurant.reviews})</Text>
              <Text style={styles.calloutDot}>•</Text>
              <Text style={styles.calloutCategory}>{restaurant.category}</Text>
            </View>
            <View style={styles.calloutRow}>
              <MapPin size={10} color="#94a3b8" />
              <Text style={styles.calloutAddress} numberOfLines={1}>
                {restaurant.address}
              </Text>
            </View>
            <View style={styles.calloutFooter}>
              <Text style={styles.calloutPrice}>{restaurant.priceRange}</Text>
              {Platform.OS === 'ios' ? (
                <CalloutSubview
                  onPress={() => {
                    // alert(`Mở trang đặt bàn cho: ${restaurant.name}`);
                  }}
                >
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Đặt bàn</Text>
                  </TouchableOpacity>
                </CalloutSubview>
              ) : (
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => {
                    // alert(`Mở trang đặt bàn cho: ${restaurant.name}`);
                  }}
                >
                  <Text style={styles.bookButtonText}>Đặt bàn</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* Tail */}
          <View style={styles.calloutTail} />
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: '#fff',
    padding: scale(3),
    borderRadius: scale(14),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  markerSelected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  markerImage: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(11),
  },
  markerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(2),
    gap: 2,
  },
  markerRatingText: {
    fontSize: moderateScale(9),
    fontWeight: 'bold',
    color: '#1e293b',
  },
  // Callout popup
  calloutContainer: {
    width: scale(220),
    backgroundColor: '#fff',
    borderRadius: scale(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  calloutImage: {
    width: '100%',
    height: verticalScale(110),
  },
  calloutBody: {
    padding: scale(12),
  },
  calloutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(5),
  },
  calloutName: {
    fontSize: moderateScale(13),
    fontWeight: '800',
    color: '#1e293b',
    flex: 1,
    marginRight: scale(6),
  },
  calloutClose: {
    width: scale(20),
    height: scale(20),
    borderRadius: 100,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutCloseText: {
    fontSize: moderateScale(14),
    color: '#64748b',
    lineHeight: moderateScale(18),
  },
  calloutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
    marginBottom: verticalScale(4),
  },
  calloutRating: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  calloutReviews: {
    fontSize: moderateScale(10),
    color: '#94a3b8',
  },
  calloutDot: {
    color: '#e2e8f0',
    fontSize: moderateScale(10),
  },
  calloutCategory: {
    fontSize: moderateScale(10),
    color: '#64748b',
  },
  calloutAddress: {
    fontSize: moderateScale(10),
    color: '#94a3b8',
    flex: 1,
  },
  calloutPrice: {
    fontSize: moderateScale(13),
    fontWeight: '800',
    color: COLORS.primary,
  },
  calloutFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(6),
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: verticalScale(6),
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(11),
    fontWeight: 'bold',
  },
  calloutTail: {
    position: 'absolute',
    bottom: -scale(8),
    left: '50%',
    marginLeft: -scale(8),
    width: 0,
    height: 0,
    borderLeftWidth: scale(8),
    borderRightWidth: scale(8),
    borderTopWidth: scale(8),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
});

export default ExploreRestaurantMarker;
