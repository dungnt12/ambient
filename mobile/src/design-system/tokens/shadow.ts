import type { ViewStyle } from 'react-native';
import { palette } from './colors';

type Shadow = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

export const shadow = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  ringSoft: {
    shadowColor: palette.ring.warm,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  ringMedium: {
    shadowColor: palette.ring.deep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 3,
  },
  ringDeep: {
    shadowColor: palette.surface.deepDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 8,
  },
} satisfies Record<string, Shadow>;

export type ShadowToken = keyof typeof shadow;
