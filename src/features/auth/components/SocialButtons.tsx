import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';
import { Text } from '@/components/ui/Text';

interface SocialButtonsProps {
  onApplePress?: () => void;
  onGooglePress?: () => void;
}

export function SocialButtons({ onApplePress, onGooglePress }: SocialButtonsProps) {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <Pressable
          style={styles.socialButton}
          onPress={() => {
            haptics.light();
            onApplePress?.();
          }}
        >
          <Ionicons name="logo-apple" size={22} color={colors.textPrimary} />
          <Text variant="headline">Continue with Apple</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.socialButton}
        onPress={() => {
          haptics.light();
          onGooglePress?.();
        }}
      >
        <Ionicons name="logo-google" size={20} color={colors.textPrimary} />
        <Text variant="headline">Continue with Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    gap: spacing.md,
  },
});
