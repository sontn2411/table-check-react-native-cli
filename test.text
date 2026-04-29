import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default function HomeScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        className='bg-white'
      >
        <View style={{ flex: 1 }}>
          {/* Phần Header */}
          <View style={styles.imageWrapper}>
            <View style={styles.curveMask}>
              <Image
                source={require('@/assets/images/auth-3.jpg')}
                style={styles.image}
                resizeMode='cover'
              />
            </View>

            <View
              className='absolute w-full items-center'
              style={{ paddingTop: 40 }}
            >
              <Image
                source={require('@/assets/images/react-logo.png')}
                className='w-12 h-12 mb-2'
                resizeMode='contain'
                style={{ tintColor: '#8e4ae7' }}
              />
              <Text className='text-2xl font-extrabold text-[#1a1a1a] tracking-tight'>
                tablecheck
              </Text>
              <Text className='text-gray-600 mt-1 text-xs font-medium text-center px-10'>
                Đặt bàn dễ dàng, trải nghiệm trọn vẹn
              </Text>
            </View>
          </View>

          {/* Form Đăng Nhập */}
          <View className='px-6 -mt-10 bg-white rounded-t-[40px] pt-8 flex-1'>
            <Text className='text-xl font-bold text-center text-[#1a1a1a]'>
              Chào mừng bạn trở lại!
            </Text>
            <Text className='text-gray-400 text-center text-xs mt-1 mb-6'>
              Đăng nhập để tiếp tục đặt bàn và nhận ưu đãi
            </Text>

            {/* Ô nhập Email/SĐT */}
            <StyledInput
              icon='person-outline'
              placeholder='Email hoặc số điện thoại'
            />

            {/* Ô nhập Mật khẩu */}
            <StyledInput
              icon='lock-closed-outline'
              placeholder='Mật khẩu'
              isPassword
            />

            <TouchableOpacity className='items-end mb-4'>
              <Text className='text-primary font-bold text-xs'>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>

            {/* Nút Đăng nhập */}
            <TouchableOpacity
              activeOpacity={0.8}
              className='bg-primary h-14 rounded-2xl items-center justify-center shadow-md shadow-primary/20'
            >
              <Text className='text-white font-bold text-lg'>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className='flex-row items-center my-4'>
              <View className='flex-1 h-[0.5px] bg-gray-200' />
              <Text className='mx-3 text-gray-400 text-[10px]'>hoặc</Text>
              <View className='flex-1 h-[0.5px] bg-gray-200' />
            </View>

            {/* Nút Đăng nhập MXH */}
            <View className='gap-y-2'>
              <SocialButton icon='logo-google' text='Google' color='#ef4444' />
              <SocialButton
                icon='logo-facebook'
                text='Facebook'
                color='#3b82f6'
              />
            </View>

            {/* Footer */}
            <View className='flex-row justify-center mt-auto pb-6'>
              <Text className='text-gray-500 text-xs'>Chưa có tài khoản? </Text>
              <TouchableOpacity>
                <Text className='text-primary font-bold text-xs'>
                  Đăng ký ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

// Component Input tùy chỉnh với chức năng Ẩn/Hiện mật khẩu
function StyledInput({ icon, placeholder, isPassword = false }: any) {
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View className='mb-3'>
      <View
        className={`flex-row items-center bg-gray-50 rounded-2xl px-4 h-14 border ${
          isFocused ? 'border-primary border-[1.5px]' : 'border-gray-100'
        }`}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isFocused ? '#8e4ae7' : '#9ca3af'}
        />
        <TextInput
          placeholder={placeholder}
          // Nếu là mật khẩu thì dựa vào state isPasswordVisible để ẩn/hiện
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='flex-1 ml-3 text-sm text-gray-800'
          placeholderTextColor='#9ca3af'
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color='#9ca3af'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

function SocialButton({ icon, text, color }: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row items-center border border-gray-100 h-14 rounded-2xl px-4 bg-white shadow-sm shadow-gray-100'
    >
      <Ionicons name={icon} size={20} color={color} />
      <Text className='flex-1 text-center font-bold text-gray-600 mr-4 text-xs'>
        Tiếp tục với {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})
