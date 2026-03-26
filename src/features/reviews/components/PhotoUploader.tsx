import React from 'react';
import { View, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';
import { PHOTO_MAX_COUNT, PHOTO_QUALITY } from '@/lib/constants';

interface PhotoUploaderProps {
  photos: string[];
  onAdd: (uris: string[]) => void;
  onRemove: (index: number) => void;
  maxPhotos?: number;
}

export function PhotoUploader({
  photos,
  onAdd,
  onRemove,
  maxPhotos = PHOTO_MAX_COUNT,
}: PhotoUploaderProps) {
  const handlePick = async () => {
    const remaining = maxPhotos - photos.length;
    if (remaining <= 0) {
      Alert.alert('Limit reached', `You can add up to ${maxPhotos} photos.`);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: PHOTO_QUALITY,
    });

    if (!result.canceled && result.assets.length > 0) {
      haptics.light();
      onAdd(result.assets.map((a) => a.uri));
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.container}>
        <Pressable style={styles.addButton} onPress={handlePick}>
          <Ionicons name="camera-outline" size={28} color={colors.accentGold} />
          <View style={styles.countBadge}>
            <Ionicons name="add" size={14} color={colors.background} />
          </View>
        </Pressable>

        {photos.map((uri, index) => (
          <View key={uri} style={styles.photoContainer}>
            <Image source={{ uri }} style={styles.photo} contentFit="cover" />
            <Pressable
              style={styles.removeButton}
              onPress={() => {
                haptics.light();
                onRemove(index);
              }}
            >
              <Ionicons name="close" size={14} color={colors.textPrimary} />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  addButton: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
