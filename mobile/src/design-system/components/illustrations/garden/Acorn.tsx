import Svg, { Line, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Acorn({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Line
        x1={30}
        y1={10}
        x2={30}
        y2={18}
        stroke={t.colors.illoNutCap}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M19 22 C19 19 24 17 30 17 C36 17 41 19 41 22 C41 26 36 28 30 28 C24 28 19 26 19 22 Z"
        fill={t.colors.illoNutCap}
      />
      <Path
        d="M20 26 C20 38 24 50 30 50 C36 50 40 38 40 26 C35 27 25 27 20 26 Z"
        fill={t.colors.brandSoft}
      />
    </Svg>
  );
}
