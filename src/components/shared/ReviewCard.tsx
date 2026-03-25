import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeDate, formatScore } from '@/utils/format';
import { colors, spacing } from '@/design-system/tokens';
import type { ReviewFull } from '@/types/database';

interface ReviewCardProps {
  review: ReviewFull;
  showUser?: boolean;
}

export function ReviewCard({ review, showUser = true }: ReviewCardProps) {
  return (
    <Pressable onPress={() => router.push(`/review/${review.id}`)}>
      <GlassCard>
        {showUser && (
          <View style={styles.userRow}>
            <Avatar size="sm" />
            <View style={styles.userInfo}>
              <Text variant="subhead">Anonymous</Text>
              <Text variant="caption1" color={colors.textTertiary}>
                {formatRelativeDate(review.created_at)}
              </Text>
            </View>
          </View>
        )}

        <Pressable onPress={() => router.push(`/place/${review.place_id}`)}>
          <Text variant="headline" style={styles.placeName}>
            {review.place?.name ?? 'Unknown Place'}
          </Text>
        </Pressable>

        <View style={styles.scoreRow}>
          <Text variant="title3" color={colors.accentGold}>
            {formatScore(review.overall_score)}
          </Text>
          <StarRating rating={review.overall_score / 2} />
        </View>

        {review.notes && (
          <Text
            variant="body"
            color={colors.textSecondary}
            numberOfLines={3}
            style={styles.notes}
          >
            {review.ai_summary ?? review.notes}
          </Text>
        )}

        {review.review_items.length > 0 && (
          <View style={styles.itemsRow}>
            {review.review_items.slice(0, 3).map((item) => (
              <Badge
                key={item.id}
                label={item.name}
                variant={item.category === 'dish' ? 'gold' : 'rose'}
              />
            ))}
            {review.review_items.length > 3 && (
              <Badge
                label={`+${review.review_items.length - 3}`}
                variant="default"
              />
            )}
          </View>
        )}
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  placeName: {
    marginBottom: spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  notes: {
    marginBottom: spacing.md,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
