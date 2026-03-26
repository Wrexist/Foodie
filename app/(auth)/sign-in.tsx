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
import { useSignIn } from '@/features/auth/hooks/useAuth';
import { authService } from '@/features/auth/services/auth.service';
import { signInSchema, type SignInInput } from '@/utils/validation';
import { KeyboardAvoiding } from '@/components/layout/KeyboardAvoiding';
import { colors, spacing } from '@/design-system/tokens';

export default function SignInScreen() {
  const signIn = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: SignInInput) => {
    signIn.mutate(data, {
      onError: (error) => Alert.alert('Sign In Failed', error.message),
    });
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <KeyboardAvoiding>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="largeTitle">Welcome{'\n'}Back</Text>
            <Text
              variant="body"
              color={colors.textSecondary}
              style={styles.subtitle}
            >
              Sign in to continue your dining journey.
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
                  placeholder="Enter your password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              title="Sign In"
              variant="primary"
              size="lg"
              loading={signIn.isPending}
              onPress={handleSubmit(onSubmit)}
            />
            <Pressable
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.forgotLink}
            >
              <Text variant="subhead" color={colors.accentGold}>
                Forgot password?
              </Text>
            </Pressable>
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
            style={styles.signUpLink}
            onPress={() => router.push('/(auth)/sign-up')}
          >
            <Text variant="subhead" color={colors.textSecondary}>
              Don't have an account?{' '}
            </Text>
            <Text variant="subhead" color={colors.accentGold}>
              Sign Up
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
  forgotLink: {
    alignSelf: 'flex-end',
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
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing['2xl'],
  },
});
