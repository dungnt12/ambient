import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import {
  BackButton,
  CTAButton,
  Heading,
  ScreenLayout,
  Text,
  useTheme,
  type MoodLevel,
} from '../../design-system';

export type DayEntryItem = {
  id: string;
  time: string;
  preview: string;
  mood?: MoodLevel;
};

export type DayScreenProps = {
  dayLabel: string;
  entries: DayEntryItem[];
  isToday?: boolean;
  onBack?: () => void;
  onEntryPress?: (entry: DayEntryItem) => void;
  onAddMore?: () => void;
};

export function DayScreen({
  dayLabel,
  entries,
  isToday = false,
  onBack,
  onEntryPress,
  onAddMore,
}: DayScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const insets = useSafeAreaInsets();

  const footer =
    isToday && onAddMore ? (
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.sm,
          paddingBottom: t.spacing.sm,
        }}
      >
        <CTAButton label={tr('journal.day.addMore')} variant="dark" onPress={onAddMore} />
      </View>
    ) : undefined;

  return (
    <ScreenLayout
      edges={['top']}
      header={
        <View style={{ paddingHorizontal: t.spacing.sm, paddingTop: t.spacing.sm }}>
          <BackButton variant="filled" onPress={onBack} />
        </View>
      }
      footer={footer}
      bodyContentContainerStyle={{ paddingBottom: insets.bottom + t.spacing.xl }}
    >
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.base,
          gap: t.spacing.md,
        }}
      >
        <Heading variant="headingSection">{dayLabel}</Heading>
        <Text variant="bodySmall" color="fgFaint">
          {tr('journal.day.entryCount', { count: entries.length })}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xxl,
        }}
      >
        {entries.map((entry, index) => (
          <DayEntryRow
            key={entry.id}
            entry={entry}
            isFirst={index === 0}
            isLast={index === entries.length - 1}
            onPress={onEntryPress ? () => onEntryPress(entry) : undefined}
          />
        ))}
      </View>
    </ScreenLayout>
  );
}

function DayEntryRow({
  entry,
  isFirst,
  isLast,
  onPress,
}: {
  entry: DayEntryItem;
  isFirst: boolean;
  isLast: boolean;
  onPress?: () => void;
}) {
  const t = useTheme();
  const lineOffset = (t.layout.timelineDot - t.brand.border.hairline) / 2;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        opacity: pressed && onPress ? t.opacity.pressed : t.opacity.full,
      })}
    >
      <View style={{ width: t.layout.timelineGutter, alignItems: 'flex-start' }}>
        {!isFirst ? (
          <View
            style={{
              width: t.brand.border.hairline,
              height: t.spacing.xs,
              backgroundColor: t.colors.border,
              marginLeft: lineOffset,
            }}
          />
        ) : null}
        <View
          style={{
            width: t.layout.timelineDot,
            height: t.layout.timelineDot,
            borderRadius: t.radius.pill,
            backgroundColor: t.colors.brand,
            marginTop: isFirst ? t.spacing.xs : 0,
          }}
        />
        {!isLast ? (
          <View
            style={{
              width: t.brand.border.hairline,
              flex: 1,
              backgroundColor: t.colors.border,
              marginLeft: lineOffset,
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          flex: 1,
          gap: t.spacing.sm,
          paddingBottom: isLast ? 0 : t.spacing.xxl,
        }}
      >
        <Text variant="metaLabel" color="fgFaint">
          {entry.time}
        </Text>
        <Text variant="bodySerifTight" color="fg" numberOfLines={3}>
          {entry.preview}
        </Text>
      </View>
    </Pressable>
  );
}
