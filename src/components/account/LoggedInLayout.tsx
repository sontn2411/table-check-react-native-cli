import React from 'react';
import { ScrollView } from 'react-native';
import AccountHeader from './AccountHeader';
import UserProfileCard from './UserProfileCard';
import UserRewardPoints from './UserRewardPoints';
import UserBookings from './UserBookings';
import SettingsMenu from './SettingsMenu';

const LoggedInLayout = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <AccountHeader />

      {/* Profile Card Section */}
      <UserProfileCard />

      {/* Reward Points Section */}
      <UserRewardPoints />

      {/* Bookings Section */}
      <UserBookings />

      {/* Settings Menu Section */}
      <SettingsMenu />
    </ScrollView>
  );
};

export default LoggedInLayout;
