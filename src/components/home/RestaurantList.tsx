import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MOCK_RESTAURANTS } from '../../data';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { useTranslation } from 'react-i18next';
import { useLocationStore } from '../../store/useLocationStore';
import RestaurantCard from '../common/RestaurantCard';

interface RestaurantListProps {
  activeCategory: string;
}

const RestaurantList = ({ activeCategory }: RestaurantListProps) => {
  const { t } = useTranslation();

  const { cityName } = useLocationStore();

  const filteredRestaurants = useMemo(() => {
    // Determine the base set of restaurants based on city
    const isNhaTrang = cityName?.toLowerCase().includes('nha trang');
    const cityRestaurants = MOCK_RESTAURANTS.filter(item => {
      const addressLower = item.address.toLowerCase();
      if (isNhaTrang) {
        return addressLower.includes('nha trang');
      } else {
        return addressLower.includes('hà nội');
      }
    });

    // Then filter by category
    if (activeCategory === 'all') return cityRestaurants;
    
    return cityRestaurants.filter(
      item => item.category.toLowerCase() === activeCategory.toLowerCase() || 
              (activeCategory === '1' && item.category === 'Sushi') || 
              (activeCategory === '2' && item.category === 'Pizza') ||
              (activeCategory === '3' && item.category === 'BBQ') ||
              (activeCategory === '4' && item.category === 'Cafe')
    );
  }, [activeCategory, cityName]);

  const renderItem = ({ item }: { item: typeof MOCK_RESTAURANTS[0] }) => (
    <RestaurantCard restaurant={item} horizontal={true} />
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
