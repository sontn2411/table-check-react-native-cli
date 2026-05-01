import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { Restaurant } from '../../data/restaurants';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  horizontal?: boolean;
}

const RestaurantCard = ({
  restaurant,
  horizontal = true,
}: RestaurantCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, !horizontal && styles.verticalCard]}
    >
      <Image
        source={{ uri: restaurant.image }}
        style={horizontal ? styles.image : styles.verticalImage}
      />
      {restaurant.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>HOT</Text>
        </View>
      )}

      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.ratingBox}>
            <Star size={12} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.category}>{restaurant.category}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.price}>{restaurant.priceRange}</Text>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={12} color="#64748b" />
          <Text style={styles.locationText} numberOfLines={1}>
            {restaurant.address.replace(/Phường/gi, 'P.')}
          </Text>
          <Text style={styles.distance}>{restaurant.distance}</Text>
        </View>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('ConfirmBooking', { restaurant })}
        >
          <Text style={styles.bookButtonText}>Đặt bàn ngay</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scale(260),
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: verticalScale(5),
  },
  verticalCard: {
    width: '100%',
    marginBottom: verticalScale(15),
  },
  image: {
    width: '100%',
    height: verticalScale(140),
  },
  verticalImage: {
    width: '100%',
    height: verticalScale(160),
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: 6,
    zIndex: 1,
  },
  featuredText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  details: {
    padding: scale(15),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    marginRight: scale(10),
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: '#fffbeb',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: 6,
  },
  ratingText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  category: {
    fontSize: moderateScale(13),
    color: COLORS.primary,
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: scale(6),
    color: '#cbd5e1',
  },
  price: {
    fontSize: moderateScale(13),
    color: '#64748b',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  locationText: {
    fontSize: moderateScale(12),
    color: '#64748b',
    flex: 1,
  },
  distance: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: scale(4),
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(12),
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(13),
  },
});

export default RestaurantCard;
