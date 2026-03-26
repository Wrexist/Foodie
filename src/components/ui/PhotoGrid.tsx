import React from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, radii } from '@/design-system/tokens';

interface PhotoGridProps {
  photos: string[];
  onPress?: (index: number) => void;
  maxDisplay?: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = spacing.xs;

export function PhotoGrid({ photos, onPress, maxDisplay = 4 }: PhotoGridProps) {
  if (photos.length === 0) return null;

  const displayPhotos = photos.slice(0, maxDisplay);
  const overflow = photos.length - maxDisplay;

  if (displayPhotos.length === 1) {
    return (
      <Pressable onPress={() => onPress?.(0)}>
        <Image
          source={{ uri: displayPhotos[0] }}
          style={styles.singlePhoto}
          contentFit="cover"
        />
      </Pressable>
    );
  }

  return (
    <View style={styles.grid}>
      {displayPhotos.map((uri, index) => (
        <Pressable
          key={index}
          style={styles.gridItem}
          onPress={() => onPress?.(index)}
        >
          <Image source={{ uri }} style={styles.gridImage} contentFit="cover" />
          {index === maxDisplay - 1 && overflow > 0 && (
            <View style={styles.overflowOverlay}>
              <View style={styles.overflowBadge}>
                <Image
                  source={{ uri }}
                  style={StyleSheet.absoluteFill}
                  contentFit="cover"
                />
                <View style={styles.overflowText}>
                  {/* Using a simple View overlay since Text inside Image overlay */}
                </View>
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const photoSize = (SCREEN_WIDTH - spacing.lg * 2 - GAP) / 2;

const styles = StyleSheet.create({
  singlePhoto: {
    width: '100%',
    height: 200,
    borderRadius: radii.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  gridItem: {
    width: photoSize,
    height: photoSize,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  overflowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowBadge: {
    width: '100%',
    height: '100%',
  },
  overflowText: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
