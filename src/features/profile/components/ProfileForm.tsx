import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUpdateProfile } from '../hooks/useProfile';
import { profileSchema, type ProfileInput } from '@/utils/validation';
import { spacing } from '@/design-system/tokens';
import type { UserRow } from '@/types/database';

interface ProfileFormProps {
  user: UserRow;
  onSuccess?: () => void;
}

export function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const updateProfile = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user.username,
      display_name: user.display_name,
      bio: user.bio ?? '',
    },
  });

  const onSubmit = (data: ProfileInput) => {
    updateProfile.mutate(
      {
        username: data.username,
        display_name: data.display_name,
        bio: data.bio ?? null,
      },
      {
        onSuccess: () => onSuccess?.(),
        onError: (err) => Alert.alert('Error', err.message),
      }
    );
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="display_name"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Display Name"
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
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
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
            value={value}
            onChangeText={onChange}
            multiline
            style={{ height: 80, textAlignVertical: 'top' }}
            error={errors.bio?.message}
          />
        )}
      />
      <Button
        title="Save Changes"
        variant="primary"
        size="lg"
        loading={updateProfile.isPending}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.lg,
    padding: spacing.lg,
  },
});
