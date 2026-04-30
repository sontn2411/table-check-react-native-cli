import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';

const AccountHeader = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <View className="flex flex-row items-center justify-between mt-2 px-5">
      <View>
        <Text className="text-2xl font-bold text-gray-900">{t('settings.account_title')}</Text>
        <Text className="text-gray-500 mt-1">
          {isAuthenticated
            ? t('settings.manage_account')
            : t('settings.login_for_utilities')}
        </Text>
      </View>
      <TouchableOpacity className="bg-primary/10 p-3 rounded-full">
        <Bell color="#8e4ae7" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default AccountHeader;
