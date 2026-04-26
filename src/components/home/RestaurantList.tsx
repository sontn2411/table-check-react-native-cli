import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { MOCK_RESTAURANTS } from '../../data';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { useTranslation } from 'react-i18next';

interface RestaurantListProps {
  activeCategory: string;
}

const RestaurantList = ({ activeCategory }: RestaurantListProps) => {
  const { t } = useTranslation();

  const filteredRestaurants = useMemo(() => {
    if (activeCategory === 'all') return MOCK_RESTAURANTS;
    return MOCK_RESTAURANTS.filter(
      item => item.category.toLowerCase() === activeCategory.toLowerCase() || 
              (activeCategory === '1' && item.category === 'Sushi') || // Handle ID mapping if needed
              (activeCategory === '2' && item.category === 'Pizza') ||
              (activeCategory === '3' && item.category === 'BBQ') ||
              (activeCategory === '4' && item.category === 'Cafe')
    );
  }, [activeCategory]);

  const renderItem = ({ item }: { item: typeof MOCK_RESTAURANTS[0] }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {item.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>HOT</Text>
        </View>
      )}
      
      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingBox}>
            <Star size={12} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.price}>{item.priceRange}</Text>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={12} color="#64748b" />
          <Text style={styles.locationText} numberOfLines={1}>{item.address}</Text>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('suggested_restaurants')}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>{t('see_all')}</Text>
        </TouchableOpacity>
      </View>

      {filteredRestaurants.length > 0 ? (
        <FlatList
          data={filteredRestaurants}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có nhà hàng nào trong danh mục này</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: verticalScale(20),
    minHeight: verticalScale(280),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#1e293b',
  },
  seeAll: {
    fontSize: moderateScale(14),
    color: COLORS.primary,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: scale(20),
    gap: scale(15),
  },
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
  image: {
    width: '100%',
    height: verticalScale(140),
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: 6,
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
  emptyContainer: {
    padding: scale(40),
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: moderateScale(14),
  },
});

export default RestaurantList;
