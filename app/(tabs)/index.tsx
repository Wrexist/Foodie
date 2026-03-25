import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAuthStore } from '@/stores/auth.store';
import { colors, spacing } from '@/design-system/tokens';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text variant="footnote" color={colors.textSecondary}>
            Welcome back
          </Text>
          <Text variant="title2">{user?.user_metadata?.display_name ?? 'Foodie'}</Text>
        </View>
        <Avatar uri={user?.user_metadata?.avatar_url} size="md" />
      </View>

      <GlassCard style={styles.statsCard}>
        <Text variant="subhead" color={colors.textSecondary}>
          Your taste journey
        </Text>
        <View style={styles.statsRow}>
          <StatItem label="Reviews" value="0" />
          <StatItem label="Places" value="0" />
          <StatItem label="Dishes" value="0" />
        </View>
      </GlassCard>

      <View style={styles.section}>
        <Text variant="title3" style={styles.sectionTitle}>
          Recent Activity
        </Text>
        <EmptyState
          icon="restaurant-outline"
          title="No reviews yet"
          subtitle="Start your dining journal by adding your first review"
          actionTitle="Add Review"
          onAction={() => {}}
        />
      </View>
    </Screen>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text variant="title2" color={colors.accentGold}>
        {value}
      </Text>
      <Text variant="caption1" color={colors.textSecondary}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
  },
});
