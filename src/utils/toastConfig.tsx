import React from 'react';
import { View, Text } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react-native';

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <View className="w-[90%] bg-white border-l-4 border-green-500 rounded-xl px-4 py-3 flex-row items-center shadow-lg shadow-black/10">
      <View className="bg-green-100 p-2 rounded-full mr-3">
        <CheckCircle2 size={20} color="#22c55e" />
      </View>
      <View className="flex-1">
        {text1 && (
          <Text className="text-gray-900 font-bold text-sm">{text1}</Text>
        )}
        {text2 && <Text className="text-gray-500 text-xs mt-0.5">{text2}</Text>}
      </View>
    </View>
  ),

  error: ({ text1, text2 }) => (
    <View className="w-[90%] bg-white border-l-4 border-red-500 rounded-xl px-4 py-3 flex-row items-center shadow-lg shadow-black/10">
      <View className="bg-red-100 p-2 rounded-full mr-3">
        <AlertCircle size={20} color="#ef4444" />
      </View>
      <View className="flex-1">
        {text1 && (
          <Text className="text-gray-900 font-bold text-sm">{text1}</Text>
        )}
        {text2 && <Text className="text-gray-500 text-xs mt-0.5">{text2}</Text>}
      </View>
    </View>
  ),

  info: ({ text1, text2 }) => (
    <View className="w-[90%] bg-white border-l-4 border-blue-500 rounded-xl px-4 py-3 flex-row items-center shadow-lg shadow-black/10">
      <View className="bg-blue-100 p-2 rounded-full mr-3">
        <Info size={20} color="#3b82f6" />
      </View>
      <View className="flex-1">
        {text1 && (
          <Text className="text-gray-900 font-bold text-sm">{text1}</Text>
        )}
        {text2 && <Text className="text-gray-500 text-xs mt-0.5">{text2}</Text>}
      </View>
    </View>
  ),
};
