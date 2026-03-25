import { createContext, useContext } from 'react';
import { colors, spacing, radii, shadows, typography } from './tokens';

export const theme = {
  colors,
  spacing,
  radii,
  shadows,
  typography,
} as const;

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ThemeContext.Provider;

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
