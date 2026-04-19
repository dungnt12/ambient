import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Crescent({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M20 12 C22 12 42 26 42 30 C42 34 22 48 20 48 C26 42 30 36 30 30 C30 24 26 18 20 12 Z"
        fill={t.colors.illoOchreSoft}
      />
    </Svg>
  );
}
