import { Easing } from 'react-native';

/**
 * Duration scale in milliseconds.
 * Keep UI transitions in the micro–quick range; reserve base/slow for
 * marketing/splash moments.
 */
export const duration = {
  instant: 80,
  micro: 120,
  quick: 180,
  base: 240,
  slow: 320,
  slower: 520,
  splash: 900,
} as const;

export type DurationToken = keyof typeof duration;

/**
 * Easing curves. "standard" for in-place mutations, "entrance" for mounts,
 * "exit" for unmounts, "emphasized" for hero moments.
 */
export const easing = {
  standard: Easing.bezier(0.2, 0, 0, 1),
  entrance: Easing.out(Easing.cubic),
  exit: Easing.in(Easing.cubic),
  emphasized: Easing.bezier(0.2, 0, 0, 1.2),
  linear: Easing.linear,
} as const;

export type EasingToken = keyof typeof easing;

/**
 * Spring presets for Animated.spring. Tuned for warm, calm feel.
 */
export const spring = {
  gentle: { friction: 9, tension: 60 },
  standard: { friction: 7, tension: 80 },
  bouncy: { friction: 5, tension: 100 },
} as const;

export type SpringToken = keyof typeof spring;

/**
 * Stagger gaps between sibling reveals (ms).
 */
export const stagger = {
  tight: 60,
  base: 120,
  loose: 180,
} as const;

export type StaggerToken = keyof typeof stagger;

export const motion = { duration, easing, spring, stagger } as const;
export type Motion = typeof motion;
