import { Platform } from 'react-native';

export const colors = {
  background: '#0B0D10',
  surface: '#12141A',
  surfaceElevated: '#1A1D24',

  textPrimary: '#F7F8FA',
  textSecondary: 'rgba(247, 248, 250, 0.72)',
  textTertiary: 'rgba(247, 248, 250, 0.48)',
  textDisabled: 'rgba(247, 248, 250, 0.32)',

  glassFill: 'rgba(255, 255, 255, 0.08)',
  glassStroke: 'rgba(255, 255, 255, 0.12)',
  glassFillHover: 'rgba(255, 255, 255, 0.12)',

  accentGold: '#D7B46A',
  accentGoldMuted: 'rgba(215, 180, 106, 0.16)',
  accentRose: '#D96C84',
  accentRoseMuted: 'rgba(217, 108, 132, 0.16)',
  accentSage: '#89A883',
  accentSageMuted: 'rgba(137, 168, 131, 0.16)',

  error: '#E5484D',
  errorMuted: 'rgba(229, 72, 77, 0.16)',
  success: '#30A46C',
  successMuted: 'rgba(48, 164, 108, 0.16)',
  warning: '#F5A623',
  warningMuted: 'rgba(245, 166, 35, 0.16)',

  overlay: 'rgba(0, 0, 0, 0.6)',
  divider: 'rgba(255, 255, 255, 0.08)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  card: 24,
  sheet: 32,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  gold: {
    shadowColor: '#D7B46A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

const SF_PRO = Platform.select({
  ios: 'System',
  default: 'System',
});

export const typography = {
  largeTitle: {
    fontFamily: SF_PRO,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
  },
  title1: {
    fontFamily: SF_PRO,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
  },
  title2: {
    fontFamily: SF_PRO,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
  },
  title3: {
    fontFamily: SF_PRO,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },
  headline: {
    fontFamily: SF_PRO,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },
  body: {
    fontFamily: SF_PRO,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },
  callout: {
    fontFamily: SF_PRO,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },
  subhead: {
    fontFamily: SF_PRO,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  footnote: {
    fontFamily: SF_PRO,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
  },
  caption1: {
    fontFamily: SF_PRO,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption2: {
    fontFamily: SF_PRO,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.07,
  },
} as const;

export const animation = {
  fast: 150,
  normal: 250,
  slow: 400,
  spring: { damping: 20, stiffness: 300 },
} as const;

export const glass = {
  card: { intensity: 40, fill: 'rgba(255, 255, 255, 0.06)' },
  sheet: { intensity: 60, fill: 'rgba(255, 255, 255, 0.08)' },
  elevated: { intensity: 50, fill: 'rgba(255, 255, 255, 0.10)' },
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radii;
export type TypographyVariant = keyof typeof typography;
