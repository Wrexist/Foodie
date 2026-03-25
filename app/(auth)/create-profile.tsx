import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useSetupProfile } from '@/features/auth/hooks/useAuth';
import { profileSchema, type ProfileInput } from '@/utils/validation';
import { KeyboardAvoiding } from '@/components/layout/KeyboardAvoiding';
import { colors, spacing } from '@/design-system/tokens';

export default function CreateProfileScreen() {
  const setupProfile = useSetupProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: '', display_name: '', bio: '' },
  });

  const onSubmit = (data: ProfileInput) => {
    setupProfile.mutate(data, {
      onError: (error) => Alert.alert('Error', error.message),
    });
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <KeyboardAvoiding>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="largeTitle">Set Up{'\n'}Your Profile</Text>
            <Text
              variant="body"
              color={colors.textSecondary}
              style={styles.subtitle}
            >
              Tell the world a little about yourself.
            </Text>
          </View>

          <View style={styles.avatarContainer}>
            <Avatar size="xl" showBorder />
            <Text variant="subhead" color={colors.accentGold}>
              Add Photo
            </Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="display_name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Display Name"
                  placeholder="How you'd like to be called"
                  value={value}
                  onChangeText={onChange}
                  error={errors.display_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Username"
                  placeholder="Choose a unique username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  error={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Bio"
                  placeholder="Food lover, adventure seeker..."
                  multiline
                  numberOfLines={3}
                  value={value}
                  onChangeText={onChange}
                  error={errors.bio?.message}
                  style={{ height: 80, textAlignVertical: 'top' }}
                />
              )}
            />

            <Button
              title="Continue"
              variant="primary"
              size="lg"
              loading={setupProfile.isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </KeyboardAvoiding>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing['2xl'],
  },
  header: {
    marginBottom: spacing['2xl'],
  },
  subtitle: {
    marginTop: spacing.md,
  },
  avatarContainer: {
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  form: {
    gap: spacing.lg,
  },
});
