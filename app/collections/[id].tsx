import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { EmptyState } from '@/components/ui/EmptyState';
import { spacing } from '@/design-system/tokens';

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <Header title="Collection" showBack />
      <EmptyState
        icon="grid-outline"
        title="No places in this collection"
        subtitle="Add places to this collection from the place detail screen"
      />
    </Screen>
  );
}
