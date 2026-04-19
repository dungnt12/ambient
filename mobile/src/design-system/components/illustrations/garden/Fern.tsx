import Svg, { Line, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

const LEAFLET_ROWS = [20, 28, 36, 44];

export function Fern({ size = 60 }: Props) {
  const t = useTheme();
  const sage = t.colors.illoSage;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Line x1={30} y1={12} x2={30} y2={50} stroke={sage} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M30 16 C28 14 28 12 30 10 C32 12 32 14 30 16 Z" fill={sage} />
      {LEAFLET_ROWS.map((y) => (
        <Path
          key={`l-${y}`}
          d={`M30 ${y} C24 ${y - 4} 19 ${y - 2} 16 ${y + 2} C22 ${y + 3} 27 ${y + 2} 30 ${y} Z`}
          fill={sage}
        />
      ))}
      {LEAFLET_ROWS.map((y) => (
        <Path
          key={`r-${y}`}
          d={`M30 ${y} C36 ${y - 4} 41 ${y - 2} 44 ${y + 2} C38 ${y + 3} 33 ${y + 2} 30 ${y} Z`}
          fill={sage}
        />
      ))}
    </Svg>
  );
}
