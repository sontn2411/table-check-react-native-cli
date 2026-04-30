import React, { useState } from 'react';
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
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ChevronLeft, CheckCircle2, Circle } from 'lucide-react-native';
import SafeScreen from '../../components/SafeScreen';
import StyledInput from '../../components/common/StyledInput';
import { useMutation } from '@tanstack/react-query';
import authService from '../../api/auth';
import { PayloadRegister } from '../../types/auth';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // State quản lý form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Mutation xử lý đăng ký
  const mutation = useMutation({
    mutationFn: (data: PayloadRegister) => authService.register(data),
    onSuccess: data => {
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Tài khoản của bạn đã được tạo thành công! ✨',
      });
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        'Có lỗi xảy ra, vui lòng thử lại sau.';
      Toast.show({
        type: 'error',
        text1: 'Lỗi đăng ký',
        text2: message,
      });
    },
  });

  const handleRegister = () => {
    if (!username || !email || !password) {
      Toast.show({
        type: 'info',
        text1: 'Thông báo',
        text2: 'Vui lòng nhập đầy đủ thông tin.',
      });
      return;
    }

    if (!agreed) {
      Toast.show({
        type: 'info',
        text1: 'Điều khoản',
        text2: 'Bạn cần đồng ý với điều khoản sử dụng.',
      });
      return;
    }

    mutation.mutate({ username, email, password });
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
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
                  Đặt bàn dễ dàng, trải nghiệm trọn vẹn
                </Text>
              </View>
            </View>

            <View className="px-6 -mt-10 bg-white rounded-t-[40px] pt-8 flex-1 z-10">
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="text-xl font-bold text-center text-gray-900">
                  Tạo tài khoản mới
                </Text>
                <Text className="text-gray-500 text-center text-xs mt-1 mb-6">
                  Tham gia cộng đồng để nhận ưu đãi hấp dẫn
                </Text>

                <StyledInput
                  icon="person-outline"
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />

                <StyledInput
                  icon="mail-outline"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <StyledInput
                  icon="lock-closed-outline"
                  placeholder="Mật khẩu"
                  isPassword
                  value={password}
                  onChangeText={setPassword}
                />

                {/* Terms Agreement */}
                <TouchableOpacity
                  onPress={() => setAgreed(!agreed)}
                  className="flex-row items-center mb-6 mt-2"
                >
                  {agreed ? (
                    <CheckCircle2 color="#8e4ae7" size={20} fill="#f3e8ff" />
                  ) : (
                    <Circle color="#d1d5db" size={20} />
                  )}
                  <Text className="text-gray-500 text-[11px] ml-2 flex-1">
                    Tôi đồng ý với{' '}
                    <Text className="text-primary font-bold">
                      Điều khoản sử dụng
                    </Text>{' '}
                    và{' '}
                    <Text className="text-primary font-bold">
                      Chính sách bảo mật
                    </Text>
                  </Text>
                </TouchableOpacity>

                {/* Nút Đăng ký */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={mutation.isPending}
                  onPress={handleRegister}
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
                      Đăng ký
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Footer */}
                <View className="flex-row justify-center mt-8 pb-10">
                  <Text className="text-gray-500 text-xs">
                    Đã có tài khoản?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text className="text-primary font-bold text-xs">
                      Đăng nhập ngay
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

export default RegisterScreen;

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
