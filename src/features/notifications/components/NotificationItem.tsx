import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/components/ui/GlassCard';
import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { formatRelativeDate } from '@/utils/format';
import { haptics } from '@/design-system/haptics';
import { colors, spacing } from '@/design-system/tokens';
import type { NotificationRow } from '@/types/database';

interface NotificationItemProps {
  notification: NotificationRow & {
    actor?: { id: string; display_name: string; username: string; avatar_url: string | null } | null;
  };
  onMarkRead: (id: string) => void;
}

const TYPE_ICONS: Record<string, { name: keyof typeof Ionicons.glyphMap; color: string }> = {
  follow: { name: 'person-add-outline', color: colors.accentGold },
  like: { name: 'heart-outline', color: colors.accentRose },
  comment: { name: 'chatbubble-outline', color: colors.accentSage },
  recommendation: { name: 'sparkles-outline', color: colors.accentGold },
};

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const typeConfig = TYPE_ICONS[notification.type] ?? TYPE_ICONS.follow;

  const handlePress = () => {
    haptics.light();
    if (!notification.is_read) {
      onMarkRead(notification.id);
    }

    switch (notification.type) {
      case 'follow':
        if (notification.actor_id) router.push(`/user/${notification.actor_id}`);
        break;
      case 'like':
      case 'comment':
        if (notification.target_id) router.push(`/review/${notification.target_id}`);
        break;
      case 'recommendation':
        if (notification.target_id) router.push(`/place/${notification.target_id}`);
        break;
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <GlassCard style={styles.card}>
        <View style={styles.row}>
          {notification.actor ? (
            <Avatar uri={notification.actor.avatar_url} size="sm" />
          ) : (
            <View style={styles.iconCircle}>
              <Ionicons name={typeConfig.name} size={18} color={typeConfig.color} />
            </View>
          )}
          <View style={styles.content}>
            <Text variant="subhead" numberOfLines={2}>
              {notification.message}
            </Text>
            <Text variant="caption1" color={colors.textTertiary}>
              {formatRelativeDate(notification.created_at)}
            </Text>
          </View>
          {!notification.is_read && <View style={styles.unreadDot} />}
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accentGold,
  },
});
