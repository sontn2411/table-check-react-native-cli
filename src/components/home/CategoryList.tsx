import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CATEGORIES } from '../../data';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';

interface CategoryListProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const CategoryList = ({ activeId, onSelect }: CategoryListProps) => {
  const renderItem = ({ item }: { item: typeof CATEGORIES[0] }) => {
    const isActive = activeId === item.id;

    return (
      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.categoryItem}
        onPress={() => onSelect(item.id)}
      >
        <View style={[
          styles.imageContainer,
          isActive && styles.activeImageContainer
        ]}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <Text style={[
          styles.name,
          isActive && styles.activeName
        ]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
  },
  listContent: {
    paddingHorizontal: scale(20),
    gap: scale(15),
  },
  categoryItem: {
    alignItems: 'center',
    gap: verticalScale(8),
  },
  imageContainer: {
    width: scale(65),
    height: scale(65),
    borderRadius: scale(32.5),
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeImageContainer: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#334155',
  },
  activeName: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default CategoryList;
