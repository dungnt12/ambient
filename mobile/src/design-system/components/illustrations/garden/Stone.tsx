import Svg, { Ellipse, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Stone({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Ellipse cx={30} cy={32} rx={15} ry={9} fill={t.colors.illoOchre} />
      <Path
        d="M20 28 C24 26 30 25 34 26"
        stroke={t.colors.illoOchreSoft}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </Svg>
  );
}
