import { Restaurant } from '../data/restaurants';

export type RootStackParamList = {
  MainTabs: undefined; // This is the Bottom Tab Navigator
  Details: { itemId: number; otherParam?: string };
  Login: undefined;
  Register: undefined;
  EditProfile: undefined;
  ConfirmBooking: { restaurant: Restaurant };
};

export type MainTabParamList = {
  HomeTab: undefined;
  Explore: undefined;
  Bookings: undefined;
  Account: undefined;
};


