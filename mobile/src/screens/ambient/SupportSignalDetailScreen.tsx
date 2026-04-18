import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton, CTAButton, Screen, Text, useTheme } from '../../design-system';
import type { SupportSignal } from '../../mocks/ambient';

export type SupportSignalDetailScreenProps = {
  signal: SupportSignal;
  onBack?: () => void;
  onSend?: () => void;
  onLater?: () => void;
};

export function SupportSignalDetailScreen({
  signal,
  onBack,
  onSend,
  onLater,
}: SupportSignalDetailScreenProps) {
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
          gap: t.spacing.md,
        }}
      >
        <Text variant="overline" color="fgFaint">
          {tr('ambient.supportDetail.eyebrow', { count: signal.days })}
        </Text>
        <Text variant="headingScreen" color="fg">
          {signal.headline}
        </Text>
        <Text variant="bodySerif" color="fgSubtle" style={{ marginTop: t.spacing.sm }}>
          {signal.body}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xxl,
        }}
      >
        <View
          style={{
            backgroundColor: t.colors.bgRaised,
            borderRadius: t.radius.base,
            borderWidth: t.brand.border.hairline,
            borderColor: t.colors.borderSoft,
            padding: t.spacing.lg,
            gap: t.spacing.md,
          }}
        >
          <Text variant="overline" color="fgFaint">
            {tr('ambient.supportDetail.aiEyebrow')}
          </Text>
          <Text variant="bodyStandard" color="fgSubtle">
            {signal.aiBody}
          </Text>
          <Text variant="overline" color="fgFaint">
            {tr('ambient.supportDetail.aiNoOneSees')}
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.lg,
        }}
      >
        <Text variant="bodySmall" color="fgFaint">
          {tr('ambient.supportDetail.privacyNote', { name: signal.memberName })}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing['3xl'],
          paddingBottom: t.spacing.lg,
          gap: t.spacing.sm,
        }}
      >
        <CTAButton
          variant="dark"
          label={tr('ambient.supportDetail.sendCta', { name: signal.memberName })}
          onPress={onSend}
        />
        <Pressable
          accessibilityRole="button"
          onPress={onLater}
          style={{ paddingVertical: t.spacing.sm }}
        >
          <Text variant="buttonLabelSocial" color="fgFaint" align="center">
            {tr('ambient.supportDetail.later')}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
