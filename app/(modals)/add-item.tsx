import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
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
        <View style={styles.categoryPicker}>
          <Pressable style={[styles.categoryButton, styles.categoryActive]}>
            <Ionicons name="restaurant-outline" size={20} color={colors.accentGold} />
            <Text variant="subhead" color={colors.accentGold}>
              Dish
            </Text>
          </Pressable>
          <Pressable style={styles.categoryButton}>
            <Ionicons name="wine-outline" size={20} color={colors.textSecondary} />
            <Text variant="subhead" color={colors.textSecondary}>
              Drink
            </Text>
          </Pressable>
        </View>

        <Input label="Name" placeholder="What did you have?" />

        <GlassCard style={styles.section}>
          <Text variant="headline">Rating</Text>
          <Text variant="subhead" color={colors.textSecondary}>
            How was this item? (optional)
          </Text>
        </GlassCard>

        <Input
          label="Notes"
          placeholder="Any thoughts about this item?"
          multiline
          numberOfLines={3}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        <Button
          title="Add Item"
          variant="primary"
          size="lg"
          onPress={() => router.back()}
          style={styles.addButton}
        />
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
    gap: spacing.xl,
  },
  categoryPicker: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
  },
  categoryActive: {
    borderColor: colors.accentGold,
    backgroundColor: colors.accentGoldMuted,
  },
  section: {
    gap: spacing.sm,
  },
  addButton: {
    marginTop: spacing.lg,
  },
});
