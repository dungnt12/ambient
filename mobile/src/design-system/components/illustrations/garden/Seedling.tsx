import Svg, { Line, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Seedling({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  const brand = theme.colors.brand;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* soil line */}
      <Line
        x1={18}
        y1={46}
        x2={42}
        y2={46}
        stroke={theme.colors.fgFaint}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* stem */}
      <Line
        x1={30}
        y1={46}
        x2={30}
        y2={26}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* left leaf */}
      <Path
        d="M30 30 C22 28 17 23 18 17 C24 18 29 22 30 30Z"
        fill={theme.colors.bgMuted}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* right leaf */}
      <Path
        d="M30 26 C38 24 43 19 42 13 C36 14 31 18 30 26Z"
        fill={brand}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
