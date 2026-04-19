import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar, BottomSheetModal, SheetHeader, Text, useTheme } from '../../design-system';
import type { ReceivedNote } from '../../mocks/ambient';

export type ReceivedNotesSheetScreenProps = {
  notes: ReceivedNote[];
  onDismiss?: () => void;
};

export function ReceivedNotesSheetScreen({ notes, onDismiss }: ReceivedNotesSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const close = onDismiss ?? (() => {});

  return (
    <BottomSheetModal onDismiss={close}>
      {({ dismiss }) => (
        <>
          <SheetHeader
            title={tr('ambient.receivedNotes.title', { count: notes.length })}
            subtitle={tr('ambient.receivedNotes.subtitle')}
            onDismiss={() => dismiss()}
            accessibilityDismissLabel={tr('common.cancel')}
          />

          <View style={{ gap: t.rhythm.rowStack }}>
            {notes.map((note) => (
              <NoteRow key={note.id} note={note} />
            ))}
          </View>

          <Text variant="bodySmall" color="fgFaint" align="center">
            {tr('ambient.receivedNotes.footer')}
          </Text>
        </>
      )}
    </BottomSheetModal>
  );
}

function NoteRow({ note }: { note: ReceivedNote }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const timeLabel =
    note.hoursAgo < 24
      ? tr('ambient.receivedNotes.hoursAgo', { count: note.hoursAgo })
      : tr('ambient.receivedNotes.yesterday');

  return (
    <View style={{ flexDirection: 'row', gap: t.rhythm.row.gap, alignItems: 'flex-start' }}>
      <Avatar size={32} variant="empty" initial={note.senderInitial} />
      <View style={{ flex: 1, gap: t.spacing.xs }}>
        <Text variant="metaLabel" color="fgFaint">
          {tr('group.fromGroup', { group: note.fromGroup }).toUpperCase()}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: t.spacing.sm,
          }}
        >
          <Text variant="buttonLabelSocial" color="fg">
            {note.senderName}
          </Text>
          <Text variant="metaLabel" color="fgFaint">
            {timeLabel}
          </Text>
        </View>
        <Text variant="bodySerif" color="fgSubtle">
          {note.body}
        </Text>
      </View>
    </View>
  );
}
