import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft } from 'lucide-react-native';
import SafeScreen from '../../components/SafeScreen';
import StyledInput from '../../components/common/StyledInput';
import { useMutation } from '@tanstack/react-query';
import authService from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setAuth = useAuthStore(state => state.setAuth);

  // State quản lý form
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  // Mutation xử lý đăng nhập
  const mutation = useMutation({
    mutationFn: (data: { identity: string; password: string }) =>
      authService.login(data),
    onSuccess: data => {
      if (data.user && data.accessToken && data.refreshToken) {
        setAuth(data.user, data.accessToken, data.refreshToken);
        Toast.show({
          type: 'success',
          text1: t('auth.login_success'),
          text2: t('auth.welcome_back', { name: data.user.username }),
        });
        // Chuyển hướng về màn hình chính hoặc màn hình trước đó
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          });
        }, 1000);
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        t('auth.login_fail');
      Toast.show({
        type: 'error',
        text1: t('auth.error_login_title'),
        text2: message,
      });
    },
  });

  const handleLogin = () => {
    if (!identity || !password) {
      Toast.show({
        type: 'info',
        text1: t('profile.cancel'),
        text2: t('auth.fill_info'),
      });
      return;
    }
    mutation.mutate({ identity, password });
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Phần Header */}
            {/* Nút Back (Glass effect) */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-6 left-4 z-50 w-10 h-10 rounded-full items-center justify-center bg-white/70"
            >
              <ChevronLeft size={24} color="#8e4ae7" />
            </TouchableOpacity>

            <View style={styles.imageWrapper}>
              <View style={styles.curveMask}>
                <Image
                  source={require('../../../assets/images/auth-3.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>

              <View className="absolute w-full items-center">
                <Image
                  source={require('../../../assets/images/logo1.png')}
                  className="w-40 h-32 "
                  resizeMode="contain"
                  style={{ tintColor: '#8e4ae7' }}
                />

                <Text className="text-gray-600  text-xs font-medium text-center px-10">
                  {t('auth.slogan')}
                </Text>
              </View>
            </View>

            <View className="px-6 -mt-10 bg-white rounded-t-[40px] pt-8 flex-1 z-10">
              <Text className="text-xl font-bold text-center text-gray-900">
                {t('auth.login_title')}
              </Text>
              <Text className="text-gray-500 text-center text-xs mt-1 mb-6">
                {t('auth.login_desc')}
              </Text>

              <StyledInput
                icon="person-outline"
                placeholder={t('auth.username_or_email')}
                value={identity}
                onChangeText={setIdentity}
                autoCapitalize="none"
              />

              <StyledInput
                icon="lock-closed-outline"
                placeholder={t('auth.password')}
                isPassword
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity className="items-end mb-4">
                <Text className="text-primary font-bold text-xs">
                  {t('auth.forgot_password')}
                </Text>
              </TouchableOpacity>

              {/* Nút Đăng nhập */}
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={mutation.isPending}
                onPress={handleLogin}
                className={`h-14 rounded-2xl items-center justify-center shadow-md ${
                  mutation.isPending
                    ? 'bg-gray-300 shadow-none'
                    : 'bg-primary shadow-primary/20'
                }`}
              >
                {mutation.isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg">
                    {t('auth.login')}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Footer */}
              <View className="flex-row justify-center mt-auto pb-10">
                <Text className="text-gray-500 text-xs">
                  {t('auth.no_account')}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text className="text-primary font-bold text-xs">
                    {t('auth.register_now')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageWrapper: {
    width: '100%',
    height: 280,
    overflow: 'hidden',
  },
  curveMask: {
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    alignSelf: 'center',
    position: 'absolute',
    top: -width * 1.37,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: 280,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
