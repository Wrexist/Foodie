import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, spacing } from '@/design-system/tokens';

export default function PlaceSearchModal() {
  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text variant="headline">Find a Place</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Search restaurants, cafes, bars..."
          leftIcon={<Ionicons name="search" size={20} color={colors.textTertiary} />}
          autoFocus
        />
      </View>

      <EmptyState
        icon="search-outline"
        title="Search for a place"
        subtitle="Find restaurants, cafes, and bars to add to your review"
      />
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
