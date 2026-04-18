export const iconSize = {
  xs: 12,
  sm: 14,
  base: 16,
  social: 18,
  md: 20,
  tab: 22,
  lg: 24,
} as const;

export type IconSizeToken = keyof typeof iconSize;
