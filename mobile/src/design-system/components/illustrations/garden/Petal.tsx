import Svg, { Circle, Ellipse, G } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Petal({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <G key={deg} rotation={deg} originX={30} originY={30}>
          <Ellipse cx={30} cy={19} rx={5} ry={9} fill={t.colors.brandSoft} />
        </G>
      ))}
      <Circle cx={30} cy={30} r={3} fill={t.colors.brand} />
    </Svg>
  );
}
