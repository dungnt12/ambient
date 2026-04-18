import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme } from '../theme';
import type { TypographyVariant } from '../tokens/typography';
import type { ColorToken } from '../tokens/colors';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  color?: ColorToken;
  align?: TextStyle['textAlign'];
};

// Cap font scaling on layout-sensitive variants (buttons, labels) so iOS
// "Larger Text" accessibility doesn't break fixed-height CTAs. Body/heading
// variants intentionally omitted — they must respect system scale fully.
const DEFAULT_MAX_FONT_SIZE_MULTIPLIER: Partial<Record<TypographyVariant, number>> = {
  buttonLabel: 1.3,
  buttonLabelSocial: 1.3,
  label: 1.3,
  overline: 1.3,
};

export function Text({
  variant = 'bodyStandard',
  color = 'fg',
  align,
  style,
  maxFontSizeMultiplier,
  ...rest
}: TextProps) {
  const t = useTheme();
  const resolvedMax =
    maxFontSizeMultiplier !== undefined
      ? maxFontSizeMultiplier
      : DEFAULT_MAX_FONT_SIZE_MULTIPLIER[variant];
  return (
    <RNText
      {...rest}
      maxFontSizeMultiplier={resolvedMax}
      style={[
        t.typography[variant],
        { color: t.colors[color] },
        align ? { textAlign: align } : null,
        style,
      ]}
    />
  );
}
