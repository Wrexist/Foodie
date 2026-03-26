import React from 'react';
import { View, Pressable, ViewProps, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInUp,
} from 'react-native-reanimated';
import { colors, radii, spacing, animation, glass } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';

interface GlassCardProps extends ViewProps {
  intensity?: number;
  padding?: number;
  onPress?: () => void;
  animated?: boolean;
}

export function GlassCard({
  intensity = glass.card.intensity,
  padding = spacing.lg,
  onPress,
  animated = false,
  style,
  children,
  ...props
}: GlassCardProps) {
  const scale = useSharedValue(1);

  const animatedScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.985, animation.spring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, animation.spring);
  };

  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  const cardContent = Platform.OS === 'ios' ? (
    <BlurView
      intensity={intensity}
      tint="dark"
      style={[styles.card, { padding }, style]}
      {...props}
    >
      {children}
    </BlurView>
  ) : (
    <View style={[styles.card, styles.fallback, { padding }, style]} {...props}>
      {children}
    </View>
  );

  const Wrapper = animated ? Animated.View : View;
  const enteringProp = animated ? { entering: FadeInUp.duration(animation.normal).springify() } : {};

  if (onPress) {
    return (
      <Wrapper {...enteringProp}>
        <Animated.View style={animatedScale}>
          <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            accessibilityRole="button"
          >
            {cardContent}
          </Pressable>
        </Animated.View>
      </Wrapper>
    );
  }

  if (animated) {
    return (
      <Animated.View entering={FadeInUp.duration(animation.normal).springify()}>
        {cardContent}
      </Animated.View>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    overflow: 'hidden',
  },
  fallback: {
    backgroundColor: glass.card.fill,
  },
});
