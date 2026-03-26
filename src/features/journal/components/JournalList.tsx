import React, { useCallback } from 'react';
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native';
import { ReviewCard } from '@/components/shared/ReviewCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { useJournal } from '../hooks/useJournal';
import type { JournalFilters } from '../types';
import type { ReviewFull } from '@/types/database';
import { colors, spacing } from '@/design-system/tokens';

interface JournalListProps {
  filters: JournalFilters;
}

export function JournalList({ filters }: JournalListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch, isRefetching } =
    useJournal(filters);

  const reviews = data?.pages.flatMap((p) => p.data) ?? [];

  const renderItem = useCallback(({ item }: { item: ReviewFull }) => {
    return (
      <View style={styles.cardWrapper}>
        <ReviewCard review={item} showUser={false} />
      </View>
    );
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    );
  }

  return (
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
      ListEmptyComponent={
        <EmptyState
          icon="book-outline"
          title="Your journal is empty"
          subtitle="Every great meal deserves to be remembered. Start logging your dining experiences."
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },
  cardWrapper: {
    marginBottom: spacing.xl,
  },
  loadingContainer: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
});
