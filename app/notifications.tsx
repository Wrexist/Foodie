import React, { useCallback } from 'react';
import { View, FlatList, Pressable, StyleSheet, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { NotificationItem } from '@/features/notifications/components/NotificationItem';
import {
  useNotifications,
  useMarkNotificationRead,
} from '@/features/notifications/hooks/useNotifications';
import { notificationsService } from '@/features/notifications/services/notifications.service';
import { useAuthStore } from '@/stores/auth.store';
import { useQueryClient } from '@tanstack/react-query';
import { haptics } from '@/design-system/haptics';
import { colors, spacing } from '@/design-system/tokens';

export default function NotificationsScreen() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useNotifications();
  const markRead = useMarkNotificationRead();

  const notifications = data?.pages.flatMap((p) => p.data) ?? [];

  const handleMarkAllRead = async () => {
    if (!user?.id) return;
    haptics.medium();
    await notificationsService.markAllAsRead(user.id);
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
    queryClient.invalidateQueries({ queryKey: ['unread-count'] });
  };

  const renderItem = useCallback(({ item }: { item: any }) => (
    <View style={styles.itemWrapper}>
      <NotificationItem
        notification={item}
        onMarkRead={(id) => markRead.mutate(id)}
      />
    </View>
  ), [markRead]);

  return (
    <Screen>
      <Header
        title="Notifications"
        showBack
        rightAction={
          <Pressable onPress={handleMarkAllRead} hitSlop={8}>
            <Ionicons name="checkmark-done-outline" size={22} color={colors.accentGold} />
          </Pressable>
        }
      />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.accentGold}
          />
        }
        ListHeaderComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </View>
          ) : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="notifications-outline"
              title="No notifications"
              subtitle="When someone interacts with your reviews, you'll see it here"
            />
          ) : null
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['5xl'],
  },
  itemWrapper: {
    marginBottom: spacing.sm,
  },
  loadingContainer: {
    gap: spacing.sm,
  },
});
