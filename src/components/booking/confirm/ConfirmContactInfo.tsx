import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { User, ChevronRight, X, Phone, Mail } from 'lucide-react-native';
import { useAuthStore } from '../../../store/useAuthStore';

const ConfirmContactInfo = () => {
  const { user, userProfiles } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Local state for transient booking info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Temp state for editing in modal
  const [tempName, setTempName] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [tempEmail, setTempEmail] = useState('');

  useEffect(() => {
    if (user) {
      const profile = userProfiles[user.email] || {};
      const initialName = profile.name || user.username || '';
      const initialPhone = profile.phone || '';
      const initialEmail = user.email || '';

      setName(initialName);
      setPhone(initialPhone);
      setEmail(initialEmail);

      setTempName(initialName);
      setTempPhone(initialPhone);
      setTempEmail(initialEmail);
    }
  }, [user, userProfiles]);

  if (!user) return null;

  const handleOpenModal = () => {
    setTempName(name);
    setTempPhone(phone);
    setTempEmail(email);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    setName(tempName);
    setPhone(tempPhone);
    setEmail(tempEmail);
    setIsModalVisible(false);
  };

  return (
    <View className="px-5 mb-6">
      <Text className="text-base font-bold text-gray-900 mb-3">
        Thông tin liên hệ
      </Text>
      <View className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex-row items-center">
        <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center">
          <User size={24} color="#8e4ae7" />
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-sm font-bold text-gray-900">{name}</Text>
          <Text className="text-xs text-gray-500 mt-0.5">
            {phone || 'Chưa cập nhật SĐT'}
          </Text>
          <Text className="text-xs text-gray-500">{email}</Text>
        </View>
        <TouchableOpacity
          onPress={handleOpenModal}
          className="flex-row items-center"
        >
          <Text className="text-primary text-xs font-bold mr-1">Sửa</Text>
          <ChevronRight size={14} color="#8e4ae7" />
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View className="flex-1 bg-black/40 justify-center px-6">
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="bg-white rounded-[32px] p-6 shadow-xl"
              >
                <View className="flex-row justify-between items-center mb-6">
                  <Text className="text-lg font-bold text-gray-900">
                    Sửa thông tin liên hệ
                  </Text>
                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <X size={20} color="#94a3b8" />
                  </TouchableOpacity>
                </View>

                <View className="space-y-4">
                  {/* Name Input */}
                  <View>
                    <Text className="text-xs font-bold text-gray-500 mb-2 ml-1">
                      Họ và tên
                    </Text>
                    <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                      <User size={18} color="#94a3b8" />
                      <TextInput
                        className="flex-1 ml-3 text-sm text-gray-900"
                        value={tempName}
                        onChangeText={setTempName}
                        placeholder="Nhập họ tên"
                      />
                    </View>
                  </View>

                  {/* Phone Input */}
                  <View>
                    <Text className="text-xs font-bold text-gray-500 mb-2 ml-1">
                      Số điện thoại
                    </Text>
                    <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                      <Phone size={18} color="#94a3b8" />
                      <TextInput
                        className="flex-1 ml-3 text-sm text-gray-900"
                        value={tempPhone}
                        onChangeText={setTempPhone}
                        placeholder="Nhập số điện thoại"
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  {/* Email Input */}
                  <View>
                    <Text className="text-xs font-bold text-gray-500 mb-2 ml-1">
                      Email
                    </Text>
                    <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                      <Mail size={18} color="#94a3b8" />
                      <TextInput
                        className="flex-1 ml-3 text-sm text-gray-900"
                        value={tempEmail}
                        onChangeText={setTempEmail}
                        placeholder="Nhập email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-3 mt-8">
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    className="flex-1 bg-gray-100 py-3.5 rounded-2xl items-center"
                  >
                    <Text className="text-gray-500 font-bold">Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSave}
                    className="flex-1 bg-primary py-3.5 rounded-2xl items-center shadow-sm shadow-primary/30"
                  >
                    <Text className="text-white font-bold">Lưu thay đổi</Text>
                  </TouchableOpacity>
                </View>

                <Text className="text-center text-[10px] text-gray-400 mt-4 px-4">
                  * Thay đổi này chỉ áp dụng cho lượt đặt bàn này và không lưu
                  vào hồ sơ cá nhân của bạn.
                </Text>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ConfirmContactInfo;
