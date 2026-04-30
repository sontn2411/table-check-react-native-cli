import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';

const AccountHeader = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <View className="flex flex-row items-center justify-between mt-2 px-5">
      <View>
        <Text className="text-2xl font-bold text-gray-900">Tài khoản</Text>
        <Text className="text-gray-500 mt-1">
          {isAuthenticated
            ? 'Quản lý thông tin tài khoản của bạn'
            : 'Đăng nhập để đầy đủ tiện ích'}
        </Text>
      </View>
      <TouchableOpacity className="bg-primary/10 p-3 rounded-full">
        <Bell color="#8e4ae7" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default AccountHeader;
