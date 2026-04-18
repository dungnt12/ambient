import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { MOOD_LEVEL_TO_NAME, MOOD_PATHS, type MoodLevel } from './types';

export type MoodGlyphProps = {
  mood: MoodLevel;
  selected?: boolean;
  size?: number;
};

export function MoodGlyph({ mood, selected = false, size }: MoodGlyphProps) {
  const theme = useTheme();
  const resolvedSize = size ?? theme.iconSize.lg;
  const stroke = selected ? theme.colors.brand : theme.colors.fgGhost;
  const d = MOOD_PATHS[MOOD_LEVEL_TO_NAME[mood]];

  return (
    <Svg width={resolvedSize} height={resolvedSize} viewBox="0 0 24 24" fill="none">
      <Path
        d={d}
        stroke={stroke}
        strokeWidth={theme.stroke.glyph}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
