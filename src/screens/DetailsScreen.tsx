import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { itemId, otherParam } = route.params;

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-4">
      <Text className="text-2xl font-semibold text-gray-800 mb-4">Details Screen</Text>
      <View className="bg-white p-6 rounded-xl shadow-md w-full mb-6">
        <Text className="text-gray-600 mb-2">Item ID: <Text className="font-bold text-gray-900">{itemId}</Text></Text>
        <Text className="text-gray-600">Other Param: <Text className="font-bold text-gray-900">{otherParam}</Text></Text>
      </View>
      <View className="flex-row space-x-4">
        <TouchableOpacity
          className="bg-gray-200 px-6 py-3 rounded-full active:bg-gray-300"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-gray-800 font-medium">Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-full active:bg-blue-600"
          onPress={() => navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })}
        >
          <Text className="text-white font-medium">Go to Details Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;
