import React, { useCallback } from 'react';
import { View, FlatList, Pressable, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { useAuthStore } from '@/stores/auth.store';
import { useProfileStats } from '@/features/profile/hooks/useProfileStats';
import { useActivityFeed } from '@/features/social/hooks/useActivityFeed';
import { useUnreadCount } from '@/features/notifications/hooks/useNotifications';
import { haptics } from '@/design-system/haptics';
import type { ReviewFull } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const { data: stats } = useProfileStats();
  const { data: unreadCount } = useUnreadCount();
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useActivityFeed();

  const feedItems = feedData?.pages.flatMap((p) => p.data) ?? [];

  const handleRefresh = async () => {
    await refetch();
    haptics.medium();
  };

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
            onRefresh={handleRefresh}
            tintColor={colors.accentGold}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text
                  variant="caption1"
                  color={colors.textSecondary}
                  style={styles.overline}
                >
                  WELCOME BACK
                </Text>
                <Text variant="title2">
                  {user?.user_metadata?.display_name ?? 'Foodie'}
                </Text>
              </View>
              <View style={styles.headerActions}>
                <Pressable
                  style={styles.bellButton}
                  onPress={() => {
                    haptics.light();
                    router.push('/search');
                  }}
                >
                  <Ionicons name="search-outline" size={22} color={colors.textPrimary} />
                </Pressable>
                <Pressable
                  style={styles.bellButton}
                  onPress={() => {
                    haptics.light();
                    router.push('/notifications');
                  }}
                >
                  <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
                  {(unreadCount ?? 0) > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text variant="caption2" color={colors.background} style={{ fontWeight: '700' }}>
                        {unreadCount! > 9 ? '9+' : unreadCount}
                      </Text>
                    </View>
                  )}
                </Pressable>
                <Avatar uri={user?.user_metadata?.avatar_url} size="md" />
              </View>
            </View>

            <GlassCard style={styles.statsCard} animated>
              <Text variant="subhead" color={colors.textSecondary}>
                Your taste journey
              </Text>
              <View style={styles.statsDivider} />
              <View style={styles.statsRow}>
                <StatItem label="Reviews" value={String(stats?.reviewCount ?? 0)} />
                <StatItem
                  label="Avg Score"
                  value={stats?.averageScore ? stats.averageScore.toFixed(1) : '—'}
                />
                <StatItem label="Following" value={String(stats?.followingCount ?? 0)} />
              </View>
            </GlassCard>

            <Text
              variant="title3"
              color={colors.textSecondary}
              style={styles.sectionTitle}
            >
              Recent Activity
            </Text>

            {isLoading && (
              <View style={styles.loadingContainer}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
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
      <Text variant="title3" color={colors.accentGold}>
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
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.xl,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accentRose,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  overline: {
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statsDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  cardWrapper: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  loadingContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
});
