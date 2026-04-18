import Svg, { Circle, Ellipse } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Petal({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  const petalFill = theme.colors.brandSoft;
  const offsets: [number, number][] = [
    [30, 18],
    [42, 30],
    [30, 42],
    [18, 30],
  ];
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {offsets.map(([cx, cy], i) => (
        <Ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={i % 2 === 0 ? 6 : 8}
          ry={i % 2 === 0 ? 8 : 6}
          fill={petalFill}
          stroke={stroke}
          strokeWidth={1.5}
        />
      ))}
      <Circle cx={30} cy={30} r={4} fill={theme.colors.brand} stroke={stroke} strokeWidth={1.5} />
    </Svg>
  );
}
