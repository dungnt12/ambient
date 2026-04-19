export const palette = {
  surface: {
    parchment: '#f5f4ed',
    ivory: '#faf9f5',
    white: '#ffffff',
    sand: '#e8e6dc',
    dark: '#30302e',
    deepDark: '#141413',
  },
  brand: {
    terracotta: '#c96442',
    coral: '#d97757',
  },
  text: {
    nearBlack: '#141413',
    charcoal: '#4d4c48',
    olive: '#5e5d59',
    stone: '#87867f',
    warmSilver: '#b0aea5',
  },
  border: {
    cream: '#f0eee6',
    warm: '#e8e6dc',
    dark: '#30302e',
  },
  ring: {
    warm: '#d1cfc5',
    deep: '#c2c0b6',
  },
  semantic: {
    error: '#b53333',
    focusBlue: '#3898ec',
  },
  illo: {
    sage: '#9aa68a',
    sageSoft: '#bcc4ad',
    ochre: '#c4b68a',
    ochreSoft: '#dbd1ac',
    slate: '#9bb0c4',
    slateSoft: '#c0cfde',
    nutCap: '#6f5842',
    cloud: '#faf9f5',
  },
  // Per-illustration tint seeds. Garden cell background = seed @ 22% over parchment.
  illoTint: {
    sage: '#9aaf95',
    sand: '#b8926b',
    rose: '#c9b5a3',
    ochre: '#b8a57a',
    brand: '#c96442',
    coral: '#d97757',
  },
} as const;

export const colors = {
  bg: palette.surface.parchment,
  bgRaised: palette.surface.ivory,
  bgCard: palette.surface.white,
  bgMuted: palette.surface.sand,
  bgInverse: palette.surface.dark,

  fg: palette.text.nearBlack,
  fgMuted: palette.text.charcoal,
  fgSubtle: palette.text.olive,
  fgFaint: palette.text.stone,
  fgGhost: palette.text.warmSilver,
  fgOnBrand: palette.surface.ivory,

  brand: palette.brand.terracotta,
  brandSoft: palette.brand.coral,

  borderSoft: palette.border.cream,
  border: palette.border.warm,
  borderStrong: palette.border.dark,

  ringSoft: palette.ring.warm,
  ringStrong: palette.ring.deep,

  error: palette.semantic.error,
  focus: palette.semantic.focusBlue,

  illoSage: palette.illo.sage,
  illoSageSoft: palette.illo.sageSoft,
  illoOchre: palette.illo.ochre,
  illoOchreSoft: palette.illo.ochreSoft,
  illoSlate: palette.illo.slate,
  illoSlateSoft: palette.illo.slateSoft,
  illoNutCap: palette.illo.nutCap,
  illoCloud: palette.illo.cloud,
} as const;

export type ColorToken = keyof typeof colors;
