import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Leaf({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        d="M46 12 C32 16 22 28 16 46 C30 44 40 32 46 12 Z"
        fill={t.colors.illoSageSoft}
        stroke={t.colors.illoSage}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M44 14 L18 44" stroke={t.colors.illoSage} strokeWidth={1.25} strokeLinecap="round" />
    </Svg>
  );
}
