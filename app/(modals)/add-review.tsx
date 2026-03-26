import React from 'react';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { ReviewForm } from '@/features/reviews/components/ReviewForm';
import { useCreateReview } from '@/features/reviews/hooks/useCreateReview';
import { useDraftStore } from '@/stores/draft.store';
import { useAuthStore } from '@/stores/auth.store';
import { colors, spacing } from '@/design-system/tokens';

export default function AddReviewModal() {
  const draft = useDraftStore((s) => s.draft);
  const user = useAuthStore((s) => s.user);
  const createReview = useCreateReview();

  const canPublish = !!draft.placeId && !!draft.overallScore && draft.overallScore > 0 && !!user?.id;

  const handlePublish = () => {
    if (!draft.placeId || !draft.overallScore || !user?.id) return;

    createReview.mutate(
      {
        review: {
          place_id: draft.placeId,
          user_id: user.id,
          overall_score: draft.overallScore,
          notes: draft.notes ?? null,
          visit_date: draft.visitDate ?? new Date().toISOString().split('T')[0],
          is_private: draft.isPrivate,
        },
        items: draft.items.map((item) => ({
          name: item.name,
          category: item.category,
          score: item.score ?? null,
          notes: item.notes ?? null,
        })),
        photoUris: draft.photoUris,
      },
      {
        onSuccess: () => {
          router.back();
        },
        onError: (err) => {
          Alert.alert('Error', err.message);
        },
      }
    );
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
        <Text variant="headline">New Review</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <ReviewForm />

        <Button
          title="Publish Review"
          variant="primary"
          size="lg"
          style={styles.publishButton}
          onPress={handlePublish}
          loading={createReview.isPending}
          disabled={!canPublish}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  publishButton: {
    marginTop: spacing.lg,
  },
});
