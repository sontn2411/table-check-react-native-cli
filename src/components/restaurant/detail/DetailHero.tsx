import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { ChevronLeft, Heart, Share2 } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale } from '../../../utils/responsive';
import { Restaurant } from '../../../data/restaurants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = verticalScale(320);

interface Props {
  restaurant: Restaurant;
  insetsTop: number;
  isFavorite: boolean;
  setIsFavorite: (val: boolean) => void;
  handleShare: () => void;
  goBack: () => void;
}

const DetailHero = ({
  restaurant,
  insetsTop,
  isFavorite,
  setIsFavorite,
  handleShare,
  goBack,
}: Props) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const galleryImages = restaurant.images?.length
    ? restaurant.images
    : [restaurant.image];

  return (
    <View style={{ height: HERO_HEIGHT }}>
      <FlatList
        data={galleryImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setActiveImageIndex(index);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: SCREEN_WIDTH, height: HERO_HEIGHT }}
            resizeMode="cover"
            className=" rounded-b-[28px] overflow-hidden "
          />
        )}
        keyExtractor={(_, i) => i.toString()}
      />

      {/* Top Navigation */}
      <View
        style={{ position: 'absolute', top: insetsTop + 8, left: 0, right: 0 }}
        className="flex-row justify-between items-center px-5"
      >
        <TouchableOpacity
          onPress={goBack}
          className="bg-black/30 p-2.5 rounded-full"
        >
          <ChevronLeft color="#fff" size={22} />
        </TouchableOpacity>
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={handleShare}
            className="bg-black/30 p-2.5 rounded-full"
          >
            <Share2 color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className="bg-black/30 p-2.5 rounded-full"
          >
            <Heart
              color={isFavorite ? '#ef4444' : '#fff'}
              fill={isFavorite ? '#ef4444' : 'transparent'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Pagination Dots */}
      {galleryImages.length > 1 && (
        <View
          style={{ position: 'absolute', bottom: 16 }}
          className="flex-row self-center gap-1.5 "
        >
          {galleryImages.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${
                i === activeImageIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default DetailHero;
