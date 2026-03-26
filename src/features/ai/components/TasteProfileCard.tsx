import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTasteProfile } from '../hooks/useTasteProfile';
import { colors, spacing, radii, animation } from '@/design-system/tokens';

export function TasteProfileCard() {
  const { data: profile, isLoading } = useTasteProfile();

  if (isLoading) {
    return (
      <GlassCard style={styles.card}>
        <Skeleton width="50%" height={16} radius={radii.sm} />
        <Skeleton width="100%" height={60} radius={radii.sm} style={{ marginTop: spacing.md }} />
      </GlassCard>
    );
  }

  const hasData = profile?.topCuisines?.length > 0 || profile?.flavorPreferences?.length > 0;

  if (!hasData) {
    return (
      <GlassCard style={styles.card}>
        <View style={styles.emptyRow}>
          <Ionicons name="sparkles-outline" size={20} color={colors.accentGold} />
          <Text variant="subhead" color={colors.textSecondary} style={{ flex: 1 }}>
            Add 3+ reviews to generate your taste profile
          </Text>
        </View>
        <Button
          title="Add Review"
          variant="secondary"
          size="sm"
          onPress={() => router.push('/(modals)/add-review')}
          style={{ alignSelf: 'flex-start', marginTop: spacing.sm }}
        />
      </GlassCard>
    );
  }

  return (
    <Animated.View entering={FadeInUp.duration(animation.normal)}>
      <GlassCard style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="sparkles" size={18} color={colors.accentGold} />
          <Text variant="headline">Taste Profile</Text>
        </View>

        {profile.diningStyle && (
          <Text
            variant="callout"
            color={colors.textSecondary}
            style={styles.diningStyle}
          >
            {profile.diningStyle}
          </Text>
        )}

        {profile.topCuisines?.length > 0 && (
          <View style={styles.section}>
            <Text variant="caption1" color={colors.textTertiary} style={styles.sectionLabel}>
              TOP CUISINES
            </Text>
            <View style={styles.badgeRow}>
              {profile.topCuisines.map((c: string) => (
                <Badge key={c} label={c} variant="gold" />
              ))}
            </View>
          </View>
        )}

        {profile.flavorPreferences?.length > 0 && (
          <View style={styles.section}>
            <Text variant="caption1" color={colors.textTertiary} style={styles.sectionLabel}>
              FLAVOR PREFERENCES
            </Text>
            <View style={styles.badgeRow}>
              {profile.flavorPreferences.map((f: string) => (
                <Badge key={f} label={f} variant="sage" />
              ))}
            </View>
          </View>
        )}

        {profile.pricePreference && (
          <View style={styles.section}>
            <Text variant="caption1" color={colors.textTertiary} style={styles.sectionLabel}>
              PRICE PREFERENCE
            </Text>
            <View style={styles.priceRow}>
              {[1, 2, 3, 4].map((level) => (
                <Text
                  key={level}
                  variant="headline"
                  color={level <= profile.pricePreference ? colors.accentGold : colors.textDisabled}
                >
                  $
                </Text>
              ))}
            </View>
          </View>
        )}
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  diningStyle: {
    marginBottom: spacing.md,
  },
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionLabel: {
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
