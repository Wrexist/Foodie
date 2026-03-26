import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import type { MapPin } from '../hooks/useMapPins';
import { formatScore } from '@/utils/format';
import { colors, spacing } from '@/design-system/tokens';

interface PinCalloutProps {
  pin: MapPin;
}

export function PinCallout({ pin }: PinCalloutProps) {
  return (
    <View style={styles.container}>
      <Text variant="subhead" style={styles.name}>
        {pin.name}
      </Text>
      <View style={styles.row}>
        <Badge
          label={pin.type === 'visited' ? 'Visited' : 'Want to go'}
          variant={pin.type === 'visited' ? 'gold' : 'rose'}
        />
        {pin.averageScore !== undefined && (
          <Text variant="caption1" color={colors.accentGold}>
            {formatScore(pin.averageScore)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
    minWidth: 140,
    gap: spacing.xs,
  },
  name: {
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
