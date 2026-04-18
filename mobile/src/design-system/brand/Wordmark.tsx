import { Text as RNText, type TextStyle } from 'react-native';
import { useTheme } from '../theme';

export type WordmarkProps = {
  size?: number;
  tone?: 'light' | 'dark';
  style?: TextStyle;
};

export function Wordmark({ size, tone = 'light', style }: WordmarkProps) {
  const t = useTheme();
  const resolvedSize = size ?? t.brand.wordmark.defaultSize;
  return (
    <RNText
      style={[
        {
          fontFamily: t.fontFamily.wordmark,
          fontSize: resolvedSize,
          lineHeight: resolvedSize * t.brand.wordmark.lineHeightRatio,
          letterSpacing: resolvedSize * t.brand.wordmark.letterSpacingRatio,
          color: tone === 'dark' ? t.colors.bgRaised : t.colors.fg,
        },
        style,
      ]}
    >
      Ambient
    </RNText>
  );
}
