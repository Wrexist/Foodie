import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, spacing } from '@/design-system/tokens';

export default function JournalScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="largeTitle">Journal</Text>
        <Pressable style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>
      <EmptyState
        icon="book-outline"
        title="Your journal is empty"
        subtitle="Every great meal deserves to be remembered. Start logging your dining experiences."
        actionTitle="Write a Review"
        onAction={() => {}}
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
