import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import {
  OnboardingSlideView,
  ONBOARDING_SLIDES,
} from '@/features/auth/components/OnboardingSlides';
import { storage, storageKeys } from '@/lib/storage';
import { colors, spacing } from '@/design-system/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const isLastSlide = currentIndex === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      storage.set(storageKeys.hasOnboarded, true);
      router.replace('/(auth)/sign-in');
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleSkip = () => {
    storage.set(storageKeys.hasOnboarded, true);
    router.replace('/(auth)/sign-in');
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.skipContainer}>
        <Pressable onPress={handleSkip}>
          <Text variant="subhead" color={colors.textSecondary}>
            Skip
          </Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        renderItem={({ item }) => <OnboardingSlideView slide={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setCurrentIndex(index);
        }}
        style={styles.list}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {ONBOARDING_SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <Button
          title={isLastSlide ? 'Get Started' : 'Next'}
          variant="primary"
          size="lg"
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  list: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['2xl'],
    gap: spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.glassFill,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.accentGold,
  },
  button: {
    width: '100%',
  },
});
