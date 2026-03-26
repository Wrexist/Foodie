import React from 'react';
import { View, Pressable, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassSheet } from '@/components/ui/GlassSheet';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { ScoreInput } from '@/features/reviews/components/ScoreInput';
import type { JournalFilters } from '../types';
import { colors, spacing } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  filters: JournalFilters;
  onUpdate: (updates: Partial<JournalFilters>) => void;
  onReset: () => void;
}

type SortOption = { label: string; value: JournalFilters['sortBy'] };

const SORT_OPTIONS: SortOption[] = [
  { label: 'Date', value: 'date' },
  { label: 'Rating', value: 'rating' },
];

export function FilterSheet({
  visible,
  onClose,
  filters,
  onUpdate,
  onReset,
}: FilterSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.sheetContainer}>
        <GlassSheet>
          <View style={styles.header}>
            <Text variant="title3">Filters</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </Pressable>
          </View>

          <Text variant="headline" style={styles.sectionTitle}>
            Sort by
          </Text>
          <View style={styles.chipRow}>
            {SORT_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                style={[
                  styles.chip,
                  filters.sortBy === opt.value && styles.chipActive,
                ]}
                onPress={() => {
                  haptics.selection();
                  onUpdate({ sortBy: opt.value });
                }}
              >
                <Text
                  variant="subhead"
                  color={
                    filters.sortBy === opt.value
                      ? colors.accentGold
                      : colors.textSecondary
                  }
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.orderToggle}
              onPress={() => {
                haptics.light();
                onUpdate({
                  sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
                });
              }}
            >
              <Ionicons
                name={
                  filters.sortOrder === 'asc'
                    ? 'arrow-up'
                    : 'arrow-down'
                }
                size={18}
                color={colors.textPrimary}
              />
            </Pressable>
          </View>

          <Text variant="headline" style={styles.sectionTitle}>
            Minimum Rating
          </Text>
          <ScoreInput
            value={filters.minRating ?? 0}
            onChange={(score) =>
              onUpdate({ minRating: score > 0 ? score : undefined })
            }
          />

          <View style={styles.actions}>
            <Button
              title="Reset"
              variant="ghost"
              size="md"
              onPress={onReset}
            />
            <Button
              title="Apply"
              variant="primary"
              size="md"
              onPress={onClose}
            />
          </View>
        </GlassSheet>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
  },
  chipActive: {
    borderColor: colors.accentGold,
    backgroundColor: colors.accentGoldMuted,
  },
  orderToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing['3xl'],
  },
});
