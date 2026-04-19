import { useState } from 'react';
import { Alert, Keyboard, TextInput as RNTextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomSheetModal, CTAButton, SheetHeader, Text, useTheme } from '../../design-system';

export type NoteComposerSheetScreenProps = {
  recipientName: string;
  /** Pre-fill the input — used when the sender picks an AI draft. */
  initialMessage?: string;
  onSend?: (message: string) => void;
  onDismiss?: () => void;
};

const MAX_LENGTH = 140;

export function NoteComposerSheetScreen({
  recipientName,
  initialMessage = '',
  onSend,
  onDismiss,
}: NoteComposerSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [message, setMessage] = useState(initialMessage.slice(0, MAX_LENGTH));
  const close = onDismiss ?? (() => {});

  const trimmed = message.trim();
  const canSend = trimmed.length > 0;
  const remaining = MAX_LENGTH - message.length;

  return (
    <BottomSheetModal onDismiss={close}>
      {({ dismiss }) => (
        <>
          <SheetHeader
            title={tr('ambient.noteComposer.title', { name: recipientName })}
            subtitle={tr('ambient.noteComposer.subtitle', { name: recipientName })}
            onDismiss={() => dismiss()}
            accessibilityDismissLabel={tr('common.cancel')}
          />

          <View
            style={{
              backgroundColor: t.colors.bgRaised,
              borderRadius: t.radius.input,
              borderColor: t.colors.border,
              borderWidth: t.brand.border.hairline,
              paddingHorizontal: t.spacing.base,
              paddingVertical: t.spacing.md,
              gap: t.spacing.sm,
            }}
          >
            <RNTextInput
              value={message}
              onChangeText={(text) => setMessage(text.slice(0, MAX_LENGTH))}
              placeholder={tr('ambient.noteComposer.placeholder')}
              placeholderTextColor={t.colors.fgFaint}
              multiline
              autoFocus
              maxLength={MAX_LENGTH}
              style={[
                t.typography.bodySerif,
                {
                  color: t.colors.fg,
                  padding: 0,
                  minHeight: t.layout.inputHeight,
                },
              ]}
            />
            <Text variant="metaLabel" color="fgFaint" align="right">
              {tr('ambient.noteComposer.remaining', { count: remaining })}
            </Text>
          </View>

          <CTAButton
            variant="dark"
            label={tr('ambient.noteComposer.sendCta', { name: recipientName })}
            disabled={!canSend}
            onPress={() => {
              Keyboard.dismiss();
              Alert.alert(
                tr('ambient.noteComposer.confirmAlert.title', { name: recipientName }),
                tr('ambient.noteComposer.confirmAlert.body'),
                [
                  {
                    text: tr('ambient.noteComposer.confirmAlert.cancel'),
                    style: 'cancel',
                  },
                  {
                    text: tr('ambient.noteComposer.confirmAlert.confirm'),
                    onPress: () => dismiss(() => onSend?.(trimmed)),
                  },
                ],
              );
            }}
          />

          <Text variant="bodySmall" color="fgFaint" align="center">
            {tr('ambient.noteComposer.footer')}
          </Text>
        </>
      )}
    </BottomSheetModal>
  );
}
