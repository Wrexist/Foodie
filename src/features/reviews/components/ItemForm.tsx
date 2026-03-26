import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Text } from '@/components/ui/Text';
import { ScoreInput } from './ScoreInput';
import { useDraftStore } from '@/stores/draft.store';
import { colors, spacing } from '@/design-system/tokens';

export function ItemForm() {
  const addItem = useDraftStore((s) => s.addItem);
  const [category, setCategory] = useState<'dish' | 'drink'>('dish');
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;

    addItem({
      name: name.trim(),
      category,
      score: score > 0 ? score : undefined,
      notes: notes.trim() || undefined,
      photoUris: [],
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryPicker}>
        <Pressable
          style={[
            styles.categoryButton,
            category === 'dish' && styles.categoryActive,
          ]}
          onPress={() => setCategory('dish')}
        >
          <Ionicons
            name="restaurant-outline"
            size={20}
            color={category === 'dish' ? colors.accentGold : colors.textSecondary}
          />
          <Text
            variant="subhead"
            color={category === 'dish' ? colors.accentGold : colors.textSecondary}
          >
            Dish
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.categoryButton,
            category === 'drink' && styles.categoryActive,
          ]}
          onPress={() => setCategory('drink')}
        >
          <Ionicons
            name="wine-outline"
            size={20}
            color={category === 'drink' ? colors.accentRose : colors.textSecondary}
          />
          <Text
            variant="subhead"
            color={category === 'drink' ? colors.accentRose : colors.textSecondary}
          >
            Drink
          </Text>
        </Pressable>
      </View>

      <Input
        label="Name"
        placeholder="What did you have?"
        value={name}
        onChangeText={setName}
      />

      <GlassCard>
        <Text variant="headline" style={styles.sectionTitle}>
          Rating (optional)
        </Text>
        <ScoreInput value={score} onChange={setScore} />
      </GlassCard>

      <Input
        label="Notes (optional)"
        placeholder="Any thoughts about this item?"
        multiline
        numberOfLines={3}
        value={notes}
        onChangeText={setNotes}
        style={{ height: 80, textAlignVertical: 'top' }}
      />

      <Button
        title="Add Item"
        variant="primary"
        size="lg"
        onPress={handleAdd}
        disabled={!name.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  categoryPicker: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.glassFill,
    borderWidth: 1,
    borderColor: colors.glassStroke,
  },
  categoryActive: {
    borderColor: colors.accentGold,
    backgroundColor: colors.accentGoldMuted,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
});
