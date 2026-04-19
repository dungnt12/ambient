import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  EmptyState,
  EntryListRow,
  FilterChip,
  Heading,
  MoodGlyph,
  ScreenLayout,
  Text,
  useTheme,
  type MoodLevel,
} from '../../design-system';

export type JournalListEntry = {
  id: string;
  dateLabel: string;
  preview: string;
  /** ISO date (YYYY-MM-DD) used for time filtering. */
  date: string;
  mood: MoodLevel;
};

export type JournalListScreenProps = {
  entries: JournalListEntry[];
  onEntryPress?: (entry: JournalListEntry) => void;
  /** Injectable "now" for deterministic rendering / tests. Defaults to `new Date()`. */
  now?: Date;
};

type TimeFilter = 'week' | 'month' | null;

const MOODS: readonly MoodLevel[] = [1, 2, 3, 4, 5];
const MOOD_GLYPH_WIDTH = 44;

function startOfWeek(d: Date): Date {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  // Monday-based week: getDay() returns 0 (Sun) .. 6 (Sat).
  const weekday = (copy.getDay() + 6) % 7;
  copy.setDate(copy.getDate() - weekday);
  return copy;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function JournalListScreen({ entries, onEntryPress, now }: JournalListScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>(null);
  const [moodFilter, setMoodFilter] = useState<MoodLevel | null>(null);

  const referenceDate = now ?? new Date();
  const weekStart = startOfWeek(referenceDate).getTime();
  const monthStart = startOfMonth(referenceDate).getTime();

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (moodFilter !== null && entry.mood !== moodFilter) return false;
      if (timeFilter !== null) {
        const entryTime = new Date(entry.date).getTime();
        if (timeFilter === 'week' && entryTime < weekStart) return false;
        if (timeFilter === 'month' && entryTime < monthStart) return false;
      }
      return true;
    });
  }, [entries, moodFilter, timeFilter, weekStart, monthStart]);

  const toggleTime = (next: Exclude<TimeFilter, null>) =>
    setTimeFilter((prev) => (prev === next ? null : next));
  const toggleMood = (next: MoodLevel) => setMoodFilter((prev) => (prev === next ? null : next));

  return (
    <ScreenLayout
      edges={['top']}
      padHorizontal
      header={
        <View style={{ paddingTop: t.spacing.lg, gap: t.spacing.sm }}>
          <Heading variant="headingSection">{tr('journal.list.title')}</Heading>
          <Text variant="bodyLarge" color="fgSubtle">
            {tr('journal.list.entryCount', { count: filtered.length })}
          </Text>
        </View>
      }
    >
      <View style={{ paddingTop: t.spacing.lg, gap: t.spacing.md }}>
        <View style={{ flexDirection: 'row', gap: t.spacing.sm }}>
          <FilterChip
            label={tr('journal.list.filter.thisWeek')}
            selected={timeFilter === 'week'}
            onPress={() => toggleTime('week')}
          />
          <FilterChip
            label={tr('journal.list.filter.thisMonth')}
            selected={timeFilter === 'month'}
            onPress={() => toggleTime('month')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {MOODS.map((mood) => {
            const isSelected = moodFilter === mood;
            return (
              <Pressable
                key={mood}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={tr('journal.list.filter.moodLabel', { level: mood })}
                onPress={() => toggleMood(mood)}
                hitSlop={t.spacing.sm}
                style={({ pressed }) => ({
                  paddingVertical: t.spacing.xs,
                  opacity: pressed
                    ? t.opacity.pressedSubtle
                    : isSelected
                      ? t.opacity.full
                      : t.opacity.muted,
                })}
              >
                <MoodGlyph
                  mood={mood}
                  size={MOOD_GLYPH_WIDTH}
                  color={isSelected ? 'brand' : 'fgMuted'}
                />
              </Pressable>
            );
          })}
        </View>
      </View>

      {filtered.length === 0 ? (
        <View style={{ paddingTop: t.spacing.xl }}>
          <EmptyState
            title={tr('journal.list.empty.title')}
            description={tr('journal.list.empty.description')}
          />
        </View>
      ) : (
        <View style={{ paddingTop: t.spacing.lg }}>
          {filtered.map((entry) => (
            <EntryListRow
              key={entry.id}
              date={entry.dateLabel}
              preview={entry.preview}
              onPress={() => onEntryPress?.(entry)}
            />
          ))}
        </View>
      )}
    </ScreenLayout>
  );
}
