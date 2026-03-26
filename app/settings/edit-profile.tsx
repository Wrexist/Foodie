import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { useProfile, useUpdateProfile } from '@/features/profile/hooks/useProfile';
import { haptics } from '@/design-system/haptics';
import { colors, spacing } from '@/design-system/tokens';
import type { UserRow } from '@/types/database';

export default function EditProfileScreen() {
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      const p = profile as UserRow;
      setDisplayName(p.display_name ?? '');
      setUsername(p.username ?? '');
      setBio(p.bio ?? '');
      setAvatarUrl(p.avatar_url);
    }
  }, [profile]);

  const handlePickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setAvatarUrl(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Could not open image picker');
    }
  };

  const handleSave = () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Display name is required');
      return;
    }

    updateProfile.mutate(
      {
        display_name: displayName.trim(),
        username: username.trim(),
        bio: bio.trim() || null,
        avatar_url: avatarUrl,
      },
      {
        onSuccess: () => {
          haptics.success();
          router.back();
        },
        onError: (err) => {
          haptics.error();
          Alert.alert('Error', err.message);
        },
      }
    );
  };

  return (
    <Screen scroll>
      <Header title="Edit Profile" showBack />
      <View style={styles.content}>
        <Pressable style={styles.avatarSection} onPress={handlePickAvatar}>
          <Avatar uri={avatarUrl} size="xl" showBorder />
          <Text variant="subhead" color={colors.accentGold} style={styles.changePhoto}>
            Change Photo
          </Text>
        </Pressable>

        <Input
          label="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
        />

        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="username"
          autoCapitalize="none"
        />

        <Input
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          multiline
          style={{ minHeight: 80 }}
        />

        <Button
          title="Save Changes"
          variant="primary"
          size="lg"
          onPress={handleSave}
          loading={updateProfile.isPending}
          style={styles.saveButton}
        />
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
  avatarSection: {
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  changePhoto: {
    marginTop: spacing.xs,
  },
  saveButton: {
    marginTop: spacing.lg,
  },
});
