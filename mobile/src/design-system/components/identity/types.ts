export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type MoodName = 'rat-te' | 'khong-on' | 'binh-thuong' | 'on' | 'rat-on';

export const MOOD_LEVEL_TO_NAME: Record<MoodLevel, MoodName> = {
  1: 'rat-te',
  2: 'khong-on',
  3: 'binh-thuong',
  4: 'on',
  5: 'rat-on',
};
