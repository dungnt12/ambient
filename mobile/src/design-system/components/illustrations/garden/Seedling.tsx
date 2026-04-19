import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Seedling({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path d="M30 48 L30 32" stroke={t.colors.illoSage} strokeWidth={2} strokeLinecap="round" />
      <Path
        d="M30 32 C25 31 20 27 18 20 C24 21 29 25 30 32 Z"
        fill={t.colors.illoSageSoft}
        stroke={t.colors.illoSage}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M30 30 C35 29 40 25 42 18 C36 19 31 23 30 30 Z"
        fill={t.colors.illoSage}
        stroke={t.colors.illoSage}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
