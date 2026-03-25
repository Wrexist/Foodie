import React from 'react';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CollectionsScreen() {
  return (
    <Screen>
      <Header title="Collections" showBack />
      <EmptyState
        icon="grid-outline"
        title="No collections yet"
        subtitle="Organize your favorite places into curated collections"
        actionTitle="Create Collection"
        onAction={() => {}}
      />
    </Screen>
  );
}
