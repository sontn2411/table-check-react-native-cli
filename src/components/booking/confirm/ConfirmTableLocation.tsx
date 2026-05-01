import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  CheckCircle2,
  Home,
  CloudSun,
  Image as ImageIcon,
  VolumeX,
} from 'lucide-react-native';
import { scale, verticalScale } from '../../../utils/responsive';
import { COLORS } from '../../../constants/theme';

const TABLE_LOCATIONS = [
  {
    id: 'indoor',
    title: 'Trong nhà',
    desc: 'Điều hòa, yên tĩnh',
    icon: Home,
  },
  {
    id: 'outdoor',
    title: 'Ngoài trời',
    desc: 'Không gian thoáng đãng',
    icon: CloudSun,
  },
  {
    id: 'view',
    title: 'View đẹp',
    desc: 'Ưu tiên bàn có view',
    icon: ImageIcon,
  },
  {
    id: 'quiet',
    title: 'Yên tĩnh',
    desc: 'Không gian riêng tư',
    icon: VolumeX,
  },
];

interface Props {
  selectedLocation: string;
  onSelectLocation: (id: string) => void;
}

const ConfirmTableLocation = ({
  selectedLocation,
  onSelectLocation,
}: Props) => {
  return (
    <View className="mb-6">
      <View className="px-5 mb-3 flex-row items-baseline">
        <Text className="text-base font-bold text-gray-900">
          Chọn vị trí bàn
        </Text>
        <Text className="text-xs text-gray-400 ml-2">(tùy chọn)</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(20),
          gap: scale(10),
        }}
      >
        {TABLE_LOCATIONS.map(loc => {
          const isSelected = selectedLocation === loc.id;
          const Icon = loc.icon;
          return (
            <TouchableOpacity
              key={loc.id}
              onPress={() => onSelectLocation(loc.id)}
              style={[
                styles.locationCard,
                isSelected && styles.locationCardSelected,
              ]}
            >
              {isSelected && (
                <View className="absolute top-1.5 right-1.5 z-10 rounded-full">
                  <CheckCircle2 size={16} color="white" fill="#8e4ae7" />
                </View>
              )}
              <Icon
                size={24}
                color={isSelected ? '#8e4ae7' : '#94a3b8'}
                strokeWidth={1.5}
              />
              <Text
                className={`text-xs font-bold mt-2 text-center ${
                  isSelected ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {loc.title}
              </Text>
              <Text
                className={`text-[10px] text-center mt-1 ${
                  isSelected ? 'text-primary/70' : 'text-gray-400'
                }`}
              >
                {loc.desc}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  locationCard: {
    width: scale(95),
    height: verticalScale(100),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 20,
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  locationCardSelected: {
    backgroundColor: '#f3e8ff', // primary/10 roughly
    borderColor: COLORS.primary,
  },
});

export default ConfirmTableLocation;
