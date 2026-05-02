import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Linking,
  Share,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// Components
import DetailHero from '../../components/restaurant/detail/DetailHero';
import DetailInfo from '../../components/restaurant/detail/DetailInfo';
import DetailQuickInfo from '../../components/restaurant/detail/DetailQuickInfo';
import DetailHighlights from '../../components/restaurant/detail/DetailHighlights';
import DetailFeaturedMenu from '../../components/restaurant/detail/DetailFeaturedMenu';
import DetailTabs from '../../components/restaurant/detail/DetailTabs';
import DetailFooter from '../../components/restaurant/detail/DetailFooter';
import LinearGradient from 'react-native-linear-gradient';

type DetailRouteProp = RouteProp<RootStackParamList, 'RestaurantDetail'>;

const RestaurantDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<DetailRouteProp>();
  const { restaurant } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  const handleCall = () => {
    if (restaurant.phone) {
      Linking.openURL(`tel:${restaurant.phone.replace(/\s/g, '')}`);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Hãy thử nhà hàng ${restaurant.name} tại ${restaurant.address}! Đánh giá ${restaurant.rating}⭐`,
      });
    } catch {}
  };

  const handleBooking = () => {
    navigation.navigate('ConfirmBooking', { restaurant });
  };

  const handleDirection = () => {
    if (restaurant.latitude && restaurant.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View className="flex-1  pb-20">
      <LinearGradient
        colors={['#ede9fe', '#e9e5fd', '#ede9fe']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <DetailHero
          restaurant={restaurant}
          insetsTop={insets.top}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          handleShare={handleShare}
          goBack={() => navigation.goBack()}
        />

        <View className="-mt-12 px-4">
          <DetailInfo restaurant={restaurant} />
          <DetailQuickInfo restaurant={restaurant} />
          <DetailHighlights />
          <DetailFeaturedMenu menu={restaurant.menu} />
          <DetailTabs
            restaurant={restaurant}
            handleDirection={handleDirection}
          />
        </View>
      </ScrollView>

      <DetailFooter
        handleBooking={handleBooking}
        insetsBottom={insets.bottom}
      />
    </View>
  );
};

export default RestaurantDetailScreen;
