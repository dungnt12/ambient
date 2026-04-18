import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Crescent({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M22 12 C32 18 34 40 22 48 C28 47 34 45 39 40 C44 35 46 28 44 22 C42 16 35 12 22 12 Z"
        fill={theme.colors.brand}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Circle cx={46} cy={16} r={1.5} fill={theme.colors.brandSoft} />
    </Svg>
  );
}
