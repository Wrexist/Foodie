import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';
import { Text } from '@/components/ui/Text';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, showBack = false, rightAction }: HeaderProps) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable
          onPress={() => {
            haptics.light();
            router.back();
          }}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text variant="headline" style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {rightAction ? rightAction : <View style={styles.placeholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 36,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
