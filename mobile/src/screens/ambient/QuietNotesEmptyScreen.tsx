import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CTAButton, HeroIllustration, Screen, Text, useTheme } from '../../design-system';

export type QuietNotesEmptyScreenProps = {
  onBack?: () => void;
  onMute?: () => void;
};

export function QuietNotesEmptyScreen({ onBack, onMute }: QuietNotesEmptyScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const slot = t.layout.illustrationSlot;

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <View
        style={{
          flex: 1,
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xl,
        }}
      >
        <Text variant="headingScreen" color="fg">
          {tr('ambient.quietNotesEmpty.title')}
        </Text>
        <Text variant="bodyStandard" color="fgFaint" style={{ marginTop: t.spacing.md }}>
          {tr('ambient.quietNotesEmpty.subtitle')}
        </Text>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: t.spacing.xl,
          }}
        >
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
              {tr('ambient.quietNotesEmpty.eyebrow')}
            </Text>
            <Text variant="headingSub" color="fg" align="center">
              {tr('ambient.quietNotesEmpty.headline')}
            </Text>
            <Text variant="bodyStandard" color="fgSubtle" align="center">
              {tr('ambient.quietNotesEmpty.body')}
            </Text>
          </View>
        </View>

        <CTAButton variant="dark" label={tr('ambient.quietNotesEmpty.cta')} onPress={onBack} />
        <Pressable
          accessibilityRole="button"
          onPress={onMute}
          style={{ paddingVertical: t.spacing.sm, marginTop: t.spacing.sm }}
        >
          <Text variant="buttonLabelSocial" color="fgFaint" align="center">
            {tr('ambient.quietNotesEmpty.mute')}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
