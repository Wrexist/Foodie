import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/design-system/tokens';
import { Text } from '@/components/ui/Text';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface OnboardingSlide {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  accentColor: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    icon: 'restaurant',
    title: 'Your Dining\nJournal',
    subtitle:
      'Log every memorable meal. Rate dishes, capture photos, and build your personal food story.',
    accentColor: colors.accentGold,
  },
  {
    icon: 'sparkles',
    title: 'AI-Powered\nInsights',
    subtitle:
      'Discover your taste patterns. Get personalized recommendations based on what you actually love.',
    accentColor: colors.accentRose,
  },
  {
    icon: 'map',
    title: 'Explore &\nDiscover',
    subtitle:
      'Map your culinary journey. Save places to visit, create collections, and follow fellow foodies.',
    accentColor: colors.accentSage,
  },
];

export function OnboardingSlideView({ slide }: { slide: OnboardingSlide }) {
  return (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${slide.accentColor}20` },
        ]}
      >
        <Ionicons name={slide.icon} size={64} color={slide.accentColor} />
      </View>
      <Text variant="largeTitle" align="center" style={styles.title}>
        {slide.title}
      </Text>
      <Text
        variant="body"
        color={colors.textSecondary}
        align="center"
        style={styles.subtitle}
      >
        {slide.subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['3xl'],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['3xl'],
  },
  title: {
    marginBottom: spacing.lg,
  },
  subtitle: {
    lineHeight: 24,
  },
});
