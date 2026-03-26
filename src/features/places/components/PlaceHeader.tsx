import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import type { PlaceRow } from '@/types/database';
import { colors, spacing, animation } from '@/design-system/tokens';
import { formatScore } from '@/utils/format';

interface PlaceHeaderProps {
  place: PlaceRow;
  reviewCount: number;
  averageScore: number;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function PlaceHeader({
  place,
  reviewCount,
  averageScore,
  isSaved,
  onToggleSave,
}: PlaceHeaderProps) {
  const saveScale = useSharedValue(1);

  const saveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveScale.value }],
  }));

  const handleSavePress = () => {
    saveScale.value = withSpring(1.2, animation.spring);
    setTimeout(() => {
      saveScale.value = withSpring(1, animation.spring);
    }, 100);
    onToggleSave();
  };

  return (
    <GlassCard animated>
      <View style={styles.topRow}>
        <View style={styles.nameSection}>
          <Text variant="title2">{place.name}</Text>
          {place.address && (
            <Text variant="footnote" color={colors.textSecondary}>
              {place.address}
            </Text>
          )}
        </View>
        <Pressable onPress={handleSavePress} hitSlop={8}>
          <Animated.View style={saveAnimatedStyle}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color={isSaved ? colors.accentGold : colors.textTertiary}
            />
          </Animated.View>
        </Pressable>
      </View>

      <View style={styles.metaRow}>
        {place.cuisine_type && <Badge label={place.cuisine_type} variant="sage" />}
        {place.price_level && (
          <Badge label={'$'.repeat(place.price_level)} variant="default" />
        )}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text variant="title3" color={colors.accentGold}>
            {averageScore > 0 ? formatScore(averageScore) : '—'}
          </Text>
          <Text variant="caption1" color={colors.textSecondary}>
            Avg Score
          </Text>
        </View>
        <View style={styles.stat}>
          <Text variant="title3">{reviewCount}</Text>
          <Text variant="caption1" color={colors.textSecondary}>
            Reviews
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  nameSection: {
    flex: 1,
    gap: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  stat: {
    alignItems: 'center',
    gap: spacing.xs,
  },
});
