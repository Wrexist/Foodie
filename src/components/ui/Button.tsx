import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, radii, typography, animation } from '@/design-system/tokens';
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
  sm: { height: 36, paddingHorizontal: spacing.md, borderRadius: radii.md },
  md: { height: 48, paddingHorizontal: spacing.xl, borderRadius: radii.md },
  lg: { height: 56, paddingHorizontal: spacing['2xl'], borderRadius: radii.lg },
};

const textColors: Record<ButtonVariant, string> = {
  primary: colors.background,
  secondary: colors.textPrimary,
  ghost: colors.accentGold,
  danger: colors.error,
};

const variantHaptics: Record<ButtonVariant, () => Promise<void>> = {
  primary: haptics.medium,
  secondary: haptics.light,
  ghost: haptics.light,
  danger: haptics.warning,
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
  const scale = useSharedValue(1);

  const animatedScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, animation.spring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, animation.spring);
  };

  const handlePress = (e: Parameters<NonNullable<PressableProps['onPress']>>[0]) => {
    variantHaptics[variant]();
    onPress?.(e);
  };

  return (
    <Animated.View style={animatedScale}>
      <Pressable
        style={[
          styles.base,
          variantStyles[variant],
          sizeStyles[size],
          disabled && styles.disabled,
          style as ViewStyle,
        ]}
        disabled={disabled || loading}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      >
        {variant === 'primary' && (
          <LinearGradient
            colors={['rgba(255,255,255,0.15)', 'transparent']}
            style={styles.sheen}
          />
        )}
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  sheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
