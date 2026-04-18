export const stroke = {
  hair: 1,
  standard: 1.75,
  bold: 2,
  glyph: 1.6,
} as const;

export type StrokeToken = keyof typeof stroke;
