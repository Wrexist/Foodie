import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/design-system/tokens';

export default function AddReviewModal() {
  return (
    <Screen scroll edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text variant="headline">New Review</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <GlassCard style={styles.section}>
          <Pressable
            style={styles.placeSelector}
            onPress={() => router.push('/(modals)/place-search')}
          >
            <Ionicons name="location-outline" size={24} color={colors.accentGold} />
            <Text variant="body" color={colors.textSecondary}>
              Select a place...
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>
        </GlassCard>

        <GlassCard style={styles.section}>
          <Text variant="headline" style={styles.sectionTitle}>
            How was it?
          </Text>
          <Text variant="subhead" color={colors.textSecondary}>
            Rate your overall experience from 1 to 10
          </Text>
        </GlassCard>

        <GlassCard style={styles.section}>
          <Text variant="headline" style={styles.sectionTitle}>
            Notes
          </Text>
          <Text variant="subhead" color={colors.textSecondary}>
            What made this visit memorable?
          </Text>
        </GlassCard>

        <GlassCard style={styles.section}>
          <Pressable
            style={styles.placeSelector}
            onPress={() => router.push('/(modals)/add-item')}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.accentGold} />
            <Text variant="body">Add dishes & drinks</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>
        </GlassCard>

        <Button
          title="Publish Review"
          variant="primary"
          size="lg"
          style={styles.publishButton}
          onPress={() => {}}
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
    gap: spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.xs,
  },
  placeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  publishButton: {
    marginTop: spacing.lg,
  },
});
