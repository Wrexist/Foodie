import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { JournalList } from '@/features/journal/components/JournalList';
import { FilterSheet } from '@/features/journal/components/FilterSheet';
import { useJournalFilters } from '@/features/journal/hooks/useJournalFilters';
import { colors, spacing } from '@/design-system/tokens';

export default function JournalScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const { filters, updateFilters, resetFilters } = useJournalFilters();

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="largeTitle">Journal</Text>
        <Pressable
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons name="options-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>

      <JournalList filters={filters} />

      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters}
        onUpdate={updateFilters}
        onReset={resetFilters}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
