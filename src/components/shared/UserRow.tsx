import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/design-system/tokens';
import type { User } from '@/types/database';

interface UserRowProps {
  user: User;
  isFollowing?: boolean;
  onFollow?: () => void;
  showFollowButton?: boolean;
}

export function UserRow({
  user,
  isFollowing = false,
  onFollow,
  showFollowButton = true,
}: UserRowProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/user/${user.id}`)}
    >
      <Avatar uri={user.avatar_url} size="md" />
      <View style={styles.info}>
        <Text variant="headline">{user.display_name}</Text>
        <Text variant="footnote" color={colors.textSecondary}>
          @{user.username}
        </Text>
      </View>
      {showFollowButton && onFollow && (
        <Button
          title={isFollowing ? 'Following' : 'Follow'}
          variant={isFollowing ? 'secondary' : 'primary'}
          size="sm"
          onPress={onFollow}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  info: {
    flex: 1,
    gap: 2,
  },
});
