import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react-native';
import {
  Avatar,
  BackButton,
  CTAButton,
  MoodGlyph,
  PrivacyBadge,
  ScreenLayout,
  Text,
  TextButton,
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
    <ScreenLayout
      header={
        <View style={{ paddingHorizontal: t.spacing.sm, paddingTop: t.spacing.sm }}>
          <BackButton variant="filled" onPress={onBack} />
        </View>
      }
      footer={
        <View
          style={{
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.sm,
            paddingBottom: t.spacing.sm,
            gap: t.spacing.md,
          }}
        >
          <CTAButton label={tr('journal.detail.editCta')} variant="dark" onPress={onEdit} />
          <TextButton
            variant="destructive"
            label={tr('journal.detail.deleteCta')}
            onPress={() => onDelete?.()}
          />
        </View>
      }
    >
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.base,
          gap: t.spacing.lg,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: t.spacing.sm,
          }}
        >
          <Text variant="overline" color="fgFaint" style={{ flexShrink: 1 }}>
            {dateEyebrow}
          </Text>
          <PrivacyBadge kind="lock" label={tr('journal.compose.onlyYou')} />
        </View>

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
      </View>
    </ScreenLayout>
  );
}
