import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { PlaceCard } from '@/components/shared/PlaceCard';
import { useCollectionDetail } from '@/features/collections/hooks/useCollections';
import type { PlaceRow } from '@/types/database';
import { spacing, radii } from '@/design-system/tokens';

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: collectionData, isLoading } = useCollectionDetail(id);
  const collection = collectionData as any;

  const places: PlaceRow[] = collection?.collection_places
    ?.map((cp: any) => cp.place)
    .filter(Boolean) ?? [];

  const renderItem = useCallback(({ item }: { item: PlaceRow }) => (
    <View style={styles.cardWrapper}>
      <PlaceCard place={item} />
    </View>
  ), []);

  if (isLoading) {
    return (
      <Screen>
        <Header title="Collection" showBack />
        <View style={styles.loadingContainer}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} width="100%" height={80} radius={radii.card} />
          ))}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title={collection?.name ?? 'Collection'} showBack />
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item: PlaceRow) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="grid-outline"
            title="No places in this collection"
            subtitle="Add places to this collection from the place detail screen"
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
