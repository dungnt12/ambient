import { View } from 'react-native';
import { Mark } from './Mark';
import { Wordmark } from './Wordmark';
import { useTheme } from '../theme';

export type LogoProps = {
  layout?: 'horizontal' | 'stacked';
  markSize?: number;
  wordmarkSize?: number;
  tone?: 'light' | 'dark';
};

export function Logo({ layout = 'horizontal', markSize, wordmarkSize, tone = 'light' }: LogoProps) {
  const t = useTheme();
  const resolvedMarkSize = markSize ?? t.brand.mark.compact;
  const wmSize = wordmarkSize ?? resolvedMarkSize * t.brand.logo.wordmarkScale;

  if (layout === 'stacked') {
    return (
      <View style={{ alignItems: 'center', gap: t.spacing.md }}>
        <Mark size={resolvedMarkSize} tone={tone} />
        <Wordmark size={wmSize} tone={tone} />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: resolvedMarkSize * t.brand.logo.horizontalGapRatio,
      }}
    >
      <Mark size={resolvedMarkSize} tone={tone} />
      <Wordmark size={wmSize} tone={tone} />
    </View>
  );
}
