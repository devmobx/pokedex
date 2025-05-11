import { Theme } from '../types/theme';

export const size: Theme['size'] = {
  icon: {
    xs: 18,
    sm: 20,
    md: 25,
    lg: 30,
    xl: 40,
  },
  font: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  },
  border: {
    xs: 1,
  },
} as const;
