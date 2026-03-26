import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { PlaceCard } from '@/components/shared/PlaceCard';
import { useSavedPlaces, useToggleSave } from '@/features/saved/hooks/useSavedPlaces';
import { haptics } from '@/design-system/haptics';
import type { Place } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function SavedPlacesScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useSavedPlaces();
  const toggleSave = useToggleSave();

  const savedPlaces = data?.pages.flatMap((p) => p.data) ?? [];

  const handleUnsave = (placeId: string) => {
    haptics.light();
    toggleSave.mutate({ placeId, isSaved: true });
  };

  const renderItem = useCallback(({ item }: { item: any }) => {
    const place = item.place as Place;
    if (!place) return null;
    return (
      <View style={styles.cardWrapper}>
        <PlaceCard
          place={place}
          isSaved
          onSave={() => handleUnsave(place.id)}
        />
      </View>
    );
  }, []);

  if (isLoading) {
    return (
      <Screen>
        <Header title="Want to Go" showBack />
        <View style={styles.loadingContainer}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width="100%" height={80} radius={radii.card} />
          ))}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Want to Go" showBack />
      <FlatList
        data={savedPlaces}
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
            icon="bookmark-outline"
            title="No saved places"
            subtitle="Save places you want to visit and they'll appear here"
          />
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
  cardWrapper: {
    marginBottom: spacing.md,
  },
  loadingContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
});
