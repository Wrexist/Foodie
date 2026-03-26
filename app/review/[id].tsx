import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Skeleton } from '@/components/ui/Skeleton';
import { DishCard } from '@/components/shared/DishCard';
import { useReview } from '@/features/reviews/hooks/useReviews';
import { formatRelativeDate, formatScore } from '@/utils/format';
import type { ReviewFullWithTags, ReviewItemRow } from '@/types/database';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useReview(id);
  const review = data as ReviewFullWithTags | undefined;

  if (isLoading) {
    return (
      <Screen>
        <Header title="Review" showBack />
        <View style={styles.content}>
          <Skeleton width="100%" height={200} radius={radii.card} />
          <Skeleton width="100%" height={120} radius={radii.card} />
        </View>
      </Screen>
    );
  }

  if (!review) {
    return (
      <Screen>
        <Header title="Review" showBack />
        <View style={styles.content}>
          <Text variant="body" color={colors.textSecondary} align="center">
            Review not found
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Header title="Review" showBack />
      <View style={styles.content}>
        <GlassCard>
          <Pressable
            style={styles.placeRow}
            onPress={() => router.push(`/place/${review.place_id}`)}
          >
            <Ionicons name="location" size={20} color={colors.accentGold} />
            <Text variant="headline" style={styles.flex}>
              {review.place?.name ?? 'Unknown Place'}
            </Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </Pressable>

          <View style={styles.scoreRow}>
            <Text variant="title1" color={colors.accentGold}>
              {formatScore(review.overall_score)}
            </Text>
            <StarRating rating={review.overall_score / 2} />
          </View>

          <Text variant="caption1" color={colors.textTertiary}>
            {formatRelativeDate(review.created_at)}
            {review.is_private && ' · Private'}
          </Text>
        </GlassCard>

        {review.notes && (
          <GlassCard>
            <Text variant="headline" style={styles.sectionTitle}>
              Notes
            </Text>
            <Text variant="body" color={colors.textSecondary}>
              {review.ai_summary ?? review.notes}
            </Text>
            {review.ai_summary && review.notes !== review.ai_summary && (
              <Text variant="caption1" color={colors.textTertiary} style={styles.originalNotes}>
                Original: {review.notes}
              </Text>
            )}
          </GlassCard>
        )}

        {review.review_items && review.review_items.length > 0 && (
          <GlassCard>
            <Text variant="headline" style={styles.sectionTitle}>
              Dishes & Drinks
            </Text>
            {review.review_items.map((item: ReviewItemRow) => (
              <DishCard key={item.id} item={item} />
            ))}
          </GlassCard>
        )}

        {review.review_tags?.length > 0 && (
          <GlassCard>
            <Text variant="headline" style={styles.sectionTitle}>
              Tags
            </Text>
            <View style={styles.tagsRow}>
              {review.review_tags.map((rt) => (
                <Badge key={rt.id} label={rt.tag?.name ?? rt.tag_id} variant="sage" />
              ))}
            </View>
          </GlassCard>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  flex: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  originalNotes: {
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
