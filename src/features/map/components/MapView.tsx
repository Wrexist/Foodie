import React from 'react';
import { StyleSheet } from 'react-native';
import RNMapView, { Marker, Callout } from 'react-native-maps';
import { router } from 'expo-router';
import { PinCallout } from './PinCallout';
import type { MapPin } from '../hooks/useMapPins';
import { colors } from '@/design-system/tokens';

interface DiningMapViewProps {
  pins: MapPin[];
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1d1d2b' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a9a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1d1d2b' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a3d' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#343449' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e0e18' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1d1d2b' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

const DEFAULT_REGION = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export function DiningMapView({ pins, initialRegion }: DiningMapViewProps) {
  const region = initialRegion ?? (pins.length > 0
    ? {
        latitude: pins[0].latitude,
        longitude: pins[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : DEFAULT_REGION);

  return (
    <RNMapView
      style={styles.map}
      initialRegion={region}
      customMapStyle={DARK_MAP_STYLE}
      userInterfaceStyle="dark"
      showsUserLocation
      showsMyLocationButton={false}
    >
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
          pinColor={pin.type === 'visited' ? colors.accentGold : colors.accentRose}
        >
          <Callout onPress={() => router.push(`/place/${pin.id}`)}>
            <PinCallout pin={pin} />
          </Callout>
        </Marker>
      ))}
    </RNMapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
