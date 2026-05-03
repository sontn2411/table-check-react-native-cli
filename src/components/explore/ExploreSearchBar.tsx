import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import { Search, Mic, MapPin, X } from 'lucide-react-native';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { MOCK_RESTAURANTS, Restaurant } from '../../data/restaurants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

interface ExploreSearchBarProps {
  placeholder?: string;
}

const ExploreSearchBar = ({
  placeholder = 'Tìm nhà hàng, món ăn, khu vực...',
}: ExploreSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Lọc kết quả tìm kiếm theo tên hoặc danh mục
  const searchResults =
    query.trim().length > 0
      ? MOCK_RESTAURANTS.filter(
          r =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.category.toLowerCase().includes(query.toLowerCase()) ||
            r.address.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 5) // Hiển thị tối đa 5 kết quả
      : [];

  const handleSelect = (restaurant: Restaurant) => {
    setQuery('');
    Keyboard.dismiss();
    setIsFocused(false);
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const handleClear = () => {
    setQuery('');
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const showResults = isFocused && query.length > 0;

  return (
    <View style={[styles.searchBarWrap, showResults && styles.searchBarWrapActive]}>
      <View style={styles.searchBar}>
        <Search size={19} color="#94a3b8" />
        <TextInput
          placeholder={placeholder}
          style={styles.searchInput}
          placeholderTextColor="#94a3b8"
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <TouchableOpacity onPress={handleClear} className="p-1">
            <X size={18} color="#94a3b8" />
          </TouchableOpacity>
        ) : (
          <Mic size={19} color="#94a3b8" />
        )}
      </View>

      {/* Dropdown Results */}
      {showResults && (
        <ScrollView 
          style={styles.resultsContainer}
          keyboardShouldPersistTaps="handled"
        >
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.resultItem,
                  index === searchResults.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => handleSelect(item)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.resultImage}
                />
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.resultAddress} numberOfLines={1}>
                    {item.address}
                  </Text>
                </View>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultContainer}>
              <Text style={styles.noResultText}>
                Không tìm thấy kết quả nào cho "{query}"
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarWrap: {
    paddingHorizontal: scale(20),
    marginTop: verticalScale(8),
    zIndex: 100, // Đảm bảo nổi lên trên map
  },
  searchBarWrapActive: {
    // shadow khi có dropdown
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 100,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(12),
    fontSize: moderateScale(14),
    color: '#1e293b',
    padding: 0, // Xóa padding mặc định của Android
    height: '100%',
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  resultImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f1f5f9',
  },
  resultTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  resultAddress: {
    fontSize: moderateScale(12),
    color: '#64748b',
  },
  categoryTag: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryText: {
    fontSize: moderateScale(10),
    color: '#475569',
    fontWeight: '500',
  },
  noResultContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noResultText: {
    fontSize: moderateScale(13),
    color: '#64748b',
  },
});

export default ExploreSearchBar;
