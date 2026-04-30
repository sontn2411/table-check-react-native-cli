import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, Calendar, User } from 'lucide-react-native';
import HomeScreen from '../screens/home/HomeScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import BookingsScreen from '../screens/booking/BookingsScreen';
import AccountScreen from '../screens/account/AccountScreen';
import { MainTabParamList } from './types';
import { useTranslation } from 'react-i18next';
import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: t('home_tab'),
          tabBarLabel: t('home_tab'),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: t('explore'),
          tabBarLabel: t('explore'),
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          title: t('bookings'),
          tabBarLabel: t('bookings'),
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: t('account'),
          tabBarLabel: t('account'),
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
