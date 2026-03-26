import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { useAuthStore } from '@/stores/auth.store';
import { useProfileStats } from '@/features/profile/hooks/useProfileStats';
import { useActivityFeed } from '@/features/social/hooks/useActivityFeed';
import type { ReviewFull } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const { data: stats } = useProfileStats();
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useActivityFeed();

  const feedItems = feedData?.pages.flat() ?? [];

  const renderItem = useCallback(({ item }: { item: ReviewFull }) => (
    <View style={styles.cardWrapper}>
      <ReviewCard review={item} />
    </View>
  ), []);

  return (
    <Screen>
      <FlatList
        data={feedItems as ReviewFull[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.accentGold}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text variant="footnote" color={colors.textSecondary}>
                  Welcome back
                </Text>
                <Text variant="title2">
                  {user?.user_metadata?.display_name ?? 'Foodie'}
                </Text>
              </View>
              <Avatar uri={user?.user_metadata?.avatar_url} size="md" />
            </View>

            <GlassCard style={styles.statsCard}>
              <Text variant="subhead" color={colors.textSecondary}>
                Your taste journey
              </Text>
              <View style={styles.statsRow}>
                <StatItem label="Reviews" value={String(stats?.reviewCount ?? 0)} />
                <StatItem
                  label="Avg Score"
                  value={stats?.averageScore ? stats.averageScore.toFixed(1) : '—'}
                />
                <StatItem label="Following" value={String(stats?.followingCount ?? 0)} />
              </View>
            </GlassCard>

            <Text variant="title3" style={styles.sectionTitle}>
              Recent Activity
            </Text>

            {isLoading && (
              <View style={styles.loadingContainer}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height={180} radius={radii.card} />
                ))}
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="restaurant-outline"
              title="No reviews yet"
              subtitle="Start your dining journal by adding your first review"
              actionTitle="Add Review"
              onAction={() => router.push('/(modals)/add-review')}
            />
          ) : null
        }
      />
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
  list: {
    paddingBottom: 120,
  },
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
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardWrapper: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  loadingContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
});
