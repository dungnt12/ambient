import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Crescent({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M20 12 C36 18 38 42 20 48 C30 46 40 38 40 30 C40 22 30 14 20 12 Z"
        fill={t.colors.illoOchreSoft}
      />
    </Svg>
  );
}
