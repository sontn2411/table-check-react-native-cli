import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SecurityBanner = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="mt-4 mx-5 bg-[#f9f7ff] rounded-2xl p-4 flex-row items-center border border-purple-50">
      <View className="w-12 h-12 rounded-full bg-white items-center justify-center shadow-sm">
        <ShieldCheck color="#8e4ae7" size={24} strokeWidth={2} />
      </View>

      <View className="flex-1 ml-4 mr-2">
        <Text className="text-[13px] font-bold text-gray-800">
          Đăng nhập để bảo mật thông tin
        </Text>
        <Text className="text-[10px] text-gray-400 mt-1 leading-[14px]">
          Thông tin cá nhân của bạn sẽ được bảo mật tuyệt đối khi sử dụng tài
          khoản Tablecheck.
        </Text>
      </View>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        className="bg-primary px-4 py-2 rounded-xl"
      >
        <Text className="text-white text-[12px] font-bold">Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecurityBanner;
