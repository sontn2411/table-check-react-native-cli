import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  avatars: Record<string, string>; // { [email]: base64/uri }
  userProfiles: Record<string, any>; // { [email]: { phone, birthday, address, name } }

  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateAvatar: (email: string, uri: string) => void;
  updateProfile: (email: string, data: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      avatars: {},
      userProfiles: {},

      setAuth: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      updateAvatar: (email, uri) =>
        set(state => ({
          avatars: {
            ...state.avatars,
            [email]: uri,
          },
        })),

      updateProfile: (email, data) =>
        set(state => ({
          userProfiles: {
            ...state.userProfiles,
            [email]: {
              ...state.userProfiles[email],
              ...data,
            },
          },
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
