import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { router } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useMapPins, type MapPin } from '@/features/map/hooks/useMapPins';
import { colors, spacing } from '@/design-system/tokens';
import { formatScore } from '@/utils/format';

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1d1d2b' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a9a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1d1d2b' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a3d' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e0e18' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1d1d2b' }] },
];

const DEFAULT_REGION = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

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

  const initialRegion = {
    latitude: pins[0].latitude,
    longitude: pins[0].longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text variant="largeTitle">Map</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={DARK_MAP_STYLE}
        userInterfaceStyle="dark"
      >
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            pinColor={pin.type === 'visited' ? colors.accentGold : colors.accentRose}
          >
            <Callout onPress={() => router.push(`/place/${pin.id}`)}>
              <View style={styles.callout}>
                <Text variant="subhead">{pin.name}</Text>
                {pin.averageScore !== undefined && (
                  <Text variant="caption1" color={colors.accentGold}>
                    {formatScore(pin.averageScore)}
                  </Text>
                )}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: spacing.sm,
    minWidth: 120,
  },
});
