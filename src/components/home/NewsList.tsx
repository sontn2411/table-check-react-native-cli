import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { NEWS } from '../../data/restaurants';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';
import { Calendar } from 'lucide-react-native';

const NewsList = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('home.news_events')}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>{t('settings.see_all')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {NEWS.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.9} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
              
              <View style={styles.footer}>
                <Calendar size={12} color="#94a3b8" />
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(15),
    paddingBottom: verticalScale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(15),
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
  list: {
    paddingHorizontal: scale(20),
    gap: verticalScale(20),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: verticalScale(160),
  },
  badge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  content: {
    padding: scale(15),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: verticalScale(6),
    lineHeight: moderateScale(22),
  },
  summary: {
    fontSize: moderateScale(13),
    color: '#64748b',
    lineHeight: moderateScale(18),
    marginBottom: verticalScale(10),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  date: {
    fontSize: moderateScale(12),
    color: '#94a3b8',
  },
});

export default NewsList;
