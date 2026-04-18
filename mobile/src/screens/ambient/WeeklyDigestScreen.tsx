import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton, CTAButton, Screen, Text, useTheme } from '../../design-system';
import type { WeeklyDigest } from '../../mocks/ambient';

export type WeeklyDigestScreenProps = {
  digest: WeeklyDigest;
  onPropose?: () => void;
  onClose?: () => void;
};

export function WeeklyDigestScreen({ digest, onPropose, onClose }: WeeklyDigestScreenProps) {
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
        {digest.sections.map((section, index) => (
          <View key={section.eyebrow}>
            {index > 0 ? (
              <View
                style={{
                  height: t.brand.border.hairline,
                  backgroundColor: t.colors.border,
                  marginVertical: t.spacing.lg,
                }}
              />
            ) : null}
            <View style={{ gap: t.spacing.sm }}>
              <Text variant="metaLabel" color="fgFaint">
                {section.eyebrow}
              </Text>
              <Text variant="bodySerifTight" color="fg">
                {section.body}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing['3xl'],
          paddingBottom: t.spacing.lg,
        }}
      >
        <CTAButton
          variant="dark"
          label={digest.ctaLabel || tr('ambient.weeklyDigest.proposeCta')}
          onPress={onPropose}
        />
      </View>
    </Screen>
  );
}
