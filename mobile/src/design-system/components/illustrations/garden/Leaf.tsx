import Svg, { Line, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Leaf({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M14 46 C14 28 28 14 46 14 C46 32 32 46 14 46Z"
        fill={theme.colors.bgMuted}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* central vein */}
      <Line
        x1={16}
        y1={44}
        x2={44}
        y2={16}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* small vein */}
      <Line
        x1={22}
        y1={38}
        x2={30}
        y2={34}
        stroke={theme.colors.fgFaint}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Line
        x1={28}
        y1={32}
        x2={36}
        y2={28}
        stroke={theme.colors.fgFaint}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
