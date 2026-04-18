import { memo, useCallback, useMemo } from 'react';
import { FlatList, type ListRenderItem, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  GardenCell,
  GardenLegend,
  Heading,
  Screen,
  Text,
  useTheme,
  type GardenIllustrationName,
  type Theme,
} from '../../design-system';

export type GardenScreenProps = {
  year?: number;
  daysWritten?: number;
  daysInYear?: number;
  todayMonthIndex?: number;
  todayDayOfMonth?: number;
};

const MONTH_KEYS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
] as const;

type MonthKey = (typeof MONTH_KEYS)[number];

const ILLUSTRATION_CYCLE: GardenIllustrationName[] = [
  'fern',
  'petal',
  'drop',
  'sun',
  'crescent',
  'acorn',
  'stone',
  'leaf',
  'cloud',
  'seedling',
  'moon',
  'spark',
];

const DAYS_PER_ROW = 7;
const CELL_SIZE = 40;

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function illustrationFor(monthIndex: number, day: number): GardenIllustrationName {
  return ILLUSTRATION_CYCLE[(monthIndex * 31 + day) % ILLUSTRATION_CYCLE.length];
}

type CellSpec =
  | { kind: 'empty'; day: number }
  | { kind: 'today'; day: number }
  | { kind: 'written'; day: number; illustration: GardenIllustrationName };

type MonthData = {
  key: MonthKey;
  monthIndex: number;
  cells: CellSpec[];
  rows: CellSpec[][];
  writtenCount: number;
  total: number;
};

function buildMonthCells(
  year: number,
  monthIndex: number,
  todayMonthIndex: number,
  todayDay: number,
): { cells: CellSpec[]; writtenCount: number; total: number } {
  const total = daysInMonth(year, monthIndex);
  const cells: CellSpec[] = [];
  let writtenCount = 0;
  for (let day = 1; day <= total; day += 1) {
    if (monthIndex > todayMonthIndex) {
      cells.push({ kind: 'empty', day });
    } else if (monthIndex < todayMonthIndex) {
      if (day % 5 === 0) {
        cells.push({ kind: 'empty', day });
      } else {
        cells.push({ kind: 'written', day, illustration: illustrationFor(monthIndex, day) });
        writtenCount += 1;
      }
    } else if (day < todayDay) {
      if (day % 5 === 0 || day % 7 === 0) {
        cells.push({ kind: 'empty', day });
      } else {
        cells.push({ kind: 'written', day, illustration: illustrationFor(monthIndex, day) });
        writtenCount += 1;
      }
    } else if (day === todayDay) {
      cells.push({ kind: 'today', day });
    } else {
      cells.push({ kind: 'empty', day });
    }
  }
  return { cells, writtenCount, total };
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

type MonthItemProps = {
  month: MonthData;
  subtitle: string;
  monthLabel: string;
  headingColor: 'fg' | 'fgFaint';
  gapSm: number;
  gapXxs: number;
  gapXs: number;
  hairline: number;
  borderSoftColor: string;
  cellLabelFor: (monthLabel: string, day: number) => string;
};

const MonthItem = memo(function MonthItem({
  month,
  subtitle,
  monthLabel,
  headingColor,
  gapSm,
  gapXxs,
  gapXs,
  hairline,
  borderSoftColor,
  cellLabelFor,
}: MonthItemProps) {
  return (
    <View style={{ gap: gapSm }}>
      <View style={{ gap: gapXxs }}>
        <Heading variant="headingSubLarge" color={headingColor}>
          {monthLabel}
        </Heading>
        <Text variant="bodySmall" color="fgFaint">
          {subtitle}
        </Text>
      </View>
      <View
        style={{
          height: hairline,
          backgroundColor: borderSoftColor,
          marginTop: gapXs,
        }}
      />
      <View style={{ gap: gapSm, paddingTop: gapSm }}>
        {month.rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {row.map((cell) => (
              <GardenCell
                key={cell.day}
                state={cell.kind}
                day={cell.day}
                illustration={cell.kind === 'written' ? cell.illustration : undefined}
                label={cellLabelFor(monthLabel, cell.day)}
              />
            ))}
            {row.length < DAYS_PER_ROW
              ? Array.from({ length: DAYS_PER_ROW - row.length }).map((_, i) => (
                  <View key={`spacer-${i}`} style={{ width: CELL_SIZE }} />
                ))
              : null}
          </View>
        ))}
      </View>
    </View>
  );
});

type HeaderProps = {
  t: Theme;
  year: number;
  subtitle: string;
  legendLabels: { empty: string; today: string; written: string };
};

const ListHeader = memo(function ListHeader({ t, year, subtitle, legendLabels }: HeaderProps) {
  return (
    <View
      style={{
        paddingTop: t.spacing.lg,
        paddingBottom: t.spacing.xl,
        gap: t.spacing.sm,
      }}
    >
      <Heading variant="headingSection">{String(year)}</Heading>
      <Text variant="bodySmall" color="fgSubtle">
        {subtitle}
      </Text>
      <View style={{ paddingTop: t.spacing.sm }}>
        <GardenLegend labels={legendLabels} />
      </View>
    </View>
  );
});

export function GardenScreen({
  year = 2026,
  daysWritten = 107,
  daysInYear = 365,
  todayMonthIndex = 3,
  todayDayOfMonth = 17,
}: GardenScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const months: MonthData[] = useMemo(
    () =>
      MONTH_KEYS.map((key, i) => {
        const built = buildMonthCells(year, i, todayMonthIndex, todayDayOfMonth);
        return {
          key,
          monthIndex: i,
          ...built,
          rows: chunk(built.cells, DAYS_PER_ROW),
        };
      }),
    [year, todayMonthIndex, todayDayOfMonth],
  );

  const cellLabelFor = useCallback(
    (monthLabel: string, day: number) => tr('garden.cellLabel', { month: monthLabel, day }),
    [tr],
  );

  const items = useMemo(
    () =>
      months.map((month) => {
        const isCurrent = month.monthIndex === todayMonthIndex;
        const isPast = month.monthIndex < todayMonthIndex;
        let subtitle: string;
        if (isCurrent) {
          subtitle = tr('garden.monthSubtitle.live', { done: daysWritten });
        } else if (isPast) {
          const note = tr(`garden.notes.${month.key}`, { defaultValue: '' });
          subtitle = note
            ? tr('garden.monthSubtitle.completedNote', {
                done: month.writtenCount,
                total: month.total,
                note,
              })
            : tr('garden.monthSubtitle.completed', {
                done: month.writtenCount,
                total: month.total,
              });
        } else {
          subtitle = tr('garden.monthSubtitle.ahead', { total: month.total });
        }
        return {
          month,
          subtitle,
          monthLabel: tr(`garden.months.${month.key}`),
          headingColor: (isPast || isCurrent ? 'fg' : 'fgFaint') as 'fg' | 'fgFaint',
        };
      }),
    [months, todayMonthIndex, daysWritten, tr],
  );

  const renderItem: ListRenderItem<(typeof items)[number]> = useCallback(
    ({ item }) => (
      <MonthItem
        month={item.month}
        subtitle={item.subtitle}
        monthLabel={item.monthLabel}
        headingColor={item.headingColor}
        gapSm={t.spacing.sm}
        gapXxs={t.spacing.xxs}
        gapXs={t.spacing.xs}
        hairline={t.brand.border.hairline}
        borderSoftColor={t.colors.borderSoft}
        cellLabelFor={cellLabelFor}
      />
    ),
    [t, cellLabelFor],
  );

  const keyExtractor = useCallback((item: (typeof items)[number]) => item.month.key, []);

  const headerSubtitle = tr('garden.subtitle', { done: daysWritten, total: daysInYear });
  const legendLabels = {
    empty: tr('garden.legend.empty'),
    today: tr('garden.legend.today'),
    written: tr('garden.legend.written'),
  };

  const ItemSeparator = useCallback(
    () => <View style={{ height: t.spacing.lg }} />,
    [t.spacing.lg],
  );

  return (
    <Screen edges={['top']} background="bg">
      <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <ListHeader t={t} year={year} subtitle={headerSubtitle} legendLabels={legendLabels} />
        }
        contentContainerStyle={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingBottom: t.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={2}
        removeClippedSubviews
      />
    </Screen>
  );
}
