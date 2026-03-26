import React from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { supabase } from '@/lib/supabase';
import { colors, spacing } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';

export default function SettingsScreen() {
  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          haptics.medium();
          try {
            await supabase.auth.signOut();
            router.replace('/(auth)/sign-in');
          } catch {
            Alert.alert('Sign Out Failed', 'Something went wrong. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <Screen scroll>
      <Header title="Settings" showBack />
      <View style={styles.content}>
        <GlassCard>
          <SettingsRow
            icon="person-outline"
            label="Edit Profile"
            onPress={() => {}}
          />
          <SettingsRow
            icon="notifications-outline"
            label="Notifications"
            onPress={() => {}}
          />
          <SettingsRow
            icon="lock-closed-outline"
            label="Privacy"
            onPress={() => {}}
          />
        </GlassCard>

        <GlassCard>
          <SettingsRow
            icon="star-outline"
            label="Palate Premium"
            onPress={() => router.push('/settings/subscription')}
            accent
          />
        </GlassCard>

        <GlassCard>
          <SettingsRow
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => {}}
          />
          <SettingsRow
            icon="document-text-outline"
            label="Terms of Service"
            onPress={() => {}}
          />
          <SettingsRow
            icon="shield-outline"
            label="Privacy Policy"
            onPress={() => {}}
          />
        </GlassCard>

        <GlassCard>
          <SettingsRow
            icon="log-out-outline"
            label="Sign Out"
            onPress={handleSignOut}
            destructive
          />
        </GlassCard>
      </View>
    </Screen>
  );
}

function SettingsRow({
  icon,
  label,
  onPress,
  accent = false,
  destructive = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  accent?: boolean;
  destructive?: boolean;
}) {
  const textColor = destructive
    ? colors.error
    : accent
      ? colors.accentGold
      : colors.textPrimary;

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Ionicons name={icon} size={22} color={textColor} />
      <Text variant="body" color={textColor} style={styles.rowLabel}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </Pressable>
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
    paddingVertical: spacing.md,
  },
  rowLabel: {
    flex: 1,
    marginLeft: spacing.md,
  },
});
