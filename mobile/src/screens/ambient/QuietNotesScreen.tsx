import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton, Screen, Text, useTheme } from '../../design-system';
import type { QuietNote, QuietNoteTone } from '../../mocks/ambient';

export type QuietNotesScreenProps = {
  notes: QuietNote[];
  onSelect?: (note: QuietNote) => void;
  onClose?: () => void;
};

export function QuietNotesScreen({ notes, onSelect, onClose }: QuietNotesScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']} background="bg" scroll>
      {onClose ? (
        <View style={{ paddingHorizontal: t.spacing.sm }}>
          <BackButton variant="filled" onPress={onClose} />
        </View>
      ) : null}
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xl,
          gap: t.spacing.md,
        }}
      >
        <Text variant="headingPulse" color="fg">
          {tr('ambient.quietNotes.title')}
        </Text>
        <Text variant="bodySmall" color="fgFaint">
          {tr('ambient.quietNotes.subtitle')}
        </Text>
      </View>

      <View
        style={{
          paddingTop: t.spacing.xxl,
          paddingHorizontal: t.layout.screenPaddingX,
        }}
      >
        {notes.map((note, index) => (
          <QuietNoteRow
            key={note.id}
            note={note}
            isLast={index === notes.length - 1}
            onPress={onSelect ? () => onSelect(note) : undefined}
          />
        ))}
      </View>
    </Screen>
  );
}

function QuietNoteRow({
  note,
  isLast,
  onPress,
}: {
  note: QuietNote;
  isLast: boolean;
  onPress?: () => void;
}) {
  const t = useTheme();
  const dotColor = toneDotColor(t, note.tone);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        paddingBottom: isLast ? 0 : t.spacing.xxl,
        opacity: pressed && onPress ? t.opacity.pressed : 1,
      })}
    >
      <View style={{ width: t.layout.timelineGutter, alignItems: 'flex-start' }}>
        <View
          style={{
            width: t.layout.timelineDot,
            height: t.layout.timelineDot,
            borderRadius: t.radius.pill,
            backgroundColor: dotColor,
            marginTop: t.spacing.xs,
          }}
        />
        {!isLast ? (
          <View
            style={{
              width: t.brand.border.hairline,
              flex: 1,
              backgroundColor: t.colors.border,
              // Center the 1px line under the dot: half of (dot - hairline).
              marginLeft: (t.layout.timelineDot - t.brand.border.hairline) / 2,
              marginTop: t.spacing.sm,
            }}
          />
        ) : null}
      </View>
      <View style={{ flex: 1, gap: t.spacing.sm }}>
        <Text variant="metaLabel" color="fgFaint">
          {note.dateLabel}
        </Text>
        <Text variant="bodySerifTight" color="fg">
          {note.body}
        </Text>
      </View>
    </Pressable>
  );
}

function toneDotColor(t: ReturnType<typeof useTheme>, tone: QuietNoteTone): string {
  switch (tone) {
    case 'brand':
      return t.colors.brand;
    case 'calm':
      return t.colors.fgGhost;
    case 'sand':
      return t.colors.bgMuted;
  }
}
