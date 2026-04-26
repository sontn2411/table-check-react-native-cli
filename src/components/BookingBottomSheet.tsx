import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  Calendar as CalendarIcon,
  Timer,
  Users,
  X,
  Check,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { COLORS } from '../constants/theme';
import { scale, verticalScale, moderateScale } from '../utils/responsive';
import DateSelector from './booking/DateSelector';
import TimeSelector from './booking/TimeSelector';
import GuestSelector from './booking/GuestSelector';

import { useBookingStore } from '../store/useBookingStore';

const { width } = Dimensions.get('window');

interface BookingBottomSheetProps {
  initialType?: 'date' | 'time' | 'guests';
  onClose?: () => void;
}

const BookingBottomSheet = forwardRef<
  BottomSheetModal,
  BookingBottomSheetProps
>(({ initialType = 'date', onClose }, ref) => {
  const { t } = useTranslation();
  const { date, setDate } = useBookingStore();
  const [activeTab, setActiveTab] = useState<'date' | 'time' | 'guests'>(
    initialType,
  );
  const snapPoints = useMemo(() => ['75%'], []);

  // Animation value for sliding indicator
  const translateX = useSharedValue(
    initialType === 'date' ? 0 : initialType === 'time' ? 1 : 2,
  );

  useEffect(() => {
    setActiveTab(initialType);
    translateX.value = withTiming(
      initialType === 'date' ? 0 : initialType === 'time' ? 1 : 2,
      { duration: 300 },
    );
  }, [initialType]);

  const handleTabPress = (type: 'date' | 'time' | 'guests', index: number) => {
    setActiveTab(type);
    translateX.value = withTiming(index, { duration: 300 });
  };

  const handleDateSelect = (d: Date) => {
    setDate(d);
    // Auto switch to time tab after selecting date for better UX
    handleTabPress('time', 1);
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    const tabWidth = (width - scale(50)) / 3;
    return {
      transform: [{ translateX: translateX.value * tabWidth }],
    };
  });

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  const renderBody = () => {
    switch (activeTab) {
      case 'date':
        return (
          <DateSelector
            selectedDate={date}
            onSelect={handleDateSelect}
          />
        );
      case 'time':
        return <TimeSelector selectedDate={date} />;
      case 'guests':
        return <GuestSelector />;
      default:
        return null;
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose
      enableOverDrag={false}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: '#e5e7eb', width: scale(40) }}
      backgroundStyle={styles.background}
      onDismiss={onClose}
    >
      <BottomSheetView style={[styles.content, { flex: 1 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('booking.title')}</Text>
          <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
            <X color={COLORS.text} size={24} />
          </TouchableOpacity>
        </View>

        {/* Tab Selector inside Sheet */}
        <View style={styles.tabBar}>
          {/* Sliding Indicator */}
          <Animated.View
            style={[styles.activeIndicator, animatedIndicatorStyle]}
          />

          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress('date', 0)}
          >
            <CalendarIcon
              size={18}
              color={activeTab === 'date' ? COLORS.white : COLORS.text}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'date' && styles.activeTabText,
              ]}
            >
              {t('booking.date')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress('time', 1)}
          >
            <Timer
              size={18}
              color={activeTab === 'time' ? COLORS.white : COLORS.text}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'time' && styles.activeTabText,
              ]}
            >
              {t('booking.time')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleTabPress('guests', 2)}
          >
            <Users
              size={18}
              color={activeTab === 'guests' ? COLORS.white : COLORS.text}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'guests' && styles.activeTabText,
              ]}
            >
              {t('booking.guests')}
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          key={activeTab}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={styles.body}
        >
          {renderBody()}
        </Animated.View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 15,
    padding: scale(5),
    marginBottom: verticalScale(20),
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: scale(5),
    left: scale(5),
    bottom: scale(5),
    width: (width - scale(50)) / 3,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    borderRadius: 12,
    gap: scale(5),
    zIndex: 10,
  },
  tabText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: COLORS.text,
  },
  activeTabText: {
    color: COLORS.white,
  },
  body: {
    flex: 1,
  },
  placeholder: {
    color: '#9ca3af',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: verticalScale(50),
  },
  footer: {
    paddingVertical: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(15),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default BookingBottomSheet;
