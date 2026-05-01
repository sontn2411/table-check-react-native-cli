import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { verticalScale, moderateScale } from '../../../utils/responsive';

interface Props {
  note: string;
  onChangeNote: (note: string) => void;
}

const ConfirmNote = ({ note, onChangeNote }: Props) => {
  return (
    <View className="px-5 mb-6">
      <View className="mb-3 flex-row items-baseline">
        <Text className="text-base font-bold text-gray-900">
          Ghi chú cho nhà hàng
        </Text>
        <Text className="text-xs text-gray-400 ml-2">(tùy chọn)</Text>
      </View>
      <View className="bg-white  rounded-2xl p-4  relative">
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Ví dụ: Sinh nhật, kỷ niệm, yêu cầu đặc biệt..."
          placeholderTextColor="#94a3b8"
          value={note}
          onChangeText={onChangeNote}
          maxLength={200}
          style={{
            height: verticalScale(60),
            textAlignVertical: 'top',
            fontSize: moderateScale(13),
          }}
        />
        <Text className="absolute bottom-3 right-4 text-xs text-gray-300">
          {note.length}/200
        </Text>
      </View>
    </View>
  );
};

export default ConfirmNote;
