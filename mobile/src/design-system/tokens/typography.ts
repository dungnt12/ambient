import type { TextStyle } from 'react-native';

export const fontFamily = {
  serif: 'Fraunces_600SemiBold',
  serifRegular: 'Fraunces_400Regular',
  serifBold: 'Fraunces_700Bold',
  sans: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  sansSemibold: 'DMSans_600SemiBold',
  sansBold: 'DMSans_700Bold',
  mono: 'JetBrainsMono_400Regular',
  wordmark: 'Montserrat_800ExtraBold',
} as const;

type Variant = TextStyle & { fontFamily: string };

export const typography = {
  displayHero: {
    fontFamily: fontFamily.serifBold,
    fontSize: 48,
    lineHeight: 54,
    letterSpacing: -0.8,
  },
  headingSection: {
    fontFamily: fontFamily.serifBold,
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.6,
  },
  headingSubLarge: {
    fontFamily: fontFamily.serif,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  headingSub: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  headingFeature: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: 18,
    lineHeight: 24,
  },
  bodySerif: {
    fontFamily: fontFamily.serifRegular,
    fontSize: 18,
    lineHeight: 28,
  },
  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: 18,
    lineHeight: 26,
  },
  bodyStandard: {
    fontFamily: fontFamily.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  buttonLabel: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
    lineHeight: 20,
  },
  buttonLabelSocial: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: 15,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: 13,
    lineHeight: 20,
  },
  label: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  overline: {
    fontFamily: fontFamily.sansSemibold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontSize: 13,
    lineHeight: 20,
  },
} satisfies Record<string, Variant>;

export type TypographyVariant = keyof typeof typography;
