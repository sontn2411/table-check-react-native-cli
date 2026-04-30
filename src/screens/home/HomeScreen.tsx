import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import LocationBottomSheet from '../../components/LocationBottomSheet';

import { MainTabParamList } from '../../navigation/types';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<MainTabParamList, 'HomeTab'>;
};

const { width } = Dimensions.get('window');

import SafeScreen from '../../components/SafeScreen';
import HeaderHome from './HeaderHome';
import SearchHome from './SearchHome';
import BookingBottomSheet from '../../components/BookingBottomSheet';
import BannerCarousel from '../../components/home/BannerCarousel';
import FeaturedOffers from '../../components/home/FeaturedOffers';
import CategoryList from '../../components/home/CategoryList';
import RestaurantList from '../../components/home/RestaurantList';
import NewsList from '../../components/home/NewsList';
import { useAuthStore } from '../../store/useAuthStore';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const bookingSheetRef = useRef<BottomSheetModal>(null);
  const [bookingType, setBookingType] = useState<
    'date' | 'time' | 'guests' | null
  >(null);

  const handleOpenBookingSheet = (type: 'date' | 'time' | 'guests') => {
    setBookingType(type);
    bookingSheetRef.current?.present();
  };

  return (
    <SafeScreen>
      <HeaderHome />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="px-5 mt-3">
          <Text className="text-xl font-bold">
            {t('hello_user', { name: user?.username || 'Guest' })}
          </Text>
          <Text className="text-gray-500 text-sm">{t('home_question')}</Text>
        </View>
        <View className="px-5 mt-5">
          <SearchHome onOpenSheet={handleOpenBookingSheet} />
        </View>

        <BannerCarousel />
        <FeaturedOffers />
        <CategoryList activeId={activeCategory} onSelect={setActiveCategory} />
        <RestaurantList activeCategory={activeCategory} />
        <NewsList />
      </ScrollView>

      <BookingBottomSheet
        ref={bookingSheetRef}
        initialType={bookingType || 'date'}
        onClose={() => setBookingType(null)}
      />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: verticalScale(100),
  },
});

export default HomeScreen;
