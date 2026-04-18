import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Stone({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M12 36 C12 28 20 20 30 20 C42 20 48 28 48 36 C48 42 40 44 30 44 C20 44 12 42 12 36 Z"
        fill={theme.colors.bgMuted}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* highlight */}
      <Path
        d="M18 30 C22 26 28 25 34 26"
        stroke={theme.colors.fgFaint}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
