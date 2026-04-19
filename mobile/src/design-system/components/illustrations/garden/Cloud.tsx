import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Cloud({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M19 40 H44 C48 40 50 37 50 34 C50 30 47 28 43 28 C42 23 38 20 33 20 C28 20 24 23 23 28 C18 28 14 30 14 34 C14 37 16 40 19 40 Z"
        fill={t.colors.illoCloud}
      />
    </Svg>
  );
}
