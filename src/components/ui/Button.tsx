import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { colors, spacing, radii, shadows, typography } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.accentGold,
    ...shadows.gold,
  },
  secondary: {
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.errorMuted,
    borderWidth: 1,
    borderColor: colors.error,
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { height: 36, paddingHorizontal: spacing.md },
  md: { height: 48, paddingHorizontal: spacing.xl },
  lg: { height: 56, paddingHorizontal: spacing['2xl'] },
};

const textColors: Record<ButtonVariant, string> = {
  primary: colors.background,
  secondary: colors.textPrimary,
  ghost: colors.accentGold,
  danger: colors.error,
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  onPress,
  style,
  ...props
}: ButtonProps) {
  const handlePress = (e: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
    haptics.light();
    onPress?.(e);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style as ViewStyle,
      ]}
      disabled={disabled || loading}
      onPress={handlePress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColors[variant]}
        />
      ) : (
        <>
          {icon}
          <Text
            variant={size === 'sm' ? 'subhead' : 'headline'}
            color={textColors[variant]}
            style={icon ? { marginLeft: spacing.sm } : undefined}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
