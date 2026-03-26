import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/Text';
import { colors, spacing, radii } from '@/design-system/tokens';
import { useUIStore } from '@/stores/ui.store';

export function OfflineBanner() {
  const isOnline = useUIStore((s) => s.isOnline);

  if (isOnline) return null;

  return (
    <Animated.View
      entering={FadeInUp.duration(250)}
      exiting={FadeOutUp.duration(250)}
      style={styles.container}
    >
      <Ionicons name="cloud-offline-outline" size={16} color={colors.warning} />
      <Text variant="footnote" color={colors.warning} style={styles.text}>
        You're offline — some features may be unavailable
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningMuted,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245, 166, 35, 0.2)',
  },
  text: {
    flex: 1,
  },
});
