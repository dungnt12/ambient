import { createContext, useContext, type ReactNode } from 'react';

// Space reserved at the bottom of a scene for a floating bar (tab bar,
// toolbar, etc.). Any DS container (Screen, ScreenLayout) that scrolls or
// pins a footer reads this and adds matching paddingBottom so content
// isn't covered. Consumers outside a provider read 0.
const BottomBarInsetContext = createContext<number>(0);

export function BottomBarInsetProvider({
  value,
  children,
}: {
  value: number;
  children: ReactNode;
}) {
  return <BottomBarInsetContext.Provider value={value}>{children}</BottomBarInsetContext.Provider>;
}

export function useBottomBarInset(): number {
  return useContext(BottomBarInsetContext);
}
