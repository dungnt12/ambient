import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Heading, Screen, TabBar, Text, useTheme, type TabKey } from '../../design-system';

export type JournalListEntry = {
  id: string;
  dateLabel: string;
  preview: string;
};

export type JournalListScreenProps = {
  entries: JournalListEntry[];
  activeTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
  onFabPress?: () => void;
  onEntryPress?: (entry: JournalListEntry) => void;
};

export function JournalListScreen({
  entries,
  activeTab = 'journal',
  onTabChange,
  onFabPress,
  onEntryPress,
}: JournalListScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.lg,
            gap: t.spacing.sm,
          }}
        >
          <Heading variant="headingSection">{tr('journal.list.title')}</Heading>
          <Text variant="bodyLarge" color="fgSubtle">
            {tr('journal.list.entryCount', { count: entries.length })}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.xl,
            gap: t.spacing.xl,
          }}
        >
          {entries.map((entry) => (
            <Pressable
              key={entry.id}
              accessibilityRole="button"
              onPress={() => onEntryPress?.(entry)}
              hitSlop={t.spacing.xs}
              style={({ pressed }) => ({
                gap: t.spacing.sm,
                opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
              })}
            >
              <Text variant="overline" color="fgFaint">
                {entry.dateLabel}
              </Text>
              <Text variant="bodyLarge" color="fg" numberOfLines={3}>
                {entry.preview}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ alignItems: 'center', paddingBottom: t.spacing.base }}>
          <TabBar active={activeTab} onChange={onTabChange ?? (() => undefined)} onFabPress={onFabPress} />
        </View>
      </View>
    </Screen>
  );
}
