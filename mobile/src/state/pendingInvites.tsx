import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { pendingInvitesRepo, type PendingInvite } from '../data/pendingInvitesRepo';

type SaveInput = Omit<PendingInvite, 'id' | 'receivedAt' | 'expiresAt'>;

type PendingInvitesContextValue = {
  invites: PendingInvite[];
  ready: boolean;
  save: (input: SaveInput) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const PendingInvitesContext = createContext<PendingInvitesContextValue | null>(null);

export function PendingInvitesProvider({ children }: { children: ReactNode }) {
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    const next = await pendingInvitesRepo.list();
    setInvites(next);
  }, []);

  // Initial hydration from storage. `ready` prevents consumers from flashing
  // an empty state before the first read resolves.
  useEffect(() => {
    let active = true;
    void (async () => {
      await refresh();
      if (active) setReady(true);
    })();
    return () => {
      active = false;
    };
  }, [refresh]);

  const save = useCallback(async (input: SaveInput) => {
    await pendingInvitesRepo.save(input);
    const next = await pendingInvitesRepo.list();
    setInvites(next);
  }, []);

  const remove = useCallback(async (id: string) => {
    await pendingInvitesRepo.remove(id);
    const next = await pendingInvitesRepo.list();
    setInvites(next);
  }, []);

  const value = useMemo(
    () => ({ invites, ready, save, remove, refresh }),
    [invites, ready, save, remove, refresh],
  );

  return <PendingInvitesContext.Provider value={value}>{children}</PendingInvitesContext.Provider>;
}

export function usePendingInvites(): PendingInvitesContextValue {
  const ctx = useContext(PendingInvitesContext);
  if (!ctx) {
    throw new Error('usePendingInvites must be used within PendingInvitesProvider');
  }
  return ctx;
}
