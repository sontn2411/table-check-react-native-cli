import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import {
  Search,
  MapPin,
  Star,
  Coffee,
  Utensils,
  Pizza as PizzaIcon,
  Flame,
} from 'lucide-react-native';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'sushi', icon: Utensils, color: 'bg-orange-100', iconColor: '#f97316' },
  { id: '2', name: 'pizza', icon: PizzaIcon, color: 'bg-red-100', iconColor: '#ef4444' },
  { id: '3', name: 'bbq', icon: Flame, color: 'bg-yellow-100', iconColor: '#eab308' },
  { id: '4', name: 'cafe', icon: Coffee, color: 'bg-blue-100', iconColor: '#3b82f6' },
];

const FEATURED = [
  {
    id: '1',
    name: 'Sushi Master',
    rating: 4.8,
    type: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500',
    price: '$$$',
  },
  {
    id: '2',
    name: 'Pizza Palace',
    rating: 4.5,
    type: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500',
    price: '$$',
  },
];

const NEARBY = [
  {
    id: '3',
    name: 'BBQ Garden',
    rating: 4.2,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500',
  },
  {
    id: '4',
    name: 'The Coffee House',
    rating: 4.6,
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500',
  },
];

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View className="px-5 pt-12 pb-6 bg-primary rounded-b-[40px]">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white/80 text-sm font-medium">{t('welcome')}</Text>
            <Text className="text-white text-2xl font-bold">User Name</Text>
          </View>
          <TouchableOpacity 
            onPress={toggleLanguage}
            className="bg-white/20 p-2 rounded-full border border-white/30"
          >
            <Text className="text-white font-bold">{i18n.language.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
          <Search color="gray" size={20} />
          <TextInput
            placeholder={t('search_placeholder')}
            className="flex-1 ml-3 text-base text-gray-800"
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {/* Categories */}
      <View className="mt-8">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} className="items-center mr-6">
              <View className={`${cat.color} p-4 rounded-2xl mb-2`}>
                <cat.icon color={cat.iconColor} size={24} />
              </View>
              <Text className="text-gray-600 font-medium">{t(cat.name)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Section */}
      <View className="mt-8">
        <View className="flex-row justify-between items-center px-5 mb-4">
          <Text className="text-xl font-bold text-gray-900">{t('featured_restaurants')}</Text>
          <TouchableOpacity>
            <Text className="text-primary font-bold">{t('see_all')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {FEATURED.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="mr-5 bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100"
              style={{ width: width * 0.7 }}
              onPress={() => navigation.navigate('Details', { itemId: parseInt(item.id) })}
            >
              <Image source={{ uri: item.image }} className="w-full h-40" />
              <View className="p-4">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                  <View className="flex-row items-center">
                    <Star color="#facc15" size={16} fill="#facc15" />
                    <Text className="ml-1 text-gray-600 font-bold">{item.rating}</Text>
                  </View>
                </View>
                <Text className="text-gray-500">{item.type} • {item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Section */}
      <View className="mt-8 mb-8 px-5">
        <Text className="text-xl font-bold text-gray-900 mb-4">{t('nearby_restaurants')}</Text>
        {NEARBY.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center bg-gray-50 p-3 rounded-2xl mb-4 border border-gray-100"
          >
            <Image source={{ uri: item.image }} className="w-20 h-20 rounded-xl" />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
              <View className="flex-row items-center mt-1">
                <MapPin color="gray" size={14} />
                <Text className="text-gray-500 text-sm ml-1">{item.distance}</Text>
                <View className="mx-2 w-1 h-1 bg-gray-300 rounded-full" />
                <Star color="#facc15" size={14} fill="#facc15" />
                <Text className="ml-1 text-gray-600 text-sm font-bold">{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
