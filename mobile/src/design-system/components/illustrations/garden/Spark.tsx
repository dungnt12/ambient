import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

export function Spark({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path d="M30 8 L32 28 L52 30 L32 32 L30 52 L28 32 L8 30 L28 28 Z" fill={t.colors.brandSoft} />
    </Svg>
  );
}
