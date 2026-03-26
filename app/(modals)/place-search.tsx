import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { PlaceSearchInput } from '@/features/places/components/PlaceSearchInput';
import { useDraftStore } from '@/stores/draft.store';
import type { PlaceRow } from '@/types/database';
import { colors, spacing } from '@/design-system/tokens';

export default function PlaceSearchModal() {
  const updateDraft = useDraftStore((s) => s.updateDraft);

  const handleSelect = (place: PlaceRow) => {
    updateDraft({ placeId: place.id, placeName: place.name });
    router.back();
  };

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text variant="headline">Find a Place</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchContainer}>
        <PlaceSearchInput onSelect={handleSelect} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
  },
});
