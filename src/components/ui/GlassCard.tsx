import React from 'react';
import { View, ViewProps, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii, spacing } from '@/design-system/tokens';

interface GlassCardProps extends ViewProps {
  intensity?: number;
  padding?: number;
}

export function GlassCard({
  intensity = 40,
  padding = spacing.lg,
  style,
  children,
  ...props
}: GlassCardProps) {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[styles.card, { padding }, style]}
        {...props}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[styles.card, styles.fallback, { padding }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    overflow: 'hidden',
  },
  fallback: {
    backgroundColor: colors.glassFill,
  },
});
