import { Text, type TextProps } from './Text';

export type HeadingProps = Omit<TextProps, 'variant'> & {
  variant?: 'displayHero' | 'headingSection' | 'headingSubLarge' | 'headingSub' | 'headingFeature';
};

/**
 * Heading — thin wrapper around Text for heading variants with defaults tuned
 * for narrow devices (iPhone SE / mini) and Vietnamese diacritics: shrink-to-fit
 * rather than clip, capped at 2 lines. All defaults are overridable.
 */
export function Heading({
  variant = 'headingSection',
  numberOfLines = 2,
  adjustsFontSizeToFit = true,
  minimumFontScale = 0.85,
  ...rest
}: HeadingProps) {
  return (
    <Text
      variant={variant}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}
      {...rest}
    />
  );
}
