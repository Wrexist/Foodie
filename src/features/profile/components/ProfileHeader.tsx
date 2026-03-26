import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import type { UserRow } from '@/types/database';
import type { ProfileStats } from '../types';
import { colors, spacing } from '@/design-system/tokens';
import { formatCount } from '@/utils/format';

interface ProfileHeaderProps {
  user: UserRow;
  stats: ProfileStats;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onEditProfile?: () => void;
}

export function ProfileHeader({
  user,
  stats,
  isOwnProfile,
  isFollowing,
  onFollow,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Avatar uri={user.avatar_url} size="xl" showBorder />
      <Text variant="title2" style={styles.name}>
        {user.display_name}
      </Text>
      <Text
        variant="subhead"
        color={colors.textSecondary}
        style={{ letterSpacing: 0.5 }}
      >
        @{user.username}
      </Text>
      {user.bio && (
        <Text
          variant="callout"
          color={colors.textSecondary}
          align="center"
          style={styles.bio}
        >
          {user.bio}
        </Text>
      )}

      <View style={styles.statsRow}>
        <StatItem label="Reviews" value={formatCount(stats.reviewCount)} />
        <StatItem label="Following" value={formatCount(stats.followingCount)} />
        <StatItem label="Followers" value={formatCount(stats.followerCount)} />
      </View>

      {isOwnProfile ? (
        <Button
          title="Edit Profile"
          variant="secondary"
          size="sm"
          onPress={onEditProfile}
        />
      ) : (
        <Button
          title={isFollowing ? 'Following' : 'Follow'}
          variant={isFollowing ? 'secondary' : 'primary'}
          size="sm"
          onPress={onFollow}
        />
      )}
    </View>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text variant="title2" color={colors.accentGold}>{value}</Text>
      <Text variant="caption1" color={colors.textSecondary}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  name: {
    marginTop: spacing.md,
    marginBottom: 2,
  },
  bio: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: spacing.xl,
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.lg,
  },
  stat: {
    alignItems: 'center',
    gap: spacing.xs,
  },
});
