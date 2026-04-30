import { TouchableOpacity, View, Text } from 'react-native';
import { Bell, Languages } from 'lucide-react-native';
import { useBookingStore } from '../store/useBookingStore';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const HeaderCustom = ({ title, subtitle }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <View className="flex flex-row items-center justify-between mt-2 px-5">
      <View>
        <Text className="text-2xl font-bold text-gray-900">{title}</Text>
        <Text className="text-gray-500 mt-1">{subtitle}</Text>
      </View>
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
  );
};

export default HeaderCustom;
