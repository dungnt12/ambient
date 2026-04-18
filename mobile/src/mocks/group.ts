import type { PulseMood } from '../design-system';

export type PulseMember = {
  id: string;
  name: string;
  initial: string;
  signal: string;
  mood: PulseMood;
  updatedAt: { kind: 'hoursAgo'; hours: number } | { kind: 'yesterday' };
};

export const SAMPLE_GROUP = {
  name: 'Sunday Group',
  memberCount: 4,
  since: 'March',
  inviteUrl: 'ambient.app/j/a3f-2kx',
  inviterName: 'An',
};

export type SavedInvite = {
  id: string;
  groupName: string;
  inviterName: string;
  memberCount: number;
  since: string;
  memberInitials: string[];
  receivedAgo: string;
};

export const SAMPLE_SAVED_INVITES: SavedInvite[] = [
  {
    id: 'sunday',
    groupName: 'Sunday Group',
    inviterName: 'An',
    memberCount: 4,
    since: 'March',
    memberInitials: ['P', 'L', 'A', 'M'],
    receivedAgo: '2 days ago',
  },
  {
    id: 'studio',
    groupName: 'Studio Six',
    inviterName: 'Minh',
    memberCount: 6,
    since: 'January',
    memberInitials: ['M', 'T', 'K', 'H', 'N', 'V'],
    receivedAgo: 'Yesterday',
  },
];

export const SAMPLE_PULSE_MEMBERS: PulseMember[] = [
  {
    id: 'phong',
    name: 'Phong',
    initial: 'P',
    signal: 'Seems steady, a bit curious this week.',
    mood: 'curious',
    updatedAt: { kind: 'hoursAgo', hours: 2 },
  },
  {
    id: 'linh',
    name: 'Linh',
    initial: 'L',
    signal: 'Tired — but routines still keep warmth.',
    mood: 'dim',
    updatedAt: { kind: 'yesterday' },
  },
  {
    id: 'an',
    name: 'An',
    initial: 'A',
    signal: 'Full of energy. Small joys every day.',
    mood: 'bright',
    updatedAt: { kind: 'hoursAgo', hours: 3 },
  },
  {
    id: 'minh',
    name: 'Minh',
    initial: 'M',
    signal: 'Seems quieter than usual. Reading, walking, listening.',
    mood: 'calm',
    updatedAt: { kind: 'yesterday' },
  },
];
