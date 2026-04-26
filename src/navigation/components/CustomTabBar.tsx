import React, { useEffect, memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Search, Calendar, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  interpolateColor,
  FadeInLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { COLORS } from '../../constants/theme';

// --- Constants ---
const ACTIVE_GRADIENT = [COLORS.primary, COLORS.primaryDark];
const INACTIVE_COLOR = '#9ca3af'; // gray-400
const TAB_BAR_HEIGHT = 70;

// --- Helpers ---
const getIcon = (routeName: string, color: string, size: number) => {
  const iconSize = moderateScale(size);
  switch (routeName) {
    case 'HomeTab':
      return <Home color={color} size={iconSize} />;
    case 'Explore':
      return <Search color={color} size={iconSize} />;
    case 'Bookings':
      return <Calendar color={color} size={iconSize} />;
    case 'Account':
      return <User color={color} size={iconSize} />;
    default:
      return <Home color={color} size={iconSize} />;
  }
};

// --- Sub-components ---
const TabItem = memo(
  ({
    route,
    isFocused,
    onPress,
    onLongPress,
    options,
    label,
  }: {
    route: any;
    isFocused: boolean;
    onPress: () => void;
    onLongPress: () => void;
    options: any;
    label: string;
  }) => {
    const scaleValue = useSharedValue(1);
    const progress = useSharedValue(isFocused ? 1 : 0);

    useEffect(() => {
      progress.value = withTiming(isFocused ? 1 : 0, {
        duration: 250,
      });
      scaleValue.value = withTiming(isFocused ? 1.05 : 1, {
        duration: 250,
      });
    }, [isFocused]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
      paddingHorizontal: withTiming(isFocused ? scale(16) : scale(10), {
        duration: 250,
      }),
      transform: [{ scale: scaleValue.value }],
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ['rgba(255, 255, 255, 0)', 'rgba(142, 74, 231, 0.1)'],
      ),
    }));

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: withTiming(isFocused ? 1.1 : 1, { duration: 250 }) },
      ],
    }));

    const animatedGradientStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isFocused ? 1 : 0, { duration: 250 }),
    }));

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarButtonTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.8}
        style={[styles.tabButton, { flex: isFocused ? 1.6 : 1 }]}
      >
        <Animated.View style={[styles.pillContainer, animatedContainerStyle]}>
          {isFocused && (
            <Animated.View
              style={[StyleSheet.absoluteFill, animatedGradientStyle]}
            >
              <LinearGradient
                colors={ACTIVE_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </Animated.View>
          )}
          <Animated.View style={animatedIconStyle}>
            {getIcon(route.name, isFocused ? '#ffffff' : INACTIVE_COLOR, 20)}
          </Animated.View>
          {isFocused && (
            <Animated.Text
              entering={FadeInLeft.duration(250)}
              exiting={FadeOutRight.duration(150)}
              className="font-bold text-white"
              style={{ fontSize: moderateScale(12), marginLeft: scale(4) }}
              numberOfLines={1}
            >
              {label}
            </Animated.Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  },
);

// --- Main Component ---
const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const handlePress = useCallback(
    (route: any, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    },
    [navigation],
  );

  const handleLongPress = useCallback(
    (route: any) => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View
        className="flex-row bg-white rounded-3xl justify-around items-center border border-gray-100"
        style={[styles.content]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          return (
            <TabItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={() => handlePress(route, isFocused)}
              onLongPress={() => handleLongPress(route)}
              options={options}
              label={typeof label === 'string' ? label : ''}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(10),
    right: scale(10),
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  content: {
    height: verticalScale(TAB_BAR_HEIGHT),
    paddingHorizontal: scale(8),
  },
  tabButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    paddingVertical: verticalScale(10),
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 100,
  },
});

export default CustomTabBar;
