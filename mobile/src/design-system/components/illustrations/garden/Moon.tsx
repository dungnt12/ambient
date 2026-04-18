import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Moon({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M36 12 C26 18 24 34 34 44 C24 42 16 34 16 24 C16 17 22 12 30 12 C32 12 34 12 36 12 Z"
        fill={theme.colors.brandSoft}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Circle cx={40} cy={16} r={1.4} fill={theme.colors.brand} />
      <Circle cx={46} cy={24} r={1} fill={theme.colors.fgFaint} />
    </Svg>
  );
}
