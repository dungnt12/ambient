import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBar, useTabBarVisibilityScrollY, useTheme, type TabKey } from '../design-system';
import type { RootNav, TabParamList } from './types';

const ROUTE_TO_TAB_KEY: Record<keyof TabParamList, TabKey> = {
  Garden: 'garden',
  Journal: 'journal',
  Group: 'group',
  You: 'you',
};

const TAB_KEY_TO_ROUTE: Record<TabKey, keyof TabParamList> = {
  garden: 'Garden',
  journal: 'Journal',
  group: 'Group',
  you: 'You',
};

export function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  const activeRouteName = state.routes[state.index].name as keyof TabParamList;
  const active = ROUTE_TO_TAB_KEY[activeRouteName];

  const scrollY = useTabBarVisibilityScrollY();
  const hideDistance = t.spacing.xs + t.layout.tabBarHeight + Math.max(insets.bottom, t.spacing.xs);

  // diffClamp runs on the native thread — scroll down accumulates up to
  // hideDistance (bar slides out), scroll up unwinds it (bar slides back in).
  const translateY = useMemo(
    () => Animated.diffClamp(scrollY, 0, hideDistance),
    [scrollY, hideDistance],
  );

  return (
    <Animated.View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        paddingTop: t.spacing.xs,
        paddingBottom: Math.max(insets.bottom, t.spacing.xs),
        backgroundColor: 'transparent',
        transform: [{ translateY }],
      }}
    >
      <TabBar
        active={active}
        onChange={(next) => navigation.navigate(TAB_KEY_TO_ROUTE[next])}
        onFabPress={() => rootNav.navigate('JournalCompose')}
      />
    </Animated.View>
  );
}
