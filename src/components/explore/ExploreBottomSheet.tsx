import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { Restaurant } from '../../data/restaurants';
import ExploreRestaurantCard from './ExploreRestaurantCard';

interface ExploreBottomSheetProps {
  restaurants: Restaurant[];
  selectedRestaurantId?: string;
  onRestaurantPress: (item: Restaurant) => void;
  snapPoints: string[];
}

const ExploreBottomSheet = forwardRef<BottomSheet, ExploreBottomSheetProps>(
  ({ restaurants, selectedRestaurantId, onRestaurantPress, snapPoints }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.sheetIndicator}
        backgroundStyle={styles.sheetBackground}
        bottomInset={verticalScale(95)}
        detached={true}
        style={{ marginHorizontal: scale(10) }}
        enableContentPanningGesture={false}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>
            {restaurants.length}+ nhà hàng
          </Text>
        </View>

        <BottomSheetFlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExploreRestaurantCard
              item={item}
              isSelected={selectedRestaurantId === item.id}
              onPress={onRestaurantPress}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  sheetBackground: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
  sheetIndicator: {
    backgroundColor: '#e2e8f0',
    width: scale(40),
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(4),
    paddingBottom: verticalScale(8),
  },
  sheetTitle: {
    fontSize: moderateScale(14),
    fontWeight: '900',
    color: '#1e293b',
  },
  listContent: {
    paddingVertical: verticalScale(8),
    paddingLeft: scale(20),
    paddingRight: scale(8),
  },
});

export default ExploreBottomSheet;
