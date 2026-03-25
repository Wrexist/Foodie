import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '@/design-system/tokens';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string | null;
  size?: AvatarSize;
  showBorder?: boolean;
}

const sizes: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

export function Avatar({ uri, size = 'md', showBorder = false }: AvatarProps) {
  const s = sizes[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: s,
          height: s,
          borderRadius: s / 2,
        },
        showBorder && styles.border,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: s, height: s, borderRadius: s / 2 }}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <Ionicons
          name="person"
          size={s * 0.5}
          color={colors.textTertiary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.glassFill,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  border: {
    borderWidth: 2,
    borderColor: colors.accentGold,
  },
});
