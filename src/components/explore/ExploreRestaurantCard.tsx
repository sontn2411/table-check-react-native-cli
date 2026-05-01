import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star, Heart } from 'lucide-react-native';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { Restaurant } from '../../data/restaurants';

interface ExploreRestaurantCardProps {
  item: Restaurant;
  isSelected: boolean;
  onPress: (item: Restaurant) => void;
}

const ExploreRestaurantCard = ({
  item,
  isSelected,
  onPress,
}: ExploreRestaurantCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(item)}
      style={[
        styles.restaurantCard,
        isSelected && styles.restaurantCardSelected,
      ]}
    >
      {/* Badge */}
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        {item.isFeatured && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Ưu đãi -20%</Text>
          </View>
        )}
        <TouchableOpacity style={styles.heartBtn}>
          <Heart size={15} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingRow}>
          <Star size={11} color="#f59e0b" fill="#f59e0b" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.addressRow}>
          <MapPin size={10} color="#94a3b8" />
          <Text style={styles.addressText} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        <Text style={styles.priceText}>{item.priceRange}/người</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    width: scale(185),
    backgroundColor: '#fff',
    borderRadius: scale(20),
    marginRight: scale(12),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  restaurantCardSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  cardImageWrap: {
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: verticalScale(100),
  },
  badge: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(6),
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(9),
    fontWeight: 'bold',
  },
  heartBtn: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    width: scale(26),
    height: scale(26),
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantInfo: {
    padding: scale(10),
  },
  restaurantName: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: verticalScale(2),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
    marginBottom: verticalScale(2),
  },
  ratingText: {
    fontSize: moderateScale(10),
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  reviewsText: {
    fontSize: moderateScale(9),
    color: '#94a3b8',
  },
  dot: {
    color: '#e2e8f0',
    fontSize: moderateScale(9),
  },
  categoryText: {
    fontSize: moderateScale(9),
    color: '#64748b',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
    marginBottom: verticalScale(4),
  },
  addressText: {
    fontSize: moderateScale(9),
    color: '#94a3b8',
    flex: 1,
  },
  priceText: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default ExploreRestaurantCard;
