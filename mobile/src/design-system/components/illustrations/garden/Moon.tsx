import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Moon({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M36 12 C26 18 22 34 30 48 C20 46 14 36 14 26 C14 18 22 12 30 12 C32 12 34 12 36 12 Z"
        fill={t.colors.illoOchre}
      />
      <Circle cx={34} cy={20} r={1.2} fill={t.colors.illoOchreSoft} />
    </Svg>
  );
}
