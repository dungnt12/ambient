import { colors, palette } from '../tokens/colors';
import { typography, fontFamily } from '../tokens/typography';
import { spacing, layout, rhythm } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { shadow } from '../tokens/shadow';
import { motion } from '../tokens/motion';
import { brand } from '../tokens/brand';
import { opacity } from '../tokens/opacity';
import { stroke } from '../tokens/stroke';
import { iconSize } from '../tokens/iconSize';

export const theme = {
  colors,
  palette,
  typography,
  fontFamily,
  spacing,
  layout,
  rhythm,
  radius,
  shadow,
  motion,
  brand,
  opacity,
  stroke,
  iconSize,
} as const;

export type Theme = typeof theme;
