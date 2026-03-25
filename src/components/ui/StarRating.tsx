import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  interactive = false,
  onRate,
}: StarRatingProps) {
  const handlePress = (star: number) => {
    haptics.selection();
    onRate?.(star);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starNumber = i + 1;
        const filled = starNumber <= rating;
        const half = !filled && starNumber - 0.5 <= rating;

        const icon = filled
          ? 'star'
          : half
            ? 'star-half'
            : 'star-outline';

        if (interactive) {
          return (
            <Pressable
              key={i}
              onPress={() => handlePress(starNumber)}
              hitSlop={4}
            >
              <Ionicons
                name={icon}
                size={size}
                color={colors.accentGold}
                style={styles.star}
              />
            </Pressable>
          );
        }

        return (
          <Ionicons
            key={i}
            name={icon}
            size={size}
            color={colors.accentGold}
            style={styles.star}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
});
