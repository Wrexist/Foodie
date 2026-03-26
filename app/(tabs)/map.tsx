import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { DiningMapView } from '@/features/map/components/MapView';
import { useMapPins } from '@/features/map/hooks/useMapPins';
import { spacing } from '@/design-system/tokens';

export default function MapScreen() {
  const { data: pins, isLoading } = useMapPins();

  if (isLoading) {
    return (
      <Screen edges={['top']}>
        <View style={styles.header}>
          <Text variant="largeTitle">Map</Text>
        </View>
        <Skeleton width="100%" height={400} radius={0} />
      </Screen>
    );
  }

  if (!pins || pins.length === 0) {
    return (
      <Screen edges={['top']}>
        <View style={styles.header}>
          <Text variant="largeTitle">Map</Text>
        </View>
        <EmptyState
          icon="map-outline"
          title="Explore your map"
          subtitle="Your visited and saved places will appear here once you start reviewing."
        />
      </Screen>
    );
  }

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text variant="largeTitle">Map</Text>
      </View>
      <DiningMapView pins={pins} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
});
