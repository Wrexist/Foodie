import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, spacing } from '@/design-system/tokens';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen scroll>
      <Header title="Place" showBack />
      <View style={styles.content}>
        <GlassCard>
          <Text variant="title2">Place Details</Text>
          <Text variant="subhead" color={colors.textSecondary}>
            Loading place information...
          </Text>
        </GlassCard>

        <Text variant="title3" style={styles.sectionTitle}>
          Reviews
        </Text>
        <EmptyState
          icon="chatbubble-outline"
          title="No reviews yet"
          subtitle="Be the first to review this place"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing['5xl'],
  },
  sectionTitle: {
    marginTop: spacing.sm,
  },
});
