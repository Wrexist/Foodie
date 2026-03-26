import React from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SocialButtons } from '@/features/auth/components/SocialButtons';
import { useSignUp } from '@/features/auth/hooks/useAuth';
import { authService } from '@/features/auth/services/auth.service';
import { signUpSchema, type SignUpInput } from '@/utils/validation';
import { KeyboardAvoiding } from '@/components/layout/KeyboardAvoiding';
import { colors, spacing } from '@/design-system/tokens';

export default function SignUpScreen() {
  const signUp = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: SignUpInput) => {
    signUp.mutate(data, {
      onError: (error) => Alert.alert('Sign Up Failed', error.message),
    });
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <KeyboardAvoiding>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="largeTitle">Create{'\n'}Account</Text>
            <Text
              variant="body"
              color={colors.textSecondary}
              style={styles.subtitle}
            >
              Start building your personal dining journal.
            </Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="your@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
                  placeholder="Create a strong password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              title="Create Account"
              variant="primary"
              size="lg"
              loading={signUp.isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text variant="caption1" color={colors.textTertiary}>
              OR
            </Text>
            <View style={styles.dividerLine} />
          </View>

          <SocialButtons
            onApplePress={() => authService.signInWithApple().catch((e) => Alert.alert('Error', e.message))}
            onGooglePress={() => authService.signInWithGoogle().catch((e) => Alert.alert('Error', e.message))}
          />

          <Pressable
            style={styles.signInLink}
            onPress={() => router.back()}
          >
            <Text variant="subhead" color={colors.textSecondary}>
              Already have an account?{' '}
            </Text>
            <Text variant="subhead" color={colors.accentGold}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoiding>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing['2xl'],
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing['3xl'],
  },
  subtitle: {
    marginTop: spacing.md,
  },
  form: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  signInLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing['2xl'],
  },
});
