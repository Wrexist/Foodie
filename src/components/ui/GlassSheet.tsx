import React from 'react';
import { View, ViewProps, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, radii, spacing } from '@/design-system/tokens';

interface GlassSheetProps extends ViewProps {
  intensity?: number;
}

export function GlassSheet({
  intensity = 60,
  style,
  children,
  ...props
}: GlassSheetProps) {
  const content = (
    <>
      <View style={styles.handle} />
      {children}
    </>
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[styles.sheet, style]}
        {...props}
      >
        {content}
      </BlurView>
    );
  }

  return (
    <View style={[styles.sheet, styles.fallback, style]} {...props}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.glassStroke,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing['4xl'],
    overflow: 'hidden',
  },
  fallback: {
    backgroundColor: colors.surface,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
});
