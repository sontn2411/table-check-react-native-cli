import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Camera,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Check,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/useAuthStore';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

type EditProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;

const InputField = ({
  label,
  value,
  onChangeText,
  icon: Icon,
  placeholder,
  keyboardType = 'default',
  editable = true,
  onPress,
}: any) => (
  <View className="mb-6">
    <Text className="text-gray-500 text-sm font-medium mb-2 ml-1">{label}</Text>
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      disabled={!editable && !onPress}
      className={`flex-row items-center border rounded-2xl px-4 py-3.5 ${
        editable || onPress
          ? 'bg-gray-50 border-gray-100'
          : 'bg-gray-100 border-gray-200'
      }`}
    >
      <Icon
        size={18}
        color={editable || onPress ? '#8e4ae7' : '#9ca3af'}
        strokeWidth={2}
      />
      {onPress ? (
        <Text
          className={`flex-1 ml-3 font-medium text-base ${
            value ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {value || placeholder}
        </Text>
      ) : (
        <TextInput
          className={`flex-1 ml-3 font-medium text-base ${
            editable ? 'text-gray-900' : 'text-gray-500'
          }`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboardType}
          editable={editable}
          multiline={label === 'Địa chỉ'}
        />
      )}
    </TouchableOpacity>
  </View>
);

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { user, avatars, updateAvatar, userProfiles, updateProfile } =
    useAuthStore();
  const currentAvatar = user?.email ? avatars[user.email] : null;
  const currentProfile = user?.email ? userProfiles[user.email] : null;

  const [name, setName] = useState(
    currentProfile?.name || user?.username || '',
  );
  const [phone, setPhone] = useState(currentProfile?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [birthday, setBirthday] = useState(currentProfile?.birthday || '');
  const [address, setAddress] = useState(currentProfile?.address || '');

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleImageAction = (result: any) => {
    if (result.didCancel) return;
    if (result.errorCode) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: result.errorMessage || 'Không thể lấy ảnh',
      });
      return;
    }

    const imageUri = result.assets?.[0]?.uri;
    if (imageUri && user?.email) {
      updateAvatar(user.email, imageUri);
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đã cập nhật ảnh đại diện',
      });
    }
  };

  const pickImage = () => {
    const options: any = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    Alert.alert(
      'Thay đổi ảnh đại diện',
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

  const handleSave = () => {
    if (!user?.email) return;

    updateProfile(user.email, {
      name,
      phone,
      birthday,
      address,
    });

    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Thông tin của bạn đã được cập nhật!',
    });

    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    if (selectedDate) {
      const d = currentDate.getDate();
      const m = currentDate.getMonth() + 1;
      const y = currentDate.getFullYear();
      setBirthday(`${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-50"
        >
          <ArrowLeft color="#1f2937" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">
          Chỉnh sửa thông tin
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Avatar Selection */}
        <View className="items-center my-8">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickImage}
            className="relative"
          >
            <View className="w-32 h-32 rounded-full border-4 border-primary/10 overflow-hidden bg-gray-50">
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
            <View className="absolute bottom-1 right-1 bg-primary w-9 h-9 rounded-full items-center justify-center border-4 border-white shadow-sm">
              <Camera size={16} color="white" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          <Text className="text-primary font-bold mt-4">Thay đổi ảnh</Text>
        </View>

        {/* Form Fields */}
        <View className="mt-2">
          <InputField
            label="Tên đăng nhập"
            value={user?.username || ''}
            icon={User}
            editable={false}
          />
          <InputField
            label="Địa chỉ Email"
            value={email}
            icon={Mail}
            editable={false}
          />
          <View className="h-4" />
          <View className="border-b border-gray-50 mb-8" />

          <InputField
            label="Họ và tên"
            value={name}
            onChangeText={setName}
            icon={User}
            placeholder="Nhập họ và tên"
          />
          <InputField
            label="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            icon={Phone}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
          />
          <InputField
            label="Ngày sinh"
            value={birthday}
            icon={Calendar}
            placeholder="Chọn ngày sinh"
            onPress={() => setShowDatePicker(true)}
          />
          <InputField
            label="Địa chỉ"
            value={address}
            onChangeText={setAddress}
            icon={MapPin}
            placeholder="Nhập địa chỉ"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.8}
          className="bg-primary flex-row items-center justify-center py-4 rounded-2xl shadow-lg shadow-primary/30 mt-4"
        >
          <Check size={20} color="white" strokeWidth={3} />
          <Text className="text-white font-bold text-lg ml-2">
            Lưu thay đổi
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <>
          {Platform.OS === 'ios' && (
            <View className="bg-gray-100 p-4 flex-row justify-end border-t border-gray-200">
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text className="text-primary font-bold text-lg">Xác nhận</Text>
              </TouchableOpacity>
            </View>
          )}
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
