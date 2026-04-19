import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react-native';
import {
  AILabelRow,
  CTAButton,
  DayHeader,
  JournalTextarea,
  MoodPicker,
  PromptCard,
  Screen,
  Text,
  useTheme,
  type MoodLevel,
} from '../../design-system';
import { useKeyboardVisible } from '../../hooks/useKeyboardVisible';

export type JournalComposeScreenProps = {
  dayLabel: string;
  promptEyebrow?: string;
  prompt: string;
  promptFollowup?: string;
  onCancel?: () => void;
  onSave?: (draft: { content: string; mood: MoodLevel | null }) => void;
};

const MAX_LENGTH = 2000;

export function JournalComposeScreen({
  dayLabel,
  promptEyebrow,
  prompt,
  promptFollowup,
  onCancel,
  onSave,
}: JournalComposeScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const keyboardOpen = useKeyboardVisible();

  const canSave = content.trim().length > 0 && mood !== null;

  const handleSave = () => {
    if (!canSave) return;
    onSave?.({ content, mood });
  };

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.md,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tr('common.cancel')}
            onPress={onCancel}
            hitSlop={t.spacing.sm}
            style={({ pressed }) => ({
              opacity: pressed ? t.opacity.pressed : t.opacity.full,
            })}
          >
            <Text variant="buttonLabel" color="fgMuted">
              {tr('common.cancel')}
            </Text>
          </Pressable>
          <OnlyYouBadge label={tr('journal.compose.onlyYou')} />
        </View>

        <Pressable
          accessible={false}
          onPress={Keyboard.dismiss}
          style={{
            flex: 1,
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.base,
            paddingBottom: t.spacing.md,
            gap: t.spacing.base,
          }}
        >
          <DayHeader label={dayLabel} />
          <PromptCard
            variant="muted"
            sparkle
            eyebrow={promptEyebrow ?? tr('journal.compose.promptEyebrow')}
            prompt={prompt}
            followup={promptFollowup}
          />
          <AILabelRow label={tr('journal.compose.aiWillSummarize')} />
          <JournalTextarea
            value={content}
            onChangeText={setContent}
            placeholder={tr('journal.compose.placeholder')}
            maxLength={MAX_LENGTH}
            showCounter
            minHeight={t.layout.ctaHeight * 2}
            style={{ flex: 1 }}
          />

          {keyboardOpen ? null : (
            <View style={{ gap: t.spacing.lg }}>
              <MoodPicker value={mood} onChange={setMood} />
              <CTAButton
                label={tr('journal.compose.save')}
                variant="primary"
                disabled={!canSave}
                onPress={handleSave}
              />
            </View>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function OnlyYouBadge({ label }: { label: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.xs,
        paddingHorizontal: t.spacing.sm,
        paddingVertical: t.spacing.xxs,
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.border,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.pill,
      }}
    >
      <Lock size={t.iconSize.xs} strokeWidth={t.stroke.standard} color={t.colors.fgSubtle} />
      <Text variant="overline" color="fgSubtle">
        {label}
      </Text>
    </View>
  );
}
