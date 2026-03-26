import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { ItemForm } from '@/features/reviews/components/ItemForm';
import { colors, spacing } from '@/design-system/tokens';

export default function AddItemModal() {
  return (
    <Screen scroll edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text variant="headline">Add Item</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <ItemForm />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    padding: spacing.lg,
  },
});
