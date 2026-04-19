export type QuietNoteTone = 'brand' | 'calm' | 'sand';

export type QuietNoteTarget =
  | 'WeeklyDigest'
  | 'WeeklyNeedsWarmth'
  | 'SupportSignalDetail'
  | 'QuietNotesEmpty'
  | 'MeetupProposal';

export type QuietNote = {
  id: string;
  dateLabel: string;
  body: string;
  tone: QuietNoteTone;
  target: QuietNoteTarget;
};

export const SAMPLE_QUIET_NOTES: QuietNote[] = [
  {
    id: 'today-0924',
    dateLabel: 'TODAY · 9:24',
    body: 'The group feels lighter this week.',
    tone: 'brand',
    target: 'WeeklyDigest',
  },
  {
    id: 'yesterday-1902',
    dateLabel: 'YESTERDAY · 19:02',
    body: "You took yesterday off — that's okay. A small prompt for today.",
    tone: 'calm',
    target: 'QuietNotesEmpty',
  },
  {
    id: 'sun-13apr-0900',
    dateLabel: 'SUN · APR 13 · 9:00',
    body: "This week's group digest is ready.",
    tone: 'sand',
    target: 'WeeklyNeedsWarmth',
  },
  {
    id: 'fri-11apr',
    dateLabel: 'FRI · APR 11',
    body: "Linh's been low for a few days. A small message might be enough.",
    tone: 'brand',
    target: 'SupportSignalDetail',
  },
];

export type WeeklyDigestSection = {
  eyebrow: string;
  body: string;
};

export type WeeklyDigest = {
  rangeLabel: string;
  headline: string;
  sections: WeeklyDigestSection[];
  ctaLabel: string;
};

export const SAMPLE_WEEKLY_DIGEST: WeeklyDigest = {
  rangeLabel: 'SUNDAY · APR 12–18',
  headline: 'A quiet week, with a few bright moments.',
  sections: [
    {
      eyebrow: 'GROUP PULSE',
      body: 'Steady, curious, softening through the week. An had the brightest week; Linh moved slower.',
    },
    {
      eyebrow: 'YOU THIS WEEK',
      body: 'You wrote most of the week. Signal warmed from Wednesday on.',
    },
    {
      eyebrow: 'ONE SMALL THING',
      body: "Saturday afternoon — everyone's free. A short walk, perhaps.",
    },
  ],
  ctaLabel: 'Propose to group',
};

export const SAMPLE_WEEKLY_DIGEST_WARMTH: WeeklyDigest = {
  rangeLabel: 'SUNDAY · APR 12–18',
  headline: 'A quiet week. Warmth needed.',
  sections: [
    {
      eyebrow: 'GROUP PULSE',
      body: 'Overall gentle. An kept a steady rhythm, Minh was quieter, Phong was busy.',
    },
    {
      eyebrow: 'NEEDS A MESSAGE',
      body: 'Linh has been low for 4 consecutive days. The longest stretch so far.',
    },
    {
      eyebrow: 'ONE SMALL THING',
      body: 'No big plans needed. A short call, a specific message — enough.',
    },
  ],
  ctaLabel: 'Message Linh',
};

export type MeetupProposalCandidate = {
  id: string;
  name: string;
  initial: string;
};

export type MeetupProposalStatus = 'open' | 'proposed';

export type MeetupProposalActor = {
  id: string;
  name: string;
};

export type MeetupProposal = {
  id: string;
  groupName: string;
  headline: string;
  body: string;
  suggestedAt: string;
  candidates: MeetupProposalCandidate[];
  status: MeetupProposalStatus;
  proposedBy?: MeetupProposalActor;
  proposedAt?: string;
};

export const SAMPLE_MEETUP_PROPOSAL: MeetupProposal = {
  id: 'sample-meetup-1',
  groupName: 'Sunday Group',
  headline: 'Saturday, Apr 19 around 3 PM?',
  body: 'The group leans toward a slow weekend. A short afternoon walk, or tea somewhere quiet. No pressure — no one has to confirm right away.',
  suggestedAt: '2026-04-19T15:00:00+07:00',
  status: 'open',
  candidates: [
    { id: 'phong', name: 'Phong', initial: 'P' },
    { id: 'linh', name: 'Linh', initial: 'L' },
    { id: 'an', name: 'An', initial: 'A' },
    { id: 'minh', name: 'Minh', initial: 'M' },
  ],
};

export type SupportSignal = {
  memberName: string;
  days: number;
  headline: string;
  body: string;
  aiBody: string;
};

export type ReceivedNote = {
  id: string;
  senderName: string;
  senderInitial: string;
  /** Group the sender wrote from — shown as eyebrow to disambiguate same names across circles. */
  fromGroup: string;
  body: string;
  /** Hours since the note was sent, used for the relative label. */
  hoursAgo: number;
};

export const SAMPLE_RECEIVED_NOTES: ReceivedNote[] = [
  {
    id: 'note-an',
    senderName: 'An',
    senderInitial: 'A',
    fromGroup: 'Sunday Group',
    body: 'Nghĩ về cậu sáng nay. Không cần trả lời đâu.',
    hoursAgo: 2,
  },
  {
    id: 'note-minh',
    senderName: 'Minh',
    senderInitial: 'M',
    fromGroup: 'Gia đình',
    body: 'Nếu tuần này nặng, mình ở đây.',
    hoursAgo: 9,
  },
  {
    id: 'note-phong',
    senderName: 'Phong',
    senderInitial: 'P',
    fromGroup: 'Sunday Group',
    body: 'Một cái ôm từ xa.',
    hoursAgo: 26,
  },
];

export const SAMPLE_SUPPORT_SIGNAL: SupportSignal = {
  memberName: 'Linh',
  days: 3,
  headline: 'Linh moves slower this week.',
  body: "Linh's signal has softened since Tuesday. Nothing intense — just a quiet stretch lasting longer than usual.",
  aiBody: 'Nghĩ về cậu vài hôm nay. Không cần trả lời — chỉ muốn cậu biết thôi.',
};
