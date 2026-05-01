import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';

interface FilterItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
}

interface ExploreFilterListProps {
  filters: FilterItem[];
  activeFilterId?: string;
  onFilterPress?: (id: string) => void;
}

const ExploreFilterList = ({
  filters,
  activeFilterId = 'filter',
  onFilterPress,
}: ExploreFilterListProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtersScroll}
      contentContainerStyle={styles.filtersContent}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.id}
          style={styles.filterChip}
          onPress={() => onFilterPress?.(filter.id)}
        >
          <filter.icon
            size={15}
            color={filter.id === activeFilterId ? COLORS.primary : '#64748b'}
            strokeWidth={2.5}
          />
          <Text
            style={[
              styles.filterLabel,
              filter.id === activeFilterId && styles.filterLabelActive,
            ]}
          >
            {filter.label}
          </Text>
          {filter.badge && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filter.badge}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtersScroll: {
    marginTop: verticalScale(10),
  },
  filtersContent: {
    paddingHorizontal: scale(20),
    paddingRight: scale(40),
    gap: scale(8),
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: scale(6),
  },
  filterLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#475569',
  },
  filterLabelActive: {
    color: COLORS.primary,
  },
  filterBadge: {
    backgroundColor: COLORS.primary,
    width: scale(16),
    height: scale(16),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: moderateScale(9),
    fontWeight: 'bold',
  },
});

export default ExploreFilterList;
