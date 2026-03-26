import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, spacing, shadows, animation } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';
import { Text } from '@/components/ui/Text';

const TAB_ITEMS = [
  { name: 'index', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'journal', label: 'Journal', icon: 'book-outline', activeIcon: 'book' },
  { name: 'add', label: 'Add', icon: 'add', activeIcon: 'add' },
  { name: 'map', label: 'Map', icon: 'map-outline', activeIcon: 'map' },
  { name: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
] as const;

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const fabScale = useSharedValue(1);

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const handleTabPress = (index: number, routeName: string) => {
    if (routeName === 'add') {
      haptics.medium();
      router.push('/(modals)/add-review');
      return;
    }

    haptics.selection();
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index >= 2 ? index - 1 : index]?.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      const tabRoute = state.routes[index >= 2 ? index - 1 : index];
      if (tabRoute) {
        navigation.navigate(tabRoute.name);
      }
    }
  };

  const getActiveIndex = () => {
    const activeIndex = state.index;
    return activeIndex >= 2 ? activeIndex + 1 : activeIndex;
  };

  const activeTabIndex = getActiveIndex();

  const content = (
    <View style={styles.tabRow}>
      {TAB_ITEMS.map((tab, index) => {
        if (tab.name === 'add') {
          return (
            <Pressable
              key={tab.name}
              style={styles.fabContainer}
              onPress={() => handleTabPress(index, tab.name)}
              onPressIn={() => {
                fabScale.value = withSpring(0.9, animation.spring);
              }}
              onPressOut={() => {
                fabScale.value = withSpring(1, animation.spring);
              }}
              accessibilityRole="button"
              accessibilityLabel="Create new review"
            >
              <Animated.View style={[styles.fab, fabAnimatedStyle]}>
                <Ionicons name="add" size={28} color={colors.background} />
              </Animated.View>
            </Pressable>
          );
        }

        const isActive = activeTabIndex === index;

        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => handleTabPress(index, tab.name)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? colors.accentGold : colors.textTertiary}
            />
            <Text
              variant="caption1"
              color={isActive ? colors.accentGold : colors.textTertiary}
              style={styles.tabLabel}
            >
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeDot} />}
          </Pressable>
        );
      })}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={80} tint="dark" style={styles.container}>
        {content}
      </BlurView>
    );
  }

  return <View style={[styles.container, styles.androidBg]}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: colors.glassStroke,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  androidBg: {
    backgroundColor: colors.surface,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 56,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabLabel: {
    marginTop: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accentGold,
    marginTop: 3,
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.gold,
  },
});
