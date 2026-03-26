import React, { useEffect, useState } from 'react';
import { View, Switch, StyleSheet, Alert } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { useProfile, useUpdateProfile } from '@/features/profile/hooks/useProfile';
import { useSettings, useUpdateSettings } from '@/features/profile/hooks/useSettings';
import { haptics } from '@/design-system/haptics';
import { colors, spacing } from '@/design-system/tokens';
import type { UserRow, UserSettingsRow } from '@/types/database';

export default function PrivacyScreen() {
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();

  const [isPublic, setIsPublic] = useState(true);
  const [defaultVisibility, setDefaultVisibility] = useState<'public' | 'private'>('public');

  useEffect(() => {
    if (profile) {
      setIsPublic((profile as UserRow).is_public);
    }
  }, [profile]);

  useEffect(() => {
    if (settings) {
      setDefaultVisibility((settings as UserSettingsRow).default_review_visibility);
    }
  }, [settings]);

  const handlePublicToggle = (value: boolean) => {
    setIsPublic(value);
    haptics.selection();
    updateProfile.mutate(
      { is_public: value },
      {
        onError: (err) => {
          setIsPublic(!value);
          haptics.error();
          Alert.alert('Error', err.message);
        },
      },
    );
  };

  const handleVisibilityToggle = (value: boolean) => {
    const vis = value ? 'public' : 'private';
    setDefaultVisibility(vis);
    haptics.selection();
    updateSettings.mutate(
      { default_review_visibility: vis },
      {
        onError: (err) => {
          setDefaultVisibility(vis === 'public' ? 'private' : 'public');
          haptics.error();
          Alert.alert('Error', err.message);
        },
      },
    );
  };

  return (
    <Screen scroll>
      <Header title="Privacy" showBack />
      <View style={styles.content}>
        <GlassCard>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text variant="body">Public Profile</Text>
              <Text variant="caption1" color={colors.textSecondary}>
                Allow others to see your profile and reviews
              </Text>
            </View>
            <Switch
              value={isPublic}
              onValueChange={handlePublicToggle}
              trackColor={{ false: colors.glassFill, true: colors.accentGold }}
              thumbColor={colors.textPrimary}
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text variant="body">Reviews Public by Default</Text>
              <Text variant="caption1" color={colors.textSecondary}>
                New reviews will be visible to everyone
              </Text>
            </View>
            <Switch
              value={defaultVisibility === 'public'}
              onValueChange={handleVisibilityToggle}
              trackColor={{ false: colors.glassFill, true: colors.accentGold }}
              thumbColor={colors.textPrimary}
            />
          </View>
        </GlassCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  rowText: {
    flex: 1,
    gap: spacing.xs,
    marginRight: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.glassStroke,
    marginVertical: spacing.sm,
  },
});
