import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Pencil, ChevronRight } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type ProfileCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const UserProfileCard = () => {
  const navigation = useNavigation<ProfileCardNavigationProp>();
  const { user, avatars, updateAvatar, userProfiles } = useAuthStore();
  const currentAvatar = user?.email ? avatars[user.email] : null;
  const currentProfile = user?.email ? userProfiles[user.email] : null;

  const handleImageAction = (result: any) => {
    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Lỗi', result.errorMessage || 'Không thể lấy ảnh');
      return;
    }

    const imageUri = result.assets?.[0]?.uri;
    if (imageUri && user?.email) {
      updateAvatar(user.email, imageUri);
    }
  };

  const pickImage = () => {
    const options: any = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    Alert.alert(
      'Cập nhật ảnh đại diện',
      'Chọn phương thức bạn muốn sử dụng',
      [
        {
          text: 'Chụp ảnh mới',
          onPress: async () => {
            const result = await launchCamera(options);
            handleImageAction(result);
          },
        },
        {
          text: 'Chọn từ thư viện',
          onPress: async () => {
            const result = await launchImageLibrary(options);
            handleImageAction(result);
          },
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View className="mx-4 mt-6">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('EditProfile')}
        className="bg-primary rounded-2xl py-6 px-4 flex-row items-center relative overflow-hidden"
      >
        {/* Avatar with Edit Icon */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={pickImage}
          className="relative"
        >
          <View className="w-20 h-20 rounded-full border-2 border-white overflow-hidden bg-white/10">
            <Image
              source={
                currentAvatar
                  ? { uri: currentAvatar }
                  : {
                      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
                    }
              }
              className="w-full h-full"
            />
          </View>
          <View className="absolute bottom-0 -right-1 bg-white w-8 h-8 rounded-full items-center justify-center shadow-sm">
            <Pencil size={14} color="#8e4ae7" />
          </View>
        </TouchableOpacity>

        {/* Info */}
        <View className="ml-5 flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-white text-xl font-bold mr-2">
              {currentProfile?.name || user?.username || 'Minh Nguyễn'}
            </Text>
            <View className="bg-white/20 px-2 py-0.5 rounded-full flex-row items-center">
              <Text className="text-white text-[10px] font-bold">⭐ VIP</Text>
            </View>
          </View>
          <Text className="text-white/80 text-sm mb-1">
            {currentProfile?.phone || '0901 234 567'}
          </Text>
          <Text className="text-white/80 text-sm">{user?.email || 'minhnguyen@gmail.com'}</Text>
        </View>

        {/* Chevron */}
        <ChevronRight color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileCard;
