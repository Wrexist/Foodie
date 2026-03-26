import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { colors, spacing, radii } from '@/design-system/tokens';
import { haptics } from '@/design-system/haptics';

interface ScoreInputProps {
  value: number;
  onChange: (score: number) => void;
  max?: number;
}

export function ScoreInput({ value, onChange, max = 10 }: ScoreInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Array.from({ length: max }).map((_, i) => {
          const score = i + 1;
          const isSelected = score <= value;
          const isCurrent = score === value;

          return (
            <Pressable
              key={score}
              onPress={() => {
                haptics.selection();
                onChange(score);
              }}
              style={[
                styles.dot,
                isSelected && styles.dotSelected,
                isCurrent && styles.dotCurrent,
              ]}
            >
              <Text
                variant="caption1"
                color={isSelected ? colors.background : colors.textTertiary}
                style={{ fontWeight: isCurrent ? '700' : '400' }}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.labels}>
        <Text variant="caption2" color={colors.textTertiary}>Not great</Text>
        <Text variant="caption2" color={colors.textTertiary}>Exceptional</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.glassStroke,
  },
  dotSelected: {
    backgroundColor: colors.accentGold,
    borderColor: colors.accentGold,
  },
  dotCurrent: {
    transform: [{ scale: 1.15 }],
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
