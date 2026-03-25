import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth.store';
import { colors, spacing } from '@/design-system/tokens';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text variant="largeTitle">Profile</Text>
        <Pressable
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
        >
          <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <Avatar uri={user?.user_metadata?.avatar_url} size="xl" showBorder />
        <Text variant="title2" style={styles.name}>
          {user?.user_metadata?.display_name ?? 'Set up your profile'}
        </Text>
        {user?.user_metadata?.username && (
          <Text variant="subhead" color={colors.textSecondary}>
            @{user.user_metadata.username}
          </Text>
        )}
      </View>

      <View style={styles.statsRow}>
        <ProfileStat label="Reviews" value="0" />
        <ProfileStat label="Following" value="0" />
        <ProfileStat label="Followers" value="0" />
      </View>

      <View style={styles.actions}>
        <Button
          title="Edit Profile"
          variant="secondary"
          size="sm"
          onPress={() => {}}
        />
        <Button
          title="Saved Places"
          variant="secondary"
          size="sm"
          onPress={() => router.push('/saved')}
          icon={<Ionicons name="bookmark-outline" size={16} color={colors.textPrimary} />}
        />
        <Button
          title="Collections"
          variant="secondary"
          size="sm"
          onPress={() => router.push('/collections')}
          icon={<Ionicons name="grid-outline" size={16} color={colors.textPrimary} />}
        />
      </View>
    </Screen>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text variant="title3">{value}</Text>
      <Text variant="caption1" color={colors.textSecondary}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  name: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    marginHorizontal: spacing.lg,
  },
  stat: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.lg,
    paddingBottom: 120,
  },
});
