import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const AppButton = ({ title, variant = 'primary', className = '', ...props }: AppButtonProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-emerald-500 active:bg-emerald-600';
      case 'outline':
        return 'bg-transparent border-2 border-blue-500 active:bg-blue-50';
      default:
        return 'bg-blue-500 active:bg-blue-600';
    }
  };

  const getTextClass = () => {
    return variant === 'outline' ? 'text-blue-500' : 'text-white';
  };

  return (
    <TouchableOpacity
      className={`px-6 py-3 rounded-full shadow-sm items-center justify-center ${getVariantClass()} ${className}`}
      {...props}
    >
      <Text className={`text-lg font-semibold ${getTextClass()}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
