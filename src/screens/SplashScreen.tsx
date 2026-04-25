import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BootSplash from 'react-native-bootsplash';
import Icon from '../components/common/Icon';

const { width, height } = Dimensions.get('window');

// Floating icon card component
const FloatingIconCard = ({
  className,
  delay,
  children,
}: {
  className?: string;
  delay: number;
  children: React.ReactNode;
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      className={`w-[62px] h-[62px] rounded-full bg-transparent border border-white flex items-center justify-center shadow-lg blur-lg ${className}`}
      style={{ transform: [{ translateY: floatAnim }] }}
    >
      {children}
    </Animated.View>
  );
};

// Radial glow rings - concentric circles with soft gradient & blur feel
const RING_CONFIG = [
  // Ring 1: matches logo circle size (w-48 + p-6*2 = 240px)
  {
    size: 240,
    opacity: 0.18,
    colors: ['#c4b5fd', '#ddd6fe', '#ede9fe'],
    borderColor: 'rgba(139,92,246,0.06)',
  },
  {
    size: 320,
    opacity: 0.14,
    colors: ['#c4b5fd', '#ddd6fe', '#ede9fe'],
    borderColor: 'rgba(167,139,250,0.05)',
  },
  {
    size: 400,
    opacity: 0.09,
    colors: ['#ddd6fe', '#ede9fe', '#ede9fe'],
    borderColor: 'rgba(196,181,253,0.04)',
  },
  {
    size: 480,
    opacity: 0.05,
    colors: ['#ede9fe', '#ede9fe', '#ede9fe'],
    borderColor: 'rgba(221,214,254,0.03)',
  },
  {
    size: 560,
    opacity: 0.025,
    colors: ['#ede9fe', '#ede9fe', '#ede9fe'],
    borderColor: 'rgba(233,213,255,0.02)',
  },
];

const RadialGlowRings = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {RING_CONFIG.map((ring, index) => (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            width: ring.size,
            height: ring.size,
            borderRadius: ring.size / 2,
            opacity: ring.opacity,
            borderWidth: 0.8,
            borderColor: ring.borderColor,
            transform: [{ scale: pulseAnim }],
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={ring.colors}
            style={{
              width: ring.size,
              height: ring.size,
              borderRadius: ring.size / 2,
            }}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 0, y: 0 }}
          />
        </Animated.View>
      ))}
    </View>
  );
};

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.7)).current;
  const exitFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Hide native splash
    BootSplash.hide({ fade: true });

    // Fade in + scale logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // After 2.5s, fade out and finish
    const timer = setTimeout(() => {
      Animated.timing(exitFade, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      className="flex-1 bg-[#ede9fe]"
      style={{ opacity: exitFade }}
    >
      {/* Gradient background */}
      <LinearGradient
        colors={['#ede9fe', '#e9e5fd', '#ede9fe']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Decorative circles */}
      <View className="absolute w-[55vw] h-[55vw] rounded-full bg-violet-300 opacity-15 -top-[15%] -left-[15%]" />
      <View className="absolute w-[70vw] h-[70vw] rounded-full bg-violet-300 opacity-10 -bottom-[20%] -right-[20%]" />
      <View className="absolute w-[40vw] h-[40vw] rounded-full bg-violet-200 opacity-12 bottom-[15%] -left-[10%]" />

      {/* Floating Icon Cards */}
      <Animated.View className="flex-1" style={{ opacity: fadeAnim }}>
        <FloatingIconCard className="absolute top-[28%] left-[20%] " delay={0}>
          <Icon
            name="platter"
            size={28}
            color="#8b5cf6"
            style={{ transform: [{ rotate: '25deg' }] }}
          />
        </FloatingIconCard>

        <FloatingIconCard
          className="absolute top-[32%] right-[20%]"
          delay={300}
        >
          <Icon name="toolKit" size={28} color="#8b5cf6" />
        </FloatingIconCard>

        <FloatingIconCard className="absolute top-[58%] left-[18%]" delay={600}>
          <Icon name="calendar" size={28} color="#8b5cf6" />
        </FloatingIconCard>

        <FloatingIconCard
          className="absolute top-[62%] right-[18%]"
          delay={900}
        >
          <Icon name="users" size={28} color="#8b5cf6" />
        </FloatingIconCard>

        {/* Center Content */}
        <View className="flex-1 justify-center items-center px-10">
          {/* Logo + Radial Glow wrapper - rings centered on logo */}
          <Animated.View
            style={{
              transform: [{ scale: logoScaleAnim }],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RadialGlowRings />
            <View className="  shadow-xl  rounded-full p-6">
              <Image
                source={require('../../assets/bootsplash/logo-tablecheck.png')}
                className="w-48 h-48"
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </View>

        {/* Bottom loading section */}
        <View className="pb-16 items-center">
          <ActivityIndicator size="small" color="#7c3aed" />
          <Text className="text-xs text-violet-600 opacity-70 mt-2">
            Đang chuẩn bị trải nghiệm tuyệt vời cho bạn...
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;
