import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type ActiveGroupContextValue = {
  // `null` means "All groups" — the default pulse view aggregates every group
  // the user belongs to. A concrete id filters to that group.
  activeGroupId: string | null;
  setActiveGroupId: (id: string | null) => void;
};

const ActiveGroupContext = createContext<ActiveGroupContextValue | null>(null);

export function ActiveGroupProvider({ children }: { children: ReactNode }) {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const value = useMemo(() => ({ activeGroupId, setActiveGroupId }), [activeGroupId]);
  return <ActiveGroupContext.Provider value={value}>{children}</ActiveGroupContext.Provider>;
}

export function useActiveGroup(): ActiveGroupContextValue {
  const ctx = useContext(ActiveGroupContext);
  if (!ctx) {
    throw new Error('useActiveGroup must be used within ActiveGroupProvider');
  }
  return ctx;
}
