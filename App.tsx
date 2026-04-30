import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import './global.css';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';

// Khởi tạo QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 phút
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;
