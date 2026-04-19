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
        y2={16}
        stroke={t.colors.illoNutCap}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M22 18 C22 16 26 15 30 15 C34 15 38 16 38 18 C38 22 34 24 30 24 C26 24 22 22 22 18 Z"
        fill={t.colors.illoNutCap}
      />
      <Path
        d="M22 24 C22 36 25 50 30 50 C35 50 38 36 38 24 C34 25 26 25 22 24 Z"
        fill={t.colors.brandSoft}
      />
    </Svg>
  );
}
