import { palette } from '../../../tokens/colors';
import type { GardenIllustrationName } from './index';

const CELL_TINT_ALPHA = 0.22;

// Seed color per illustration. Garden cell background is this seed at CELL_TINT_ALPHA,
// which lets every cell carry a hint of its illustration while staying soft & cohesive.
const ILLUSTRATION_TINT_SEED: Record<GardenIllustrationName, string> = {
  seedling: palette.illoTint.sage,
  leaf: palette.illoTint.rose,
  sun: palette.illoTint.sand,
  cloud: palette.illoTint.brand,
  moon: palette.illoTint.ochre,
  petal: palette.illoTint.ochre,
  stone: palette.illoTint.sage,
  drop: palette.illoTint.rose,
  spark: palette.illoTint.brand,
  crescent: palette.illoTint.brand,
  fern: palette.illoTint.coral,
  acorn: palette.illoTint.ochre,
};

function hexToRgba(hex: string, alpha: number): string {
  const v = hex.replace('#', '');
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getGardenCellTint(name: GardenIllustrationName): string {
  return hexToRgba(ILLUSTRATION_TINT_SEED[name], CELL_TINT_ALPHA);
}
