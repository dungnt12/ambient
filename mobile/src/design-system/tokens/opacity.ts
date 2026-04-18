export const opacity = {
  full: 1,
  pressed: 0.85,
  pressedSubtle: 0.7,
  pressedGhost: 0.6,
  disabled: 0.4,
} as const;

export type OpacityToken = keyof typeof opacity;
