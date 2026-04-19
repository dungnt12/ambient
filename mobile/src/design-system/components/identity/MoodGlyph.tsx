import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import type { ColorToken } from '../../tokens/colors';
import type { MoodLevel } from './types';

export type MoodGlyphProps = {
  mood: MoodLevel;
  selected?: boolean;
  /** Width in px. Height is derived from the Figma viewBox ratio. */
  size?: number;
  /** Overrides the stroke color. Defaults: brand (selected) / fgGhost (idle). */
  color?: ColorToken;
};

// Paths copied verbatim from Figma node 112:15 (Identity / MoodGlyph).
// Do NOT modify by hand — re-export from Figma if the source changes.
type MoodSpec = {
  viewBoxWidth: number;
  viewBoxHeight: number;
  d: string;
  rays?: readonly { d: string }[];
};

const RAY_STROKE = 1.5;

const MOOD_SPECS: Record<MoodLevel, MoodSpec> = {
  1: {
    viewBoxWidth: 60,
    viewBoxHeight: 20,
    d: 'M3 3.5C18 3.5 25 14.5 57 16.5',
  },
  2: {
    viewBoxWidth: 60,
    viewBoxHeight: 20,
    d: 'M2 10C10 18 20 18 30 10C40 2 50 2 58 10',
  },
  3: {
    viewBoxWidth: 62,
    viewBoxHeight: 20,
    d: 'M1 10C8.5 -17 23.5 37 31 10C38.5 -17 53.5 37 61 10',
  },
  4: {
    viewBoxWidth: 60,
    viewBoxHeight: 20,
    d: 'M3 5.5C15 17.5 45 17.5 57 5.5',
  },
  5: {
    viewBoxWidth: 60,
    viewBoxHeight: 24,
    d: 'M3 9.75C15 26.75 45 26.75 57 9.75',
    rays: [{ d: 'M15 5.75V2.75' }, { d: 'M30 4.75V0.75' }, { d: 'M45 5.75V2.75' }],
  },
};

const DEFAULT_WIDTH = 60;

export function MoodGlyph({ mood, selected = false, size = DEFAULT_WIDTH, color }: MoodGlyphProps) {
  const theme = useTheme();
  const spec = MOOD_SPECS[mood];
  const width = size;
  const height = (size * spec.viewBoxHeight) / spec.viewBoxWidth;
  const stroke = color ? theme.colors[color] : selected ? theme.colors.brand : theme.colors.fgGhost;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${spec.viewBoxWidth} ${spec.viewBoxHeight}`}
      fill="none"
    >
      <Path
        d={spec.d}
        stroke={stroke}
        strokeWidth={theme.stroke.glyph}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {spec.rays?.map((ray, index) => (
        <Path
          key={index}
          d={ray.d}
          stroke={stroke}
          strokeWidth={RAY_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
