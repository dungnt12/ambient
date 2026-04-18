import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CTAButton, HeroIllustration, Text, useTheme } from '../../../design-system';

export type GroupInsightsEmptyBodyProps = {
  onBack?: () => void;
  onReminderSettings?: () => void;
};

export function GroupInsightsEmptyBody({
  onBack,
  onReminderSettings,
}: GroupInsightsEmptyBodyProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const slot = t.layout.illustrationSlot;

  return (
    <View style={{ alignItems: 'center', gap: t.spacing.xl, paddingTop: t.spacing.lg }}>
      <View
        style={{
          width: slot,
          height: slot,
          borderRadius: slot / 2,
          backgroundColor: t.colors.bgMuted,
          borderWidth: t.brand.border.hairline,
          borderColor: t.colors.borderSoft,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <HeroIllustration step="signal" size={slot} />
      </View>

      <View style={{ gap: t.spacing.md, alignItems: 'center' }}>
        <Text variant="overline" color="fgFaint" align="center">
          {tr('group.insights.empty.eyebrow')}
        </Text>
        <Text variant="headingSub" color="fg" align="center">
          {tr('group.insights.empty.headline')}
        </Text>
        <Text variant="bodyLarge" color="fgSubtle" align="center">
          {tr('group.insights.empty.body')}
        </Text>
      </View>

      <View style={{ width: '100%', gap: t.spacing.sm, marginTop: t.spacing.xl }}>
        <CTAButton variant="primary" label={tr('group.insights.empty.cta')} onPress={onBack} />
        <Pressable
          accessibilityRole="button"
          onPress={onReminderSettings}
          style={{ paddingVertical: t.spacing.sm }}
        >
          <Text variant="buttonLabelSocial" color="fgSubtle" align="center">
            {tr('group.insights.empty.reminderSettings')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
