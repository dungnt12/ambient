export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type MoodName = 'rat-te' | 'khong-on' | 'binh-thuong' | 'on' | 'rat-on';

export const MOOD_LEVEL_TO_NAME: Record<MoodLevel, MoodName> = {
  1: 'rat-te',
  2: 'khong-on',
  3: 'binh-thuong',
  4: 'on',
  5: 'rat-on',
};

export const MOOD_PATHS: Record<MoodName, string> = {
  'rat-te': 'M6 14 C9 10, 15 10, 18 14',
  'khong-on': 'M5 13 C8.5 11, 15.5 11, 19 13',
  'binh-thuong': 'M5 12.5 H19',
  on: 'M5 12 C8.5 14, 15.5 14, 19 12',
  'rat-on': 'M6 10 C9 14, 15 14, 18 10',
};
