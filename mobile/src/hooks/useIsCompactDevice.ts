import { useWindowDimensions } from 'react-native';

/**
 * True on narrow devices (iPhone SE, iPhone mini, small Android).
 * Use sparingly for conditional layout branching — prefer flex/maxWidth for normal components.
 */
export const COMPACT_DEVICE_THRESHOLD = 375;

export function useIsCompactDevice(): boolean {
  const { width } = useWindowDimensions();
  return width < COMPACT_DEVICE_THRESHOLD;
}
