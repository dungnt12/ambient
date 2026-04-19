import type { MeetupProposal } from '../mocks/ambient';

const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000;

export type CalendarHandoffResult = {
  ok: boolean;
  reason?: 'unavailable' | 'error';
  error?: unknown;
};

type CalendarModule = {
  createEventInCalendarAsync: (eventData: {
    title: string;
    startDate: Date;
    endDate: Date;
    notes?: string;
  }) => Promise<unknown>;
};

function loadCalendar(): CalendarModule | null {
  try {
    // Lazy require so Expo Go (no native module) doesn't crash at import time.
    // Rebuild the dev client to enable the real handoff.
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- lazy load to avoid Expo Go crash at module init
    const mod = require('expo-calendar') as CalendarModule;
    return typeof mod.createEventInCalendarAsync === 'function' ? mod : null;
  } catch {
    return null;
  }
}

export async function addMeetupToCalendar(
  proposal: MeetupProposal,
): Promise<CalendarHandoffResult> {
  const Calendar = loadCalendar();
  if (!Calendar) {
    console.warn('[calendar] expo-calendar native module unavailable — rebuild dev client.');
    return { ok: false, reason: 'unavailable' };
  }

  try {
    const start = new Date(proposal.suggestedAt);
    const end = new Date(start.getTime() + DEFAULT_DURATION_MS);
    const attendeeNames = proposal.candidates.map((c) => c.name).join(', ');

    await Calendar.createEventInCalendarAsync({
      title: `${proposal.groupName} · ${proposal.headline}`,
      startDate: start,
      endDate: end,
      notes: `${proposal.body}\n\nMaybe joining: ${attendeeNames}`,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: 'error', error };
  }
}
