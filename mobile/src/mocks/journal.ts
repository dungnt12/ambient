import type { DayEntryItem, JournalListEntry } from '../screens/journal';

export const SAMPLE_ENTRIES: JournalListEntry[] = [
  {
    id: 'apr17',
    dateLabel: 'TODAY · APR 17',
    date: '2026-04-17',
    mood: 3,
    preview:
      'Morning coffee. I brewed slower than usual — weighing beans, watching the steam rise.',
  },
  {
    id: 'apr16',
    dateLabel: 'WEDNESDAY · APR 16',
    date: '2026-04-16',
    mood: 2,
    preview: 'A long meeting, then a walk. The street was quieter than I expected.',
  },
  {
    id: 'apr15',
    dateLabel: 'TUESDAY · APR 15',
    date: '2026-04-15',
    mood: 2,
    preview: "Couldn't sleep. Ended up texting my sister instead of scrolling.",
  },
  {
    id: 'apr13',
    dateLabel: 'SUNDAY · APR 13',
    date: '2026-04-13',
    mood: 4,
    preview: 'Finished the book. A gentler ending than I expected.',
  },
  {
    id: 'apr08',
    dateLabel: 'TUESDAY · APR 8',
    date: '2026-04-08',
    mood: 5,
    preview: 'Dinner with Minh and Hà. Laughed until my cheeks hurt — rare lately.',
  },
  {
    id: 'apr02',
    dateLabel: 'THURSDAY · APR 2',
    date: '2026-04-02',
    mood: 3,
    preview: 'New month, same rain. Reorganised the bookshelf by memory, not by genre.',
  },
  {
    id: 'mar28',
    dateLabel: 'SATURDAY · MAR 28',
    date: '2026-03-28',
    mood: 1,
    preview: 'Rough day. Nothing specific — just the weight of too many small things.',
  },
  {
    id: 'mar20',
    dateLabel: 'FRIDAY · MAR 20',
    date: '2026-03-20',
    mood: 4,
    preview: 'Sun after a week of grey. Took the long way home just to feel it on my face.',
  },
];

export const SAMPLE_ENTRY_BODY =
  "Morning coffee tastes different — must be the new beans. Watching sunlight fall onto the balcony, noticed the plants I forgot to water. Not sad, not happy. An ordinary morning, and ordinary feels enough right now. The 10am meeting ran long. Came home to mom's cooking. Tonight I'll finish the book I started.";

export const SAMPLE_DAY_ENTRIES: DayEntryItem[] = [
  {
    id: 'apr17-0624',
    time: '06:24',
    preview: 'Woke before the alarm. Grey light at the window, birds already talking.',
    mood: 3,
  },
  {
    id: 'apr17-0712',
    time: '07:12',
    preview: 'Stretched on the floor for ten minutes. Something in my lower back let go.',
    mood: 4,
  },
  {
    id: 'apr17-0824',
    time: '08:24',
    preview:
      'Morning coffee. I brewed slower than usual — weighing beans, watching the steam rise.',
    mood: 3,
  },
  {
    id: 'apr17-0945',
    time: '09:45',
    preview: 'Inbox heavier than expected. Replied to two, archived the rest for tomorrow.',
    mood: 2,
  },
  {
    id: 'apr17-1102',
    time: '11:02',
    preview: 'Quick call with Minh. She sounded tired but laughed twice — that counts.',
    mood: 3,
  },
  {
    id: 'apr17-1230',
    time: '12:30',
    preview: 'Lunch at the corner place. Ordered the same thing as always, no regrets.',
    mood: 3,
  },
  {
    id: 'apr17-1302',
    time: '13:02',
    preview: 'A long meeting ran over. Walked home the long way to clear my head.',
    mood: 2,
  },
  {
    id: 'apr17-1415',
    time: '14:15',
    preview: 'Tried to focus on the spec doc. Reread the same paragraph four times.',
    mood: 2,
  },
  {
    id: 'apr17-1530',
    time: '15:30',
    preview: 'Afternoon tea with oat milk. Sun finally cut through the clouds.',
    mood: 4,
  },
  {
    id: 'apr17-1648',
    time: '16:48',
    preview: 'Finished the thing I was avoiding. Smaller than it looked from a distance.',
    mood: 4,
  },
  {
    id: 'apr17-1805',
    time: '18:05',
    preview: 'Walked past the market on the way home. Bought tangerines I did not need.',
    mood: 3,
  },
  {
    id: 'apr17-1920',
    time: '19:20',
    preview: 'Cooked with what was in the fridge. Turned out better than it had any right to.',
    mood: 4,
  },
  {
    id: 'apr17-2045',
    time: '20:45',
    preview: 'Called home. Dad talked about the neighbour’s dog for ten minutes straight.',
    mood: 5,
  },
  {
    id: 'apr17-2130',
    time: '21:30',
    preview: 'Shower, then the good lotion. Small rituals are doing a lot of the work lately.',
    mood: 4,
  },
  {
    id: 'apr17-2210',
    time: '22:10',
    preview: 'Finished the book. A gentler ending than I expected — felt like enough.',
    mood: 4,
  },
];
