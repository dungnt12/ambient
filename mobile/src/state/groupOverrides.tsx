import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type OverridesState = {
  names: Record<string, string>;
  removedMembers: Record<string, string[]>;
};

type GroupOverridesContextValue = {
  renameGroup: (groupId: string, nextName: string) => void;
  removeMember: (groupId: string, memberId: string) => void;
  getDisplayName: (groupId: string, fallback: string) => string;
  isMemberRemoved: (groupId: string, memberId: string) => boolean;
};

const GroupOverridesContext = createContext<GroupOverridesContextValue | null>(null);

export function GroupOverridesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OverridesState>({ names: {}, removedMembers: {} });

  const renameGroup = useCallback((groupId: string, nextName: string) => {
    const trimmed = nextName.trim();
    if (!trimmed) return;
    setState((prev) => ({ ...prev, names: { ...prev.names, [groupId]: trimmed } }));
  }, []);

  const removeMember = useCallback((groupId: string, memberId: string) => {
    setState((prev) => {
      const current = prev.removedMembers[groupId] ?? [];
      if (current.includes(memberId)) return prev;
      return {
        ...prev,
        removedMembers: { ...prev.removedMembers, [groupId]: [...current, memberId] },
      };
    });
  }, []);

  const getDisplayName = useCallback(
    (groupId: string, fallback: string) => state.names[groupId] ?? fallback,
    [state.names],
  );

  const isMemberRemoved = useCallback(
    (groupId: string, memberId: string) => !!state.removedMembers[groupId]?.includes(memberId),
    [state.removedMembers],
  );

  const value = useMemo(
    () => ({ renameGroup, removeMember, getDisplayName, isMemberRemoved }),
    [renameGroup, removeMember, getDisplayName, isMemberRemoved],
  );

  return <GroupOverridesContext.Provider value={value}>{children}</GroupOverridesContext.Provider>;
}

export function useGroupOverrides(): GroupOverridesContextValue {
  const ctx = useContext(GroupOverridesContext);
  if (!ctx) {
    throw new Error('useGroupOverrides must be used within GroupOverridesProvider');
  }
  return ctx;
}
