import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { KeyboardAvoiding } from '@/components/layout/KeyboardAvoiding';
import { supabase } from '@/lib/supabase';
import { haptics } from '@/design-system/haptics';
import { colors, spacing } from '@/design-system/tokens';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: 'palate://reset-password',
      });
      if (error) throw error;
      haptics.success();
      setSent(true);
    } catch (err: any) {
      haptics.error();
      Alert.alert('Error', err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Screen scroll>
        <Header title="Check Your Email" showBack />
        <View style={styles.content}>
          <GlassCard animated>
            <View style={styles.successContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={44} color={colors.accentGold} />
              </View>
              <Text variant="headline" align="center" style={styles.successTitle}>
                Reset Link Sent
              </Text>
              <Text variant="body" color={colors.textSecondary} align="center">
                We've sent a password reset link to {email}. Check your inbox and follow the
                instructions.
              </Text>
              <Button
                title="Back to Sign In"
                variant="secondary"
                onPress={() => router.back()}
                style={styles.backButton}
              />
            </View>
          </GlassCard>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <Header title="Reset Password" showBack />
      <KeyboardAvoiding>
        <View style={styles.content}>
          <Text variant="body" color={colors.textSecondary} style={styles.description}>
            Enter the email address associated with your account and we'll send you a link to reset
            your password.
          </Text>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
            <Button
              title="Send Reset Link"
              variant="primary"
              size="lg"
              loading={loading}
              onPress={handleReset}
            />
          </View>
        </View>
      </KeyboardAvoiding>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing['2xl'],
  },
  description: {
    marginBottom: spacing['2xl'],
  },
  form: {
    gap: spacing.lg,
  },
  successContainer: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.accentGoldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    marginTop: spacing.sm,
  },
  backButton: {
    marginTop: spacing.md,
  },
});
