import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/design-system/tokens';
import type { Collection } from '@/types/database';

interface CollectionCardProps {
  collection: Collection;
  placeCount?: number;
}

export function CollectionCard({ collection, placeCount = 0 }: CollectionCardProps) {
  return (
    <Pressable onPress={() => router.push(`/collections/${collection.id}`)}>
      <GlassCard>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="grid" size={24} color={colors.accentGold} />
          </View>
          <View style={styles.info}>
            <Text variant="headline">{collection.name}</Text>
            {collection.description && (
              <Text variant="footnote" color={colors.textSecondary} numberOfLines={1}>
                {collection.description}
              </Text>
            )}
            <Text variant="caption1" color={colors.textTertiary}>
              {placeCount} {placeCount === 1 ? 'place' : 'places'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.accentGoldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
});
