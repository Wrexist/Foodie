import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthStore } from '@/stores/auth.store';
import { storage, storageKeys } from '@/lib/storage';
import { colors } from '@/design-system/tokens';

export default function Index() {
  const session = useAuthStore((s) => s.session);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (!hasHydrated || isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accentGold} />
      </View>
    );
  }

  const hasOnboarded = storage.getBoolean(storageKeys.hasOnboarded);

  if (!hasOnboarded) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
