import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import AppButton from '../components/common/AppButton';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="text-3xl font-bold text-blue-600 mb-6">Home Screen</Text>
      <AppButton 
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        })}
      />
    </View>
  );
};

export default HomeScreen;
