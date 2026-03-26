import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeDate, formatScore } from '@/utils/format';
import { useLikeStatus, useToggleLike } from '@/features/reviews/hooks/useLikes';
import { haptics } from '@/design-system/haptics';
import { colors, spacing } from '@/design-system/tokens';
import type { ReviewFull } from '@/types/database';

interface ReviewCardProps {
  review: ReviewFull;
  showUser?: boolean;
}

export function ReviewCard({ review, showUser = true }: ReviewCardProps) {
  const { isLiked, count } = useLikeStatus(review.id);
  const toggleLike = useToggleLike(review.id);

  const handleLike = () => {
    haptics.light();
    toggleLike.mutate();
  };

  return (
    <Pressable
      onPress={() => router.push(`/review/${review.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`Review of ${review.place?.name ?? 'a place'}, score ${review.overall_score}`}
    >
      <GlassCard>
        {showUser && (
          <View style={styles.userRow}>
            <Avatar uri={review.user?.avatar_url} size="sm" />
            <View style={styles.userInfo}>
              <Text variant="subhead">
                {review.user?.display_name ?? review.user?.username ?? 'Anonymous'}
              </Text>
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

        <View style={styles.likeRow}>
          <Pressable
            onPress={handleLike}
            hitSlop={8}
            style={styles.likeButton}
            accessibilityRole="button"
            accessibilityLabel={isLiked ? 'Unlike this review' : 'Like this review'}
          >
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={18}
              color={isLiked ? colors.accentRose : colors.textTertiary}
            />
            {count > 0 && (
              <Text
                variant="caption1"
                color={isLiked ? colors.accentRose : colors.textTertiary}
              >
                {count}
              </Text>
            )}
          </Pressable>
        </View>
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
  likeRow: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
