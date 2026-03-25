import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Text } from '@/components/ui/Text';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { colors, spacing } from '@/design-system/tokens';

export default function SubscriptionScreen() {
  return (
    <Screen scroll>
      <Header title="Palate Premium" showBack />
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconContainer}>
            <Ionicons name="diamond" size={48} color={colors.accentGold} />
          </View>
          <Text variant="title1" align="center">
            Unlock Your{'\n'}Full Palate
          </Text>
          <Text
            variant="body"
            color={colors.textSecondary}
            align="center"
            style={styles.subtitle}
          >
            Get AI-powered insights, unlimited collections, and more.
          </Text>
        </View>

        <GlassCard>
          <FeatureRow icon="sparkles" label="AI Review Summaries" />
          <FeatureRow icon="pricetag" label="Auto Tag Extraction" />
          <FeatureRow icon="analytics" label="Taste Profile & Insights" />
          <FeatureRow icon="infinite" label="Unlimited Collections" />
          <FeatureRow icon="cloud-upload" label="Unlimited Photo Uploads" />
          <FeatureRow icon="people" label="Priority Support" />
        </GlassCard>

        <GlassCard style={styles.pricingCard}>
          <Text variant="title3">Premium</Text>
          <View style={styles.priceRow}>
            <Text variant="largeTitle" color={colors.accentGold}>
              $4.99
            </Text>
            <Text variant="subhead" color={colors.textSecondary}>
              /month
            </Text>
          </View>
          <Button title="Start Free Trial" variant="primary" size="lg" onPress={() => {}} />
          <Text
            variant="caption1"
            color={colors.textTertiary}
            align="center"
            style={styles.trialText}
          >
            7-day free trial. Cancel anytime.
          </Text>
        </GlassCard>
      </View>
    </Screen>
  );
}

function FeatureRow({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.featureRow}>
      <Ionicons name={icon} size={20} color={colors.accentGold} />
      <Text variant="body" style={styles.featureLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing['5xl'],
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.accentGoldMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  featureLabel: {
    flex: 1,
  },
  pricingCard: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  trialText: {
    marginTop: spacing.xs,
  },
});
