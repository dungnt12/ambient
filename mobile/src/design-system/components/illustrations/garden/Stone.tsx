import Svg, { Ellipse } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Stone({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Ellipse cx={30} cy={32} rx={15} ry={9} fill={t.colors.illoOchre} />
    </Svg>
  );
}
