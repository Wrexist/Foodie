import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, animation } from '@/design-system/tokens';
import { Text } from './Text';
import { Button } from './Button';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  subtitle,
  actionTitle,
  onAction,
}: EmptyStateProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(300).delay(150)}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={44} color={colors.textSecondary} />
      </View>
      <Text variant="headline" align="center" style={styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text
          variant="subhead"
          color={colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          {subtitle}
        </Text>
      )}
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          variant="secondary"
          size="sm"
          onPress={onAction}
          style={styles.action}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['3xl'],
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.md,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
  action: {
    marginTop: spacing.sm,
  },
});
