import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  User,
  CreditCard,
  MapPin,
  Bell,
  HelpCircle,
  Gift,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type SettingsMenuNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const SettingsMenu = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SettingsMenuNavigationProp>();
  const { user, logout } = useAuthStore();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    Alert.alert(
      t('auth.logout'),
      t('auth.logout_confirm'),
      [
        { text: t('auth.logout_cancel'), style: 'cancel' },
        {
          text: t('auth.logout'),
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
      { cancelable: true },
    );
  };

  const menuItems = [
    {
      icon: User,
      label: t('settings.personal_info'),
      memberOnly: true,
      onPress: () => navigation.navigate('EditProfile'),
    },
    // { icon: CreditCard, label: t('settings.payment'), memberOnly: true },
    { icon: Bell, label: t('settings.notifications'), memberOnly: false },
    { icon: HelpCircle, label: t('settings.help'), memberOnly: false },
    {
      icon: Gift,
      label: t('settings.about'),
      memberOnly: false,
    },
    { icon: ShieldCheck, label: t('settings.about'), memberOnly: false },
  ].filter(item => !item.memberOnly || isLoggedIn);

  return (
    <View className="mx-4 mt-8 mb-32">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        {t('settings.personal_info')}
      </Text>

      <View className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={item.onPress}
            className={`flex-row items-center px-5 py-4 ${
              index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <item.icon color="#8e4ae7" size={20} strokeWidth={1.5} />
            <Text className="flex-1 ml-4 text-sm text-gray-700 font-medium">
              {item.label}
            </Text>
            <ChevronRight color="#d1d5db" size={16} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button - Only show if logged in */}
      {isLoggedIn && (
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="mt-6 flex-row items-center justify-center bg-red-50 py-4 rounded-3xl border border-red-100"
        >
          <LogOut color="#ef4444" size={20} strokeWidth={2} />
          <Text className="ml-2 text-red-500 font-bold">
            {t('auth.logout')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SettingsMenu;
