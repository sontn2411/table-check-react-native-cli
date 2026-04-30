import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GuestBanner = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mt-6 mx-5 bg-[#f7f3ff] rounded-2xl p-5 flex-row items-center">
      {/* Avatar */}
      <View className="w-[76px] h-[76px] rounded-full border-4 border-white bg-[#e9d5ff] items-center justify-center mr-4 shadow-sm">
        <User color="#8e4ae7" size={40} fill="#8e4ae7" />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-[16px] font-bold text-gray-900 mb-1.5">
          {t('auth.guest_welcome')}
        </Text>
        <Text className="text-[13px] text-gray-500 mb-4 leading-[18px]">
          {t('auth.guest_desc')}
        </Text>
        <View className="flex-row gap-2.5">
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            className="bg-primary py-2.5 px-4 rounded-xl flex-1 items-center"
          >
            <Text className="text-white font-bold text-[13px]">{t('auth.login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Register')}
            className="border border-[#d8b4fe] py-2.5 px-4 rounded-xl flex-1 items-center bg-transparent"
          >
            <Text className="text-primary font-bold text-[13px]">{t('auth.register')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GuestBanner;
