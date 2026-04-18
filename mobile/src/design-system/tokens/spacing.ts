export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  section: 32,
  screen: 24,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export type SpacingToken = keyof typeof spacing;

export const layout = {
  screenPaddingX: spacing.xl,
  sectionGap: spacing.xxl,
  ctaHeight: 60,
  inputHeight: 56,
  tabBarHeight: 68,
  headerHeight: 56,
  maxContentWidth: 640,
} as const;
