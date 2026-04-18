import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../design-system';

// Total vertical space the floating AppTabBar occupies over the scene.
// Screens inside the tab navigator must reserve this much bottom padding
// so their last content isn't hidden behind the bar.
export function useTabBarInset() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return t.spacing.xs + t.layout.tabBarHeight + Math.max(insets.bottom, t.spacing.xs);
}
