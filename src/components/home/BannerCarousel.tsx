import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BANNERS } from '../../data';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width;
const ITEM_WIDTH = CAROUSEL_WIDTH;

const BannerCarousel = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof BANNERS)[0];
    index: number;
  }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.bannerWrapper}>
      <View style={styles.bannerCard}>
        {/* Background Image on Right */}
        <Image source={{ uri: item.image }} style={styles.bannerImage} />

        {/* Horizontal Gradient Overlay */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primary, 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.4, 0.9]}
          style={styles.gradient}
        >
          {/* Content Area */}
          <View style={styles.contentArea}>
            <View style={styles.topBadge}>
              <Sparkles size={14} color="#fde047" fill="#fde047" />
              <Text style={styles.topBadgeText}>{t('home.special_offer')}</Text>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {item.title.split(' ').map((word, i) => (
                  <Text
                    key={i}
                    style={word.includes('%') ? styles.highlightText : null}
                  >
                    {word}{' '}
                  </Text>
                ))}
              </Text>
            </View>

            <TouchableOpacity style={styles.discoverButton}>
              <Text style={styles.discoverText}>{t('home.discover_now')}</Text>
              <ArrowRight size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Pagination Pill */}
        <View style={styles.paginationPill}>
          <Text style={styles.paginationText}>
            {activeIndex + 1}/{BANNERS.length}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        renderItem={({ item, index }) => renderItem({ item, index })}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        contentContainerStyle={styles.listContent}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(15),
  },
  listContent: {
    paddingHorizontal: 0,
  },
  bannerWrapper: {
    width: ITEM_WIDTH,
    paddingHorizontal: scale(20),
  },
  bannerCard: {
    height: ((width - scale(40)) * 9) / 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
  contentArea: {
    width: '70%',
    padding: scale(10),
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: verticalScale(10),
  },
  topBadgeText: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  titleContainer: {
    marginBottom: verticalScale(18),
  },
  title: {
    color: '#fff',
    fontSize: moderateScale(24),
    fontWeight: '800',
    lineHeight: moderateScale(32),
  },
  highlightText: {
    color: '#fde047', // Yellow for %
  },
  discoverButton: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(10),
    borderRadius: 14,
    gap: scale(8),
    elevation: 4,
  },
  discoverText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.primary,
  },
  paginationPill: {
    position: 'absolute',
    bottom: scale(15),
    right: scale(15),
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  paginationText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
});

export default BannerCarousel;
