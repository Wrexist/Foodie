import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radii } from '@/design-system/tokens';
import { Text } from './Text';

type BadgeVariant = 'gold' | 'rose' | 'sage' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  gold: { bg: colors.accentGoldMuted, text: colors.accentGold },
  rose: { bg: colors.accentRoseMuted, text: colors.accentRose },
  sage: { bg: colors.accentSageMuted, text: colors.accentSage },
  default: { bg: colors.glassFill, text: colors.textSecondary },
};

export function Badge({ label, variant = 'default', style }: BadgeProps) {
  const v = variantStyles[variant];

  return (
    <View style={[styles.badge, { backgroundColor: v.bg }, style]} accessibilityRole="text">
      <Text variant="caption1" color={v.text} style={{ fontWeight: '600' }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
});
