import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import type { ReviewItemRow } from '@/types/database';
import { colors, spacing } from '@/design-system/tokens';
import { formatScore } from '@/utils/format';

interface DishCardProps {
  item: ReviewItemRow;
}

export function DishCard({ item }: DishCardProps) {
  const isDrink = item.category === 'drink';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={isDrink ? 'wine-outline' : 'restaurant-outline'}
          size={18}
          color={isDrink ? colors.accentRose : colors.accentGold}
        />
      </View>
      <View style={styles.info}>
        <Text variant="subhead">{item.name}</Text>
        {item.notes && (
          <Text variant="footnote" color={colors.textSecondary} numberOfLines={2}>
            {item.notes}
          </Text>
        )}
      </View>
      {item.score && (
        <Badge label={formatScore(item.score)} variant={isDrink ? 'rose' : 'gold'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
});
