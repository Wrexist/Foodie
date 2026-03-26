import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { PlaceHeader } from '@/features/places/components/PlaceHeader';
import { usePlaceDetail } from '@/features/places/hooks/usePlaceDetail';
import { usePlaceStats } from '@/features/places/hooks/usePlaces';
import { usePlaceReviews } from '@/features/reviews/hooks/useReviews';
import { useIsSaved, useToggleSave } from '@/features/saved/hooks/useSavedPlaces';
import { haptics } from '@/design-system/haptics';
import type { ReviewFull } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: placeData, isLoading: placeLoading } = usePlaceDetail(id);
  const place = placeData as any;
  const { data: stats } = usePlaceStats(id);
  const { data: isSaved } = useIsSaved(id);
  const toggleSave = useToggleSave();
  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: reviewsLoading,
    refetch,
    isRefetching,
  } = usePlaceReviews(id);

  const reviews = reviewsData?.pages.flatMap((p) => p.data) ?? [];

  const handleToggleSave = () => {
    haptics.light();
    toggleSave.mutate({ placeId: id, isSaved: !!isSaved });
  };

  const renderItem = useCallback(({ item }: { item: ReviewFull }) => (
    <View style={styles.cardWrapper}>
      <ReviewCard review={item} />
    </View>
  ), []);

  return (
    <Screen>
      <Header title={place?.name ?? 'Place'} showBack />
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
          <View style={styles.headerSection}>
            {placeLoading ? (
              <View style={styles.loadingContainer}>
                <Skeleton width="100%" height={200} radius={radii.card} />
              </View>
            ) : place ? (
              <PlaceHeader
                place={place}
                reviewCount={stats?.reviewCount ?? 0}
                averageScore={stats?.averageScore ?? 0}
                isSaved={!!isSaved}
                onToggleSave={handleToggleSave}
              />
            ) : null}
          </View>
        }
        ListEmptyComponent={
          !reviewsLoading ? (
            <EmptyState
              icon="chatbubble-outline"
              title="No reviews yet"
              subtitle="Be the first to review this place"
            />
          ) : null
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  headerSection: {
    marginBottom: spacing.xl,
  },
  cardWrapper: {
    marginBottom: spacing.lg,
  },
  loadingContainer: {
    gap: spacing.lg,
  },
});
