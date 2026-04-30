import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { OFFERS } from '../../data/restaurants';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { useTranslation } from 'react-i18next';
import { Ticket } from 'lucide-react-native';

const FeaturedOffers = () => {
  const { t } = useTranslation();
  const renderItem = ({ item }: { item: typeof OFFERS[0] }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.date}>{item.date}</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Ticket size={14} color="#fff" />
            <Text style={styles.ctaText}>{t('home.get_code')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('home.featured_offers')}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>{t('settings.see_all')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={OFFERS}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={scale(310) + scale(15)}
        decelerationRate="fast"
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(12),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#1e293b',
  },
  seeAll: {
    fontSize: moderateScale(14),
    color: COLORS.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: scale(20),
    gap: scale(15),
  },
  card: {
    width: scale(310),
    height: verticalScale(130),
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  image: {
    width: '40%',
    height: '100%',
  },
  content: {
    width: '60%',
    padding: scale(12),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#1e293b',
    lineHeight: moderateScale(18),
  },
  subtitle: {
    fontSize: moderateScale(11),
    color: '#64748b',
    marginTop: verticalScale(2),
  },
  footer: {
    marginTop: verticalScale(8),
    gap: verticalScale(6),
  },
  date: {
    fontSize: moderateScale(10),
    color: '#94a3b8',
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: 8,
    gap: scale(6),
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontWeight: '700',
  },
});

export default FeaturedOffers;
