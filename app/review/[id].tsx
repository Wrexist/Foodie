import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/design-system/tokens';

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen scroll>
      <Header title="Review" showBack />
      <View style={styles.content}>
        <GlassCard>
          <Text variant="title2">Review Detail</Text>
          <Text variant="subhead" color={colors.textSecondary}>
            Loading review...
          </Text>
        </GlassCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
});
