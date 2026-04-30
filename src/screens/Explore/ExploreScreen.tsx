import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {
  Search,
  Mic,
  SlidersHorizontal,
  MapPin,
  Navigation2,
  Calendar,
  Star,
  ChevronDown,
  Target,
  RefreshCw,
  Heart,
} from 'lucide-react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { MOCK_RESTAURANTS, Restaurant } from '../../data/restaurants';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '../../store/useBookingStore';

const { width, height } = Dimensions.get('window');

// Tâm bản đồ: Hà Nội
const HANOI_REGION = {
  latitude: 21.0285,
  longitude: 105.8542,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

const ExploreScreen = () => {
  const { t } = useTranslation();
  const { location } = useBookingStore();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const snapPoints = useMemo(() => ['20%', '40%'], []);

  const filters = [
    { id: 'filter', label: 'Bộ lọc', icon: SlidersHorizontal, badge: 1 },
    { id: 'table', label: 'Tìm bàn trống', icon: Calendar },
    { id: 'nearby', label: 'Gần tôi', icon: Target },
    { id: 'offers', label: 'Có ưu đãi', icon: Navigation2 },
  ];

  const handleMarkerPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    if (restaurant.latitude && restaurant.longitude) {
      mapRef.current?.animateToRegion(
        {
          latitude: restaurant.latitude - 0.012,
          longitude: restaurant.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
        500,
      );
    }
  };

  const renderFilterItem = (filter: any) => (
    <TouchableOpacity key={filter.id} style={styles.filterChip}>
      <filter.icon
        size={15}
        color={filter.id === 'filter' ? COLORS.primary : '#64748b'}
        strokeWidth={2.5}
      />
      <Text
        style={[
          styles.filterLabel,
          filter.id === 'filter' && styles.filterLabelActive,
        ]}
      >
        {filter.label}
      </Text>
      {filter.badge && (
        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>{filter.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => {
    const isSelected = selectedRestaurant?.id === item.id;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleMarkerPress(item)}
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

  return (
    <View style={styles.container}>
      {/* Map fills the entire screen */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={HANOI_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {MOCK_RESTAURANTS.filter(r => r.latitude && r.longitude).map(
          restaurant => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: restaurant.latitude!,
                longitude: restaurant.longitude!,
              }}
              onPress={() => handleMarkerPress(restaurant)}
            >
              <View
                style={[
                  styles.markerContainer,
                  selectedRestaurant?.id === restaurant.id &&
                    styles.markerSelected,
                ]}
              >
                <Image
                  source={{ uri: restaurant.image }}
                  style={styles.markerImage}
                />
                <View style={styles.markerRating}>
                  <Star size={8} color="#f59e0b" fill="#f59e0b" />
                  <Text style={styles.markerRatingText}>
                    {restaurant.rating}
                  </Text>
                </View>
              </View>
            </Marker>
          ),
        )}
      </MapView>

      {/* Floating UI on top of map - transparent, no background */}
      <View
        style={[styles.floatingUI, { paddingTop: insets.top }]}
        pointerEvents="box-none"
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.title}>Khám phá</Text>
            <Text style={styles.subtitle}>Tìm nhà hàng yêu thích của bạn</Text>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.locationChip}>
              <MapPin size={13} color={COLORS.primary} strokeWidth={2.5} />
              <Text style={styles.locationText}>{location.split(',')[0]}</Text>
              <ChevronDown size={11} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <SlidersHorizontal size={17} color="#1e293b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarWrap}>
          <View style={styles.searchBar}>
            <Search size={19} color="#94a3b8" />
            <TextInput
              placeholder="Tìm nhà hàng, món ăn, khu vực..."
              style={styles.searchInput}
              placeholderTextColor="#94a3b8"
            />
            <Mic size={19} color="#94a3b8" />
          </View>
        </View>

        {/* Horizontal Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(renderFilterItem)}
        </ScrollView>
      </View>

      {/* Map Overlay Buttons */}
      <View style={styles.mapButtons}>
        <TouchableOpacity style={styles.searchAreaBtn}>
          <RefreshCw size={13} color={COLORS.primary} />
          <Text style={styles.searchAreaText}>Tìm kiếm khu vực này</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recenterBtn}
          onPress={() => mapRef.current?.animateToRegion(HANOI_REGION, 500)}
        >
          <Navigation2 size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Draggable Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.sheetIndicator}
        backgroundStyle={styles.sheetBackground}
        bottomInset={verticalScale(95)}
        detached={true}
        style={{ marginHorizontal: scale(10) }}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>
            {MOCK_RESTAURANTS.length}+ nhà hàng
          </Text>
        </View>

        <BottomSheetFlatList
          data={MOCK_RESTAURANTS}
          keyExtractor={item => item.id}
          renderItem={renderRestaurantItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  floatingUI: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // does NOT have flex:1 so it won't cover the map below
  },

  // Top Bar
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
  // Search
  searchBarWrap: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(8),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 100,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(10),
    color: '#1e293b',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  // Filters
  filtersScroll: {
    marginTop: verticalScale(10),
  },
  filtersContent: {
    paddingHorizontal: scale(20),
    paddingRight: scale(40),
    gap: scale(8),
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: scale(6),
  },
  filterLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#475569',
  },
  filterLabelActive: {
    color: COLORS.primary,
  },
  filterBadge: {
    backgroundColor: COLORS.primary,
    width: scale(16),
    height: scale(16),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: moderateScale(9),
    fontWeight: 'bold',
  },
  // Map Markers
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
    backgroundColor: '#1e293b',
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
  // Map buttons
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
  // Bottom Sheet
  sheetBackground: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
  sheetIndicator: {
    backgroundColor: '#e2e8f0',
    width: scale(40),
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(4),
    paddingBottom: verticalScale(8),
  },
  sheetTitle: {
    fontSize: moderateScale(14),
    fontWeight: '900',
    color: '#1e293b',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  sortText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  listContent: {
    paddingVertical: verticalScale(8),
    paddingLeft: scale(20),
    paddingRight: scale(8),
  },
  // Restaurant Card - Vertical layout for horizontal scroll
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
  restaurantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  priceText: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  featuredTag: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(6),
  },
  featuredTagText: {
    fontSize: moderateScale(9),
    fontWeight: '600',
    color: '#d97706',
  },
});

export default ExploreScreen;
