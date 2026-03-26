import React, { useEffect, useRef } from 'react';
import { View, FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { Skeleton } from '@/components/ui/Skeleton';
import { usePlaceSearch } from '../hooks/usePlaceSearch';
import type { PlaceRow } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

interface PlaceSearchInputProps {
  onSelect: (place: PlaceRow) => void;
  autoFocus?: boolean;
}

export function PlaceSearchInput({ onSelect, autoFocus = true }: PlaceSearchInputProps) {
  const { query, search, results, isSearching } = usePlaceSearch();

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search restaurants, cafes, bars..."
        leftIcon={<Ionicons name="search" size={20} color={colors.textTertiary} />}
        value={query}
        onChangeText={search}
        autoFocus={autoFocus}
        autoCorrect={false}
      />

      {isSearching && (
        <View style={styles.loadingRow}>
          <Skeleton width="100%" height={52} radius={radii.md} />
          <Skeleton width="100%" height={52} radius={radii.md} />
        </View>
      )}

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          style={styles.resultsList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              style={styles.resultItem}
              onPress={() => onSelect(item)}
            >
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.accentGold}
              />
              <View style={styles.resultInfo}>
                <Text variant="body">{item.name}</Text>
                {item.address && (
                  <Text
                    variant="footnote"
                    color={colors.textSecondary}
                    numberOfLines={1}
                  >
                    {item.address}
                  </Text>
                )}
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  loadingRow: {
    gap: spacing.sm,
  },
  resultsList: {
    maxHeight: 300,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  resultInfo: {
    flex: 1,
    gap: 2,
  },
});
