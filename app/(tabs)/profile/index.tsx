import React, { useCallback } from 'react';
import { View, FlatList, Pressable, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { StatsGrid } from '@/features/profile/components/StatsGrid';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useProfileStats } from '@/features/profile/hooks/useProfileStats';
import { useUserReviews } from '@/features/reviews/hooks/useReviews';
import { useAuthStore } from '@/stores/auth.store';
import type { ReviewFull } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function ProfileScreen() {
  const currentUser = useAuthStore((s) => s.user);
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: stats } = useProfileStats();
  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: reviewsLoading,
    refetch,
    isRefetching,
  } = useUserReviews();

  const reviews = reviewsData?.pages.flatMap((p) => p.data) ?? [];

  const renderItem = useCallback(({ item }: { item: ReviewFull }) => (
    <View style={styles.cardWrapper}>
      <ReviewCard review={item} showUser={false} />
    </View>
  ), []);

  return (
    <Screen>
      <FlatList
        data={reviews as ReviewFull[]}
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
            <View style={styles.topBar}>
              <Text variant="largeTitle">Profile</Text>
              <Pressable
                style={styles.settingsButton}
                onPress={() => router.push('/settings')}
              >
                <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
              </Pressable>
            </View>

            {profileLoading ? (
              <View style={styles.loadingProfile}>
                <Skeleton width={80} height={80} radius={40} />
                <Skeleton width={160} height={20} radius={8} />
                <Skeleton width={120} height={16} radius={8} />
              </View>
            ) : profile && stats ? (
              <ProfileHeader
                user={profile}
                stats={stats}
                isOwnProfile
                onEditProfile={() => router.push('/settings')}
              />
            ) : null}

            {stats && <StatsGrid stats={stats} />}

            <View style={styles.actions}>
              <Button
                title="Saved Places"
                variant="secondary"
                size="sm"
                onPress={() => router.push('/saved')}
                icon={<Ionicons name="bookmark-outline" size={16} color={colors.textPrimary} />}
              />
              <Button
                title="Collections"
                variant="secondary"
                size="sm"
                onPress={() => router.push('/collections')}
                icon={<Ionicons name="grid-outline" size={16} color={colors.textPrimary} />}
              />
            </View>

            <Text variant="title3" style={styles.sectionTitle}>
              My Reviews
            </Text>

            {reviewsLoading && (
              <View style={styles.loadingContainer}>
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height={160} radius={radii.card} />
                ))}
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !reviewsLoading ? (
            <View style={styles.emptyWrapper}>
              <Text variant="body" color={colors.textSecondary} align="center">
                No reviews yet. Start your dining journal!
              </Text>
            </View>
          ) : null
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 120,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingProfile: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
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
  emptyWrapper: {
    padding: spacing['2xl'],
  },
});
