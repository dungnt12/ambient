import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Drop({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M30 10 C22 22 18 30 18 38 C18 44 23 48 30 48 C37 48 42 44 42 38 C42 30 38 22 30 10 Z"
        fill={t.colors.illoSlate}
      />
      <Path
        d="M25 32 C25 28 27 26 29 26"
        stroke={t.colors.illoSlateSoft}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
