import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
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

export type JournalComposeScreenProps = {
  dayLabel: string;
  promptEyebrow?: string;
  prompt: string;
  promptFollowup?: string;
  onSave?: (draft: { content: string; mood: MoodLevel | null }) => void;
};

const MAX_LENGTH = 2000;

export function JournalComposeScreen({
  dayLabel,
  promptEyebrow,
  prompt,
  promptFollowup,
  onSave,
}: JournalComposeScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [composing, setComposing] = useState(false);

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
            justifyContent: 'flex-end',
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.md,
          }}
        >
          <OnlyYouBadge label={tr('journal.compose.onlyYou')} />
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.base,
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
            onFocus={() => setComposing(true)}
            onBlur={() => setComposing(false)}
          />

          {composing ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: t.spacing.sm,
              }}
            >
              <Text variant="bodySmall" color="fgFaint">
                {tr('journal.compose.keyboardHint')}
              </Text>
              <Pressable
                accessibilityRole="button"
                disabled={!canSave}
                onPress={handleSave}
                hitSlop={t.spacing.sm}
                style={({ pressed }) => ({
                  opacity: !canSave
                    ? t.opacity.disabled
                    : pressed
                      ? t.opacity.pressed
                      : t.opacity.full,
                })}
              >
                <Text variant="buttonLabel" color="brand">
                  {tr('journal.compose.inlineSave')}
                </Text>
              </Pressable>
            </View>
          ) : null}

          <View style={{ flex: 1 }} />

          {!composing ? (
            <View style={{ gap: t.spacing.lg, paddingBottom: t.spacing.base }}>
              <MoodPicker value={mood} onChange={setMood} />
              <CTAButton
                label={tr('journal.compose.save')}
                variant="primary"
                disabled={!canSave}
                onPress={handleSave}
              />
            </View>
          ) : null}
        </View>
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
