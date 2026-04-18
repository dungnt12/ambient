import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Spark({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M30 8 L33 27 L50 30 L33 33 L30 52 L27 33 L10 30 L27 27 Z"
        fill={theme.colors.brand}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Circle cx={46} cy={14} r={1.8} fill={theme.colors.brandSoft} />
      <Circle cx={14} cy={46} r={1.2} fill={theme.colors.fgFaint} />
    </Svg>
  );
}
