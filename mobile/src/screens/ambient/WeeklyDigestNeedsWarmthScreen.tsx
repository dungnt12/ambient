import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton, CTAButton, Screen, Text, useTheme } from '../../design-system';
import type { WeeklyDigest } from '../../mocks/ambient';

export type WeeklyDigestNeedsWarmthScreenProps = {
  digest: WeeklyDigest;
  onMessage?: () => void;
  onOpenSummary?: () => void;
  onClose?: () => void;
};

export function WeeklyDigestNeedsWarmthScreen({
  digest,
  onMessage,
  onOpenSummary,
  onClose,
}: WeeklyDigestNeedsWarmthScreenProps) {
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
          gap: t.spacing.base,
        }}
      >
        <Text variant="metaLabel" color="fgFaint">
          {digest.rangeLabel}
        </Text>
        <Text variant="headingScreen" color="fg">
          {digest.headline}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xxl,
        }}
      >
        {digest.sections.map((section) => (
          <View key={section.eyebrow}>
            <View
              style={{
                height: t.brand.border.hairline,
                backgroundColor: t.colors.border,
                marginBottom: t.spacing.lg,
              }}
            />
            <View style={{ gap: t.spacing.sm, marginBottom: t.spacing.lg }}>
              <Text variant="metaLabel" color="fgFaint">
                {section.eyebrow}
              </Text>
              <Text variant="bodyStandard" color="fgSubtle">
                {section.body}
              </Text>
            </View>
          </View>
        ))}
        <View
          style={{
            height: t.brand.border.hairline,
            backgroundColor: t.colors.border,
          }}
        />
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing['3xl'],
          paddingBottom: t.spacing.lg,
          gap: t.spacing.sm,
        }}
      >
        <CTAButton variant="dark" label={digest.ctaLabel} onPress={onMessage} />
        <Pressable
          accessibilityRole="button"
          onPress={onOpenSummary}
          style={{ paddingVertical: t.spacing.sm }}
        >
          <Text variant="buttonLabelSocial" color="fgFaint" align="center">
            {tr('ambient.weeklyDigest.openFullSummary')}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
