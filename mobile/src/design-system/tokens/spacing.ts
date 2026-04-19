export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  screen: 24,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export type SpacingToken = keyof typeof spacing;

export const layout = {
  screenPaddingX: spacing.xl,
  sectionGap: spacing.xxl,
  ctaHeight: 60,
  inputHeight: 56,
  tabBarHeight: 68,
  headerHeight: 56,
  segmentHeight: 36,
  memberSignalHeight: 120,
  inlineButtonHeight: 44,
  profileCardHeight: 96,
  avatarSm: 32,
  avatarMd: 48,
  avatarOverlap: 20,
  avatarOverlapTight: 14,
  moodDot: 26,
  illustrationSlot: 120,
  timelineGutter: 24,
  timelineDot: 10,
  rowHeight: 56,
  maxContentWidth: 640,
  sheetSwipeActivation: 8,
  sheetSwipeHorizontalFail: 20,
} as const;

// Semantic rhythm contract — screens MUST use these for cards/rows/headers/
// sheets rather than picking raw spacing tokens ad-hoc. Changing these values
// changes the whole app's rhythm in one place.
export const rhythm = {
  inner: spacing.md, // gap INSIDE a card/row (between sub-blocks)
  card: {
    padH: spacing.md, // card horizontal padding
    padV: spacing.md, // card vertical padding
    gap: spacing.md, // gap between items inside the card
  },
  row: {
    padH: spacing.lg, // list row horizontal padding
    padV: spacing.md, // list row vertical padding
    gap: spacing.md, // gap between icon/text/chevron inside a row
  },
  list: spacing.lg, // gap between cards/rows in a stream
  section: spacing.xxl, // gap between sections within a screen
  screen: spacing.xl, // horizontal screen padding (alias of layout.screenPaddingX)
  header: {
    padTop: spacing.base, // header paddingTop under status bar
    gap: spacing.md, // gap between title and subtitle
  },
  sheet: {
    pad: spacing.xl, // bottom-sheet content padding
    gap: spacing.lg, // gap between stacked blocks in sheet
  },
} as const;

export type RhythmToken = typeof rhythm;
