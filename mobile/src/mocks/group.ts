import type { PulseMood } from '../design-system';
import type { GroupInsight } from '../screens/group';

export type PulseMember = {
  id: string;
  name: string;
  initial: string;
  signal: string;
  mood: PulseMood;
  updatedAt: { kind: 'hoursAgo'; hours: number } | { kind: 'yesterday' };
  // Set when the card is rendered in an aggregated ("All groups") feed so the
  // reader knows which group the signal came from. Omitted in single-group view.
  fromGroup?: string;
};

export type InsightEntry = {
  insight: GroupInsight;
  groupId: string;
  groupName: string;
};

export type GroupSummary = {
  id: string;
  name: string;
  memberCount: number;
  since: string;
  inviteUrl: string;
  inviterName: string;
  // Pre-computed hint for the switcher — real impl derives from members.
  aggregateMood: PulseMood;
};

export type Tier = 'free' | 'pro';

// Demo tier flag — flip to 'free' to preview the gated "+ New group" row.
export const SAMPLE_TIER: Tier = 'pro';

export const SAMPLE_GROUPS: GroupSummary[] = [
  {
    id: 'sunday',
    name: 'Sunday Group',
    memberCount: 4,
    since: 'March',
    inviteUrl: 'ambient.app/j/a3f-2kx',
    inviterName: 'An',
    aggregateMood: 3,
  },
  {
    id: 'family',
    name: 'Nhà mình',
    memberCount: 3,
    since: 'January',
    inviteUrl: 'ambient.app/j/fam-9pk',
    inviterName: 'Mẹ',
    aggregateMood: 4,
  },
  {
    id: 'duo',
    name: 'Linh & Minh',
    memberCount: 2,
    since: 'February',
    inviteUrl: 'ambient.app/j/duo-7qx',
    inviterName: 'Linh',
    aggregateMood: 2,
  },
];

export const SAMPLE_PULSE_MEMBERS: Record<string, PulseMember[]> = {
  sunday: [
    {
      id: 'phong',
      name: 'Phong',
      initial: 'P',
      signal: 'Seems steady, a bit curious this week.',
      mood: 4,
      updatedAt: { kind: 'hoursAgo', hours: 2 },
    },
    {
      id: 'linh',
      name: 'Linh',
      initial: 'L',
      signal: 'Tired — but routines still keep warmth.',
      mood: 2,
      updatedAt: { kind: 'yesterday' },
    },
    {
      id: 'an',
      name: 'An',
      initial: 'A',
      signal: 'Full of energy. Small joys every day.',
      mood: 5,
      updatedAt: { kind: 'hoursAgo', hours: 3 },
    },
    {
      id: 'minh',
      name: 'Minh',
      initial: 'M',
      signal: 'Seems quieter than usual. Reading, walking, listening.',
      mood: 3,
      updatedAt: { kind: 'yesterday' },
    },
  ],
  family: [
    {
      id: 'me',
      name: 'Mẹ',
      initial: 'M',
      signal: 'Warm and settled — cooking something slow today.',
      mood: 4,
      updatedAt: { kind: 'hoursAgo', hours: 5 },
    },
    {
      id: 'ba',
      name: 'Ba',
      initial: 'B',
      signal: 'Quiet morning with the garden. Patient.',
      mood: 4,
      updatedAt: { kind: 'hoursAgo', hours: 6 },
    },
    {
      id: 'em',
      name: 'Em',
      initial: 'E',
      signal: 'Busy week, still finding small pockets of rest.',
      mood: 3,
      updatedAt: { kind: 'yesterday' },
    },
  ],
  duo: [
    {
      id: 'linh-duo',
      name: 'Linh',
      initial: 'L',
      signal: 'Feeling heavy — a few long days in a row.',
      mood: 2,
      updatedAt: { kind: 'hoursAgo', hours: 4 },
    },
    {
      id: 'minh-duo',
      name: 'Minh',
      initial: 'M',
      signal: 'Tender, listening more than talking lately.',
      mood: 2,
      updatedAt: { kind: 'yesterday' },
    },
  ],
};

// Per-group AI insights. Silence (null) is a valid state per the product vision.
export const SAMPLE_GROUP_INSIGHTS: Record<string, GroupInsight | null> = {
  sunday: { kind: 'meetup' },
  family: null,
  duo: { kind: 'support', targetName: 'Linh' },
};

// Aggregate helpers for the "All groups" pulse view — the default when the
// user has not actively filtered to a specific group.

function updatedAtSortKey(m: PulseMember): number {
  return m.updatedAt.kind === 'hoursAgo' ? m.updatedAt.hours : 24;
}

export function getAllPulseMembers(): PulseMember[] {
  const flat: PulseMember[] = [];
  for (const g of SAMPLE_GROUPS) {
    const rows = SAMPLE_PULSE_MEMBERS[g.id] ?? [];
    for (const m of rows) {
      flat.push({ ...m, fromGroup: g.name });
    }
  }
  return flat.sort((a, b) => updatedAtSortKey(a) - updatedAtSortKey(b));
}

export function getAllInsights(): InsightEntry[] {
  const out: InsightEntry[] = [];
  for (const g of SAMPLE_GROUPS) {
    const ins = SAMPLE_GROUP_INSIGHTS[g.id];
    if (ins) out.push({ insight: ins, groupId: g.id, groupName: g.name });
  }
  return out;
}

export function getTotalMemberCount(): number {
  return SAMPLE_GROUPS.reduce((sum, g) => sum + g.memberCount, 0);
}
