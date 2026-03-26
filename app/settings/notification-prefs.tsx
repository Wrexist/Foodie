import React, { useEffect, useState } from 'react';
import { View, Switch, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { useSettings, useUpdateSettings } from '@/features/profile/hooks/useSettings';
import { haptics } from '@/design-system/haptics';
import { colors, spacing } from '@/design-system/tokens';
import type { UserSettingsRow } from '@/types/database';

export default function NotificationPrefsScreen() {
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  useEffect(() => {
    if (settings) {
      const s = settings as UserSettingsRow;
      setPushEnabled(s.push_notifications);
      setEmailEnabled(s.email_notifications);
    }
  }, [settings]);

  const handleToggle = (
    field: 'push_notifications' | 'email_notifications',
    value: boolean,
    setter: (v: boolean) => void,
  ) => {
    setter(value);
    haptics.selection();
    updateSettings.mutate(
      { [field]: value },
      {
        onError: (err) => {
          setter(!value);
          haptics.error();
          Alert.alert('Error', err.message);
        },
      },
    );
  };

  return (
    <Screen scroll>
      <Header title="Notifications" showBack />
      <View style={styles.content}>
        <GlassCard>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text variant="body">Push Notifications</Text>
              <Text variant="caption1" color={colors.textSecondary}>
                Get notified about likes, follows, and recommendations
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={(v) => handleToggle('push_notifications', v, setPushEnabled)}
              trackColor={{ false: colors.glassFill, true: colors.accentGold }}
              thumbColor={colors.textPrimary}
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text variant="body">Email Notifications</Text>
              <Text variant="caption1" color={colors.textSecondary}>
                Weekly digest and important updates
              </Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={(v) => handleToggle('email_notifications', v, setEmailEnabled)}
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
