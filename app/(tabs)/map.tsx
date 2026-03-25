import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, spacing } from '@/design-system/tokens';

export default function MapScreen() {
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

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
