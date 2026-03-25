import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { colors, spacing } from '@/design-system/tokens';

export default function PublicProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen scroll>
      <Header title="Profile" showBack />
      <View style={styles.profileSection}>
        <Avatar size="xl" />
        <Text variant="title2" style={styles.name}>
          User Profile
        </Text>
        <Button title="Follow" variant="primary" size="sm" onPress={() => {}} />
      </View>

      <Text variant="title3" style={styles.sectionTitle}>
        Reviews
      </Text>
      <EmptyState
        icon="book-outline"
        title="No public reviews"
        subtitle="This user hasn't shared any reviews yet"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.md,
  },
  name: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
});
