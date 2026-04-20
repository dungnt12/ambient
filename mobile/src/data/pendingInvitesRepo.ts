import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'ambient.pendingInvites.v1';
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

export type PendingInvite = {
  id: string;
  inviterName: string;
  groupName: string;
  memberCount: number;
  since?: string;
  memberInitials: string[];
  receivedAt: string;
  expiresAt: string;
};

export type PendingInvitesRepo = {
  list: () => Promise<PendingInvite[]>;
  save: (invite: Omit<PendingInvite, 'id' | 'receivedAt' | 'expiresAt'>) => Promise<PendingInvite>;
  remove: (id: string) => Promise<void>;
};

function makeId(): string {
  return `pi_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function prune(list: PendingInvite[], now: number): PendingInvite[] {
  return list.filter((i) => new Date(i.expiresAt).getTime() > now);
}

async function readRaw(): Promise<PendingInvite[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as PendingInvite[];
  } catch {
    return [];
  }
}

async function writeRaw(list: PendingInvite[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * AsyncStorage-backed implementation. Swap this file for a backend-backed repo
 * (Supabase/Encore) without touching consumers — the `PendingInvitesRepo` shape
 * is stable.
 */
export const pendingInvitesRepo: PendingInvitesRepo = {
  async list() {
    const all = await readRaw();
    const fresh = prune(all, Date.now());
    if (fresh.length !== all.length) await writeRaw(fresh);
    return fresh;
  },

  async save(input) {
    const now = Date.now();
    const invite: PendingInvite = {
      ...input,
      id: makeId(),
      receivedAt: new Date(now).toISOString(),
      expiresAt: new Date(now + EXPIRY_MS).toISOString(),
    };
    const all = prune(await readRaw(), now);
    // De-dupe by (inviterName, groupName) — latest wins.
    const deduped = all.filter(
      (i) => !(i.inviterName === invite.inviterName && i.groupName === invite.groupName),
    );
    await writeRaw([invite, ...deduped]);
    return invite;
  },

  async remove(id) {
    const all = await readRaw();
    await writeRaw(all.filter((i) => i.id !== id));
  },
};
