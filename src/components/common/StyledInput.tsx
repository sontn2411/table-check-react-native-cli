import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react-native';

interface StyledInputProps {
  icon?: string;
  placeholder?: string;
  isPassword?: boolean;
  [key: string]: any;
}

const StyledInput = ({
  icon,
  placeholder,
  isPassword,
  ...props
}: StyledInputProps) => {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Mapping logic from original component
  const getIcon = () => {
    switch (icon) {
      case 'person-outline':
        return User;
      case 'mail-outline':
        return Mail;
      case 'lock-closed-outline':
        return Lock;
      default:
        return Lock;
    }
  };
  const IconComponent = getIcon();

  return (
    <View
      className={`flex-row items-center rounded-2xl px-4 h-14 mb-4 border-[1.5px] bg-gray-100 ${
        isFocused ? 'border-primary' : ' border-transparent'
      }`}
    >
      {IconComponent && (
        <IconComponent size={20} color={isFocused ? '#8e4ae7' : '#9ca3af'} />
      )}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPassword && !show}
        className="flex-1 ml-3 text-base text-gray-800"
        placeholderTextColor="#9ca3af"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShow(!show)}>
          {show ? (
            <Eye size={20} color="#9ca3af" />
          ) : (
            <EyeOff size={20} color="#9ca3af" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StyledInput;
