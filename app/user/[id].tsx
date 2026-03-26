import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useProfileStats } from '@/features/profile/hooks/useProfileStats';
import { useUserReviews } from '@/features/reviews/hooks/useReviews';
import { useIsFollowing, useToggleFollow } from '@/features/social/hooks/useFollows';
import { useAuthStore } from '@/stores/auth.store';
import { haptics } from '@/design-system/haptics';
import type { ReviewFull } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function PublicProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const { data: profile, isLoading: profileLoading } = useProfile(id);
  const { data: stats } = useProfileStats(id);
  const { data: isFollowing, isLoading: isFollowingLoading } = useIsFollowing(id);
  const toggleFollow = useToggleFollow();
  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: reviewsLoading,
    refetch,
    isRefetching,
  } = useUserReviews(id);

  const reviews = reviewsData?.pages.flatMap((p) => p.data) ?? [];
  const isOwnProfile = currentUser?.id === id;

  const handleFollow = () => {
    if (isFollowingLoading || isFollowing === undefined) return;
    haptics.light();
    toggleFollow.mutate({ targetUserId: id, isFollowing });
  };

  const renderItem = useCallback(({ item }: { item: ReviewFull }) => (
    <View style={styles.cardWrapper}>
      <ReviewCard review={item} showUser={false} />
    </View>
  ), []);

  return (
    <Screen>
      <Header title="Profile" showBack />
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
                isOwnProfile={isOwnProfile}
                isFollowing={!!isFollowing}
                onFollow={handleFollow}
              />
            ) : null}

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
            <EmptyState
              icon="book-outline"
              title="No public reviews"
              subtitle="This user hasn't shared any reviews yet"
            />
          ) : null
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing['5xl'],
  },
  loadingProfile: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.md,
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
