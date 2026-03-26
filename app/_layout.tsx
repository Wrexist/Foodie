import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '@/lib/query-client';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth.store';
import { ThemeProvider, theme } from '@/design-system/theme';
import { colors } from '@/design-system/tokens';
import { QueryErrorBoundary } from '@/components/error/QueryErrorBoundary';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

SplashScreen.preventAutoHideAsync();

function NetworkInit() {
  useNetworkStatus();
  return null;
}

export default function RootLayout() {
  const setSession = useAuthStore((s) => s.setSession);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setHydrated(true);
      SplashScreen.hideAsync();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [setSession, setHydrated]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={theme}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <NetworkInit />
          <OfflineBanner />
          <QueryErrorBoundary>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="(modals)"
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen name="place/[id]" />
              <Stack.Screen name="review/[id]" />
              <Stack.Screen name="user/[id]" />
              <Stack.Screen name="saved" />
              <Stack.Screen name="collections" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="notifications" />
              <Stack.Screen name="search" />
            </Stack>
          </QueryErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
