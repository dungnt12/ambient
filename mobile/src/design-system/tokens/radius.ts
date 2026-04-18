export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  pill: 999,
  card: 24,
  sheet: 32,
  button: 16,
  buttonPill: 28,
  input: 16,
} as const;

export type RadiusToken = keyof typeof radius;
