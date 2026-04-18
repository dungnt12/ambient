import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react-native';
import {
  Heading,
  JournalTextarea,
  MoodPicker,
  Screen,
  Text,
  useTheme,
  type MoodLevel,
} from '../../design-system';
import { useKeyboardOpen } from '../../hooks';

export type EntryEditScreenProps = {
  dateEyebrow: string;
  initialContent: string;
  initialMood?: MoodLevel | null;
  onCancel?: () => void;
  onSave?: (draft: { content: string; mood: MoodLevel | null }) => void;
};

const MAX_LENGTH = 2000;

export function EntryEditScreen({
  dateEyebrow,
  initialContent,
  initialMood = null,
  onCancel,
  onSave,
}: EntryEditScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [content, setContent] = useState(initialContent);
  const [mood, setMood] = useState<MoodLevel | null>(initialMood);
  const keyboardOpen = useKeyboardOpen();

  const dirty = content !== initialContent || mood !== initialMood;

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.md,
            paddingBottom: t.spacing.sm,
          }}
        >
          <HeaderAction label={tr('common.cancel')} onPress={onCancel} color="fgMuted" />
          <HeaderAction
            label={tr('common.save')}
            onPress={() => onSave?.({ content, mood })}
            color={dirty ? 'brand' : 'fgGhost'}
            disabled={!dirty}
          />
        </View>

        <Pressable
          accessible={false}
          onPress={Keyboard.dismiss}
          style={{
            flex: 1,
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.base,
            paddingBottom: t.spacing.md,
            gap: t.spacing.lg,
          }}
        >
          <Text variant="overline" color="fgFaint">
            {dateEyebrow}
          </Text>
          <Heading variant="headingSub">{tr('journal.edit.title')}</Heading>

          <JournalTextarea
            value={content}
            onChangeText={setContent}
            maxLength={MAX_LENGTH}
            showCounter
            minHeight={t.layout.ctaHeight * 3}
            style={{ flex: 1 }}
          />

          {keyboardOpen ? null : (
            <>
              <MoodPicker value={mood} onChange={setMood} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: t.spacing.xs,
                  backgroundColor: t.colors.bgMuted,
                  borderRadius: t.radius.card,
                  padding: t.spacing.base,
                  marginBottom: t.spacing.base,
                }}
              >
                <Sparkles
                  size={t.iconSize.xs}
                  strokeWidth={t.stroke.standard}
                  color={t.colors.brand}
                />
                <Text variant="bodySmall" color="fgSubtle" align="center">
                  {tr('journal.edit.aiHint')}
                </Text>
              </View>
            </>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </Screen>
  );
}

type HeaderActionColor = 'fgMuted' | 'brand' | 'fgGhost';

function HeaderAction({
  label,
  onPress,
  color,
  disabled = false,
}: {
  label: string;
  onPress?: () => void;
  color: HeaderActionColor;
  disabled?: boolean;
}) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      hitSlop={t.spacing.sm}
      style={({ pressed }) => ({
        opacity: disabled ? t.opacity.disabled : pressed ? t.opacity.pressed : t.opacity.full,
      })}
    >
      <Text variant="buttonLabel" color={color}>
        {label}
      </Text>
    </Pressable>
  );
}
