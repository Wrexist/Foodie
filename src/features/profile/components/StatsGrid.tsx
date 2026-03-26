import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import type { ProfileStats } from '../types';
import { colors, spacing } from '@/design-system/tokens';
import { formatScore } from '@/utils/format';

interface StatsGridProps {
  stats: ProfileStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <View style={styles.grid}>
      <GlassCard style={styles.card}>
        <Text variant="title2" color={colors.accentGold}>
          {stats.reviewCount}
        </Text>
        <Text variant="caption1" color={colors.textSecondary}>
          Reviews
        </Text>
      </GlassCard>
      <GlassCard style={styles.card}>
        <Text variant="title2" color={colors.accentRose}>
          {stats.averageScore > 0 ? formatScore(stats.averageScore) : '—'}
        </Text>
        <Text variant="caption1" color={colors.textSecondary}>
          Avg Score
        </Text>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
});
