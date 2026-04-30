import React from 'react';
import SafeScreen from '../../components/SafeScreen';
import GuestLayout from '../../components/account/GuestLayout';
import LoggedInLayout from '../../components/account/LoggedInLayout';
import { useAuthStore } from '../../store/useAuthStore';

const AccountScreen = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <SafeScreen>
      {isAuthenticated ? <LoggedInLayout /> : <GuestLayout />}
    </SafeScreen>
  );
};

export default AccountScreen;
