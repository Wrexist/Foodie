import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing } from '@/design-system/tokens';

interface SkeletonProps {
  width: number | string;
  height: number;
  radius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width,
  height,
  radius = radii.sm,
  style,
}: SkeletonProps) {
  const { width: screenWidth } = useWindowDimensions();
  const shimmerWidth = typeof width === 'number' ? width : screenWidth;
  const translateX = useSharedValue(-shimmerWidth);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(shimmerWidth, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      false
    );
  }, [translateX, shimmerWidth]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        {
          width: width as number,
          height,
          borderRadius: radius,
          backgroundColor: colors.glassFill,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255, 255, 255, 0.08)', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <View style={styles.textContainer}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '60%' : '100%'}
          height={14}
          style={i > 0 ? { marginTop: 8 } : undefined}
        />
      ))}
    </View>
  );
}

export function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardUserRow}>
        <Skeleton width={32} height={32} radius={16} />
        <View style={styles.cardUserInfo}>
          <Skeleton width={120} height={14} radius={radii.sm} />
          <Skeleton width={80} height={10} radius={radii.sm} />
        </View>
      </View>
      <Skeleton width="100%" height={16} radius={radii.sm} style={{ marginTop: spacing.md }} />
      <Skeleton width="70%" height={14} radius={radii.sm} style={{ marginTop: spacing.sm }} />
      <View style={styles.cardBadgeRow}>
        <Skeleton width={64} height={22} radius={radii.full} />
        <Skeleton width={48} height={22} radius={radii.full} />
      </View>
    </View>
  );
}

export function SkeletonProfile() {
  return (
    <View style={styles.profile}>
      <Skeleton width={80} height={80} radius={40} />
      <Skeleton width={160} height={18} radius={radii.sm} style={{ marginTop: spacing.md }} />
      <Skeleton width={100} height={14} radius={radii.sm} style={{ marginTop: spacing.sm }} />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    gap: spacing.xs,
  },
  card: {
    backgroundColor: colors.glassFill,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    padding: spacing.lg,
  },
  cardUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardUserInfo: {
    gap: spacing.xs,
  },
  cardBadgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
});
