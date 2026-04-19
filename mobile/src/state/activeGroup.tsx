import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { SAMPLE_GROUPS } from '../mocks/group';

type ActiveGroupContextValue = {
  activeGroupId: string | null;
  setActiveGroupId: (id: string | null) => void;
};

const ActiveGroupContext = createContext<ActiveGroupContextValue | null>(null);

export function ActiveGroupProvider({ children }: { children: ReactNode }) {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(SAMPLE_GROUPS[0]?.id ?? null);
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
