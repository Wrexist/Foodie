import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { EmptyState } from '@/components/ui/EmptyState';
import { UserRow } from '@/components/shared/UserRow';
import { useUserSearch } from '@/features/social/hooks/useUserSearch';
import { useIsFollowing, useToggleFollow } from '@/features/social/hooks/useFollows';
import { useAuthStore } from '@/stores/auth.store';
import { haptics } from '@/design-system/haptics';
import type { User } from '@/types/database';
import { colors, spacing } from '@/design-system/tokens';

export default function SearchScreen() {
  const { query, setQuery, data, isLoading } = useUserSearch();
  const users = data?.data ?? [];

  const renderItem = useCallback(({ item }: { item: User }) => (
    <View style={styles.row}>
      <SearchUserRow user={item} />
    </View>
  ), []);

  return (
    <Screen>
      <Header title="Find People" showBack />
      <View style={styles.searchBar}>
        <Input
          placeholder="Search by name or username"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoFocus
        />
      </View>
      <FlatList
        data={users as User[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          query.length >= 2 && !isLoading ? (
            <EmptyState
              icon="search-outline"
              title="No users found"
              subtitle="Try a different search term"
            />
          ) : query.length < 2 ? (
            <View style={styles.hint}>
              <Text variant="subhead" color={colors.textTertiary}>
                Type at least 2 characters to search
              </Text>
            </View>
          ) : null
        }
      />
    </Screen>
  );
}

function SearchUserRow({ user }: { user: User }) {
  const currentUser = useAuthStore((s) => s.user);
  const { data: isFollowing } = useIsFollowing(user.id);
  const toggleFollow = useToggleFollow();
  const isOwnProfile = currentUser?.id === user.id;

  return (
    <UserRow
      user={user}
      isFollowing={isFollowing ?? false}
      showFollowButton={!isOwnProfile}
      onFollow={() => {
        haptics.light();
        toggleFollow.mutate({
          targetUserId: user.id,
          isFollowing: isFollowing ?? false,
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },
  row: {
    paddingVertical: spacing.xs,
  },
  hint: {
    alignItems: 'center',
    paddingTop: spacing['3xl'],
  },
});
