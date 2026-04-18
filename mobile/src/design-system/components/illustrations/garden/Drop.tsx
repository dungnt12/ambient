import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Drop({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M30 10 C22 20 18 28 18 36 C18 43 23 48 30 48 C37 48 42 43 42 36 C42 28 38 20 30 10 Z"
        fill={theme.colors.brandSoft}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* shine */}
      <Path
        d="M26 30 C26 26 28 24 31 24"
        stroke={theme.colors.bgMuted}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
