import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { colors, spacing } from '@/design-system/tokens';
import type { Place } from '@/types/database';

interface PlaceCardProps {
  place: Place;
  onSave?: () => void;
  isSaved?: boolean;
}

export function PlaceCard({ place, onSave, isSaved = false }: PlaceCardProps) {
  return (
    <Pressable
      onPress={() => router.push(`/place/${place.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${place.name}${place.cuisine_type ? `, ${place.cuisine_type}` : ''}`}
    >
      <GlassCard>
        <View style={styles.row}>
          <View style={styles.info}>
            <Text variant="headline">{place.name}</Text>
            {place.address && (
              <Text variant="footnote" color={colors.textSecondary} numberOfLines={1}>
                {place.address}
              </Text>
            )}
            <View style={styles.metaRow}>
              {place.cuisine_type && (
                <Badge label={place.cuisine_type} variant="sage" />
              )}
              {place.price_level && (
                <Text variant="footnote" color={colors.textTertiary}>
                  {'$'.repeat(place.price_level)}
                </Text>
              )}
            </View>
          </View>
          {onSave && (
            <Pressable
              onPress={onSave}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={isSaved ? 'Remove from saved places' : 'Save this place'}
            >
              <Ionicons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isSaved ? colors.accentGold : colors.textTertiary}
              />
            </Pressable>
          )}
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
});
