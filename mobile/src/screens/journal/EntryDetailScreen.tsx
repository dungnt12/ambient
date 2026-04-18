import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Lock, Sparkles } from 'lucide-react-native';
import {
  Avatar,
  BackButton,
  Checkbox,
  CTAButton,
  MoodGlyph,
  Screen,
  Text,
  useTheme,
  type MoodLevel,
} from '../../design-system';

export type EntryDetailScreenProps = {
  dateEyebrow: string;
  headline: string;
  body: string;
  aiSummary: string;
  mood?: MoodLevel;
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function EntryDetailScreen({
  dateEyebrow,
  headline,
  body,
  aiSummary,
  mood,
  onBack,
  onEdit,
  onDelete,
}: EntryDetailScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']} background="bg" scroll>
      <View style={{ paddingHorizontal: t.spacing.sm, paddingTop: t.spacing.sm }}>
        <BackButton variant="filled" onPress={onBack} />
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.base,
          gap: t.spacing.lg,
        }}
      >
        <Text variant="overline" color="fgFaint">
          {dateEyebrow}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
          <Avatar size={32} variant="empty" />
          {mood ? <MoodGlyph mood={mood} selected /> : null}
          <Text variant="bodyLarge" color="fg" style={{ flexShrink: 1 }}>
            {headline}
          </Text>
        </View>

        <View
          style={{
            height: t.brand.border.hairline,
            backgroundColor: t.colors.borderSoft,
          }}
        />

        <Text variant="bodyLarge" color="fgMuted">
          {body}
        </Text>

        <View
          style={{
            backgroundColor: t.colors.bgMuted,
            borderRadius: t.radius.card,
            padding: t.spacing.xl,
            gap: t.spacing.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.xs }}>
            <Sparkles size={t.iconSize.xs} strokeWidth={t.stroke.standard} color={t.colors.brand} />
            <Text variant="overline" color="fgFaint">
              {tr('journal.detail.aiSignalHeading')}
            </Text>
          </View>
          <Text variant="bodyStandard" color="fg">
            {aiSummary}
          </Text>
        </View>

        <PrivacyNoteRow />

        <View style={{ gap: t.spacing.md, paddingTop: t.spacing.sm }}>
          <CTAButton label={tr('journal.detail.editCta')} variant="dark" onPress={onEdit} />
          <Pressable
            accessibilityRole="button"
            onPress={onDelete}
            hitSlop={t.spacing.sm}
            style={({ pressed }) => ({
              opacity: pressed ? t.opacity.pressed : t.opacity.full,
              alignSelf: 'center',
            })}
          >
            <Text variant="buttonLabel" style={{ color: t.colors.error }}>
              {tr('journal.detail.deleteCta')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

function PrivacyNoteRow() {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.md,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.base,
        backgroundColor: t.colors.bgRaised,
        borderRadius: t.radius.card,
        borderWidth: t.brand.border.hairline,
        borderColor: t.colors.borderSoft,
      }}
    >
      <Checkbox value onChange={() => undefined} />
      <Text variant="bodyStandard" color="fg" style={{ flexGrow: 1, flexShrink: 1 }}>
        {tr('journal.detail.privacyNote')}
      </Text>
      <Lock size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.fgSubtle} />
    </View>
  );
}
