import React from 'react';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { ScoreInput } from './ScoreInput';
import { PhotoUploader } from './PhotoUploader';
import { useDraftStore } from '@/stores/draft.store';
import { colors, spacing, typography } from '@/design-system/tokens';

export function ReviewForm() {
  const draft = useDraftStore((s) => s.draft);
  const updateDraft = useDraftStore((s) => s.updateDraft);

  return (
    <View style={styles.container}>
      <GlassCard>
        <Pressable
          style={styles.placeSelector}
          onPress={() => router.push('/(modals)/place-search')}
        >
          <Ionicons name="location-outline" size={24} color={colors.accentGold} />
          <Text
            variant="body"
            color={draft.placeName ? colors.textPrimary : colors.textSecondary}
            style={styles.flex}
          >
            {draft.placeName ?? 'Select a place...'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </Pressable>
      </GlassCard>

      <GlassCard>
        <Text variant="headline" style={styles.sectionTitle}>
          Overall Score
        </Text>
        <ScoreInput
          value={draft.overallScore ?? 0}
          onChange={(score) => updateDraft({ overallScore: score })}
        />
      </GlassCard>

      <GlassCard>
        <Text variant="headline" style={styles.sectionTitle}>
          Notes
        </Text>
        <TextInput
          style={styles.notesInput}
          placeholder="What made this visit memorable?"
          placeholderTextColor={colors.textTertiary}
          multiline
          value={draft.notes ?? ''}
          onChangeText={(text) => updateDraft({ notes: text })}
          selectionColor={colors.accentGold}
        />
      </GlassCard>

      <GlassCard>
        <Pressable
          style={styles.placeSelector}
          onPress={() => router.push('/(modals)/add-item')}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.accentGold} />
          <Text variant="body" style={styles.flex}>
            Add dishes & drinks
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </Pressable>
        {draft.items.length > 0 && (
          <View style={styles.itemsRow}>
            {draft.items.map((item, i) => (
              <Badge
                key={i}
                label={item.name}
                variant={item.category === 'dish' ? 'gold' : 'rose'}
              />
            ))}
          </View>
        )}
      </GlassCard>

      <GlassCard>
        <Text variant="headline" style={styles.sectionTitle}>
          Photos
        </Text>
        <PhotoUploader
          photos={draft.photoUris}
          onAdd={(uris) =>
            updateDraft({ photoUris: [...draft.photoUris, ...uris] })
          }
          onRemove={(index) =>
            updateDraft({
              photoUris: draft.photoUris.filter((_, i) => i !== index),
            })
          }
        />
      </GlassCard>

      <GlassCard>
        <Pressable
          style={styles.toggleRow}
          onPress={() => updateDraft({ isPrivate: !draft.isPrivate })}
        >
          <Ionicons
            name={draft.isPrivate ? 'lock-closed' : 'globe-outline'}
            size={22}
            color={colors.textSecondary}
          />
          <View style={styles.flex}>
            <Text variant="body">
              {draft.isPrivate ? 'Private' : 'Public'}
            </Text>
            <Text variant="caption1" color={colors.textTertiary}>
              {draft.isPrivate
                ? 'Only visible to you'
                : 'Visible to everyone'}
            </Text>
          </View>
          <Ionicons
            name={draft.isPrivate ? 'toggle' : 'toggle-outline'}
            size={28}
            color={draft.isPrivate ? colors.accentGold : colors.textTertiary}
          />
        </Pressable>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  placeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  notesInput: {
    ...typography.body,
    color: colors.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
