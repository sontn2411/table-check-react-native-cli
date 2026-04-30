import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Calendar, Heart, Ticket, Star } from 'lucide-react-native';

const QuickActions = () => {
  const { t } = useTranslation();
  const actions = [
    { icon: Calendar, label: t('settings.saved_bookings') },
    { icon: Heart, label: t('settings.favorites') },
    { icon: Ticket, label: t('settings.promo_codes') },
    { icon: Star, label: t('settings.points_balance') },
  ];

  return (
    <View className="mt-4 mx-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <View className="flex-row items-center py-4">
        {actions.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-1 items-center ${
              index !== actions.length - 1 ? 'border-r border-gray-200' : ''
            }`}
          >
            <item.icon color="#8e4ae7" size={24} strokeWidth={1.5} />
            <Text className="text-[11px] font-bold text-gray-800 mt-2">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="bg-purple-50/30 py-2 items-center border-t border-gray-100">
        <Text className="text-[10px] text-gray-400 italic">
          {t('settings.login_to_view_details')}
        </Text>
      </View>
    </View>
  );
};

export default QuickActions;
