import React from 'react';
import { ScrollView, View } from 'react-native';
import AccountHeader from './AccountHeader';
import GuestBanner from './GuestBanner';
import QuickActions from './QuickActions';
import SecurityBanner from './SecurityBanner';
import SettingsMenu from './SettingsMenu';

const GuestLayout = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <AccountHeader />
      <GuestBanner />
      <QuickActions />
      <SecurityBanner />
      <SettingsMenu />
    </ScrollView>
  );
};

export default GuestLayout;
