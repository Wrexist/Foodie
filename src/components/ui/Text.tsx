import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, typography, type TypographyVariant } from '@/design-system/tokens';

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export function Text({
  variant = 'body',
  color = colors.textPrimary,
  align,
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[
        typography[variant],
        { color },
        align ? { textAlign: align } : undefined,
        style,
      ]}
      {...props}
    />
  );
}

export function Heading({
  variant = 'title1',
  style,
  ...props
}: Omit<TextProps, 'variant'> & { variant?: 'largeTitle' | 'title1' | 'title2' | 'title3' }) {
  return <Text variant={variant} {...props} style={style} />;
}
