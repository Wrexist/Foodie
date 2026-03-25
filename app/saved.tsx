import React from 'react';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { EmptyState } from '@/components/ui/EmptyState';

export default function SavedPlacesScreen() {
  return (
    <Screen>
      <Header title="Want to Go" showBack />
      <EmptyState
        icon="bookmark-outline"
        title="No saved places"
        subtitle="Save places you want to visit and they'll appear here"
      />
    </Screen>
  );
}
