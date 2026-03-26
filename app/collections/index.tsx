import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { GlassSheet } from '@/components/ui/GlassSheet';
import { Text } from '@/components/ui/Text';
import { CollectionCard } from '@/components/shared/CollectionCard';
import { useCollections, useCreateCollection } from '@/features/collections/hooks/useCollections';
import { useAuthStore } from '@/stores/auth.store';
import { Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii } from '@/design-system/tokens';

export default function CollectionsScreen() {
  const { data: collections, isLoading } = useCollections();
  const createCollection = useCreateCollection();
  const user = useAuthStore((s) => s.user);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCreate = () => {
    if (!newName.trim() || !user) return;
    createCollection.mutate(
      {
        user_id: user.id,
        name: newName.trim(),
        description: newDescription.trim() || null,
        is_public: true,
      } as any,
      {
        onSuccess: () => {
          setShowCreate(false);
          setNewName('');
          setNewDescription('');
        },
        onError: (err) => Alert.alert('Error', err.message),
      }
    );
  };

  const renderItem = useCallback(({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <CollectionCard collection={item} placeCount={item.place_count ?? 0} />
    </View>
  ), []);

  if (isLoading) {
    return (
      <Screen>
        <Header title="Collections" showBack />
        <View style={styles.loadingContainer}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} width="100%" height={80} radius={radii.card} />
          ))}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Collections"
        showBack
        rightAction={
          <Pressable onPress={() => setShowCreate(true)}>
            <Ionicons name="add" size={28} color={colors.accentGold} />
          </Pressable>
        }
      />
      <FlatList
        data={collections ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="grid-outline"
            title="No collections yet"
            subtitle="Organize your favorite places into curated collections"
            actionTitle="Create Collection"
            onAction={() => setShowCreate(true)}
          />
        }
      />

      <Modal visible={showCreate} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={() => setShowCreate(false)} />
        <View style={styles.sheetContainer}>
          <GlassSheet>
            <Text variant="title3" style={styles.sheetTitle}>
              New Collection
            </Text>
            <Input
              label="Name"
              placeholder="Collection name"
              value={newName}
              onChangeText={setNewName}
              autoFocus
            />
            <Input
              label="Description (optional)"
              placeholder="What's this collection about?"
              value={newDescription}
              onChangeText={setNewDescription}
              multiline
              style={{ height: 60, textAlignVertical: 'top' }}
            />
            <View style={styles.sheetActions}>
              <Button title="Cancel" variant="ghost" size="md" onPress={() => setShowCreate(false)} />
              <Button
                title="Create"
                variant="primary"
                size="md"
                onPress={handleCreate}
                loading={createCollection.isPending}
                disabled={!newName.trim()}
              />
            </View>
          </GlassSheet>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  cardWrapper: {
    marginBottom: spacing.md,
  },
  loadingContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheetTitle: {
    marginBottom: spacing.lg,
  },
  sheetActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});
