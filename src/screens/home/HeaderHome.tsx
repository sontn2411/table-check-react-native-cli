import { Text, TouchableOpacity, View } from 'react-native';
import { MapPin, ChevronDown, Languages, Bell } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import LocationBottomSheet from '../../components/LocationBottomSheet';
import { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useLocationStore } from '../../store/useLocationStore';

import { LOCATION_COORDS } from '../../data/booking';

const HeaderHome = () => {
  const { t, i18n } = useTranslation();
  const { cityName, setManualLocation, requestLocation } = useLocationStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLanguage);
  };

  const handleOpenLocationSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleSelectLocation = (loc: string) => {
    if (loc === 'Vị trí hiện tại') {
      requestLocation();
      return;
    }

    const coords = LOCATION_COORDS[loc];
    if (coords) {
      setManualLocation(loc, coords.lat, coords.lng);
    } else {
      // Fallback for cities without explicit coords
      setManualLocation(loc);
    }
  };

  return (
    <View className="px-5">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={handleOpenLocationSheet}
          className="flex-row items-center gap-1"
        >
          <MapPin color="#8e4ae7" size={20} />
          <View className="flex-row items-center">
            <Text className="text-base font-semibold">{cityName}</Text>
            <ChevronDown color="#8e4ae7" size={15} />
          </View>
        </TouchableOpacity>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={toggleLanguage}
            className="bg-primary/10 px-3 py-1.5 rounded-full flex-row items-center gap-1.5"
          >
            <Languages color="#8e4ae7" size={18} />
            <Text className="text-primary font-bold text-xs">
              {i18n.language.toUpperCase()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-primary/10 p-2 rounded-full">
            <Bell color="#8e4ae7" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <LocationBottomSheet
        ref={bottomSheetRef}
        selectedLocation={cityName}
        onSelect={handleSelectLocation}
      />
    </View>
  );
};

export default HeaderHome;
