import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search, Mic } from 'lucide-react-native';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';

interface ExploreSearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const ExploreSearchBar = ({
  placeholder = 'Tìm nhà hàng, món ăn, khu vực...',
  value,
  onChangeText,
}: ExploreSearchBarProps) => {
  return (
    <View style={styles.searchBarWrap}>
      <View style={styles.searchBar}>
        <Search size={19} color="#94a3b8" />
        <TextInput
          placeholder={placeholder}
          style={styles.searchInput}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
        />
        <Mic size={19} color="#94a3b8" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarWrap: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(8),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 100,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(10),
    color: '#1e293b',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
});

export default ExploreSearchBar;
