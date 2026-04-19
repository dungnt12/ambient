import Svg, { Circle, G, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

const PETAL_D = 'M30 30 C26 24 26 18 30 12 C34 18 34 24 30 30 Z';

export function Petal({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <G key={deg} rotation={deg} originX={30} originY={30}>
          <Path d={PETAL_D} fill={t.colors.brandSoft} />
        </G>
      ))}
      <Circle cx={30} cy={30} r={3} fill={t.colors.brand} />
    </Svg>
  );
}
