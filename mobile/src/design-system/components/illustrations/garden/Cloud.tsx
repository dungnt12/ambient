import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Cloud({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M16 40 C12 40 11 36 14 34 C13 29 18 27 21 30 C22 24 30 22 34 27 C37 23 44 25 44 31 C48 31 49 35 46 38 C45 40 43 40 42 40 Z"
        fill={t.colors.illoCloud}
      />
    </Svg>
  );
}
