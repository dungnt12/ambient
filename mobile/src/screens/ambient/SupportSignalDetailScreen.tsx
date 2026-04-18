import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CTAButton,
  CTAStack,
  ScreenHeader,
  ScreenLayout,
  Text,
  useTheme,
} from '../../design-system';
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

  const header = (
    <View>
      <ScreenHeader back={{ onPress: onBack }} />
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
    </View>
  );

  const footer = (
    <View style={{ paddingHorizontal: t.layout.screenPaddingX, paddingBottom: t.spacing.lg }}>
      <CTAStack
        primary={
          <CTAButton
            variant="dark"
            label={tr('ambient.supportDetail.sendCta', { name: signal.memberName })}
            onPress={onSend}
          />
        }
        secondary={{
          label: tr('ambient.supportDetail.later'),
          onPress: () => onLater?.(),
          tone: 'faint',
        }}
      />
    </View>
  );

  return (
    <ScreenLayout header={header} footer={footer}>
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xxl,
          gap: t.spacing.lg,
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

        <Text variant="bodySmall" color="fgFaint">
          {tr('ambient.supportDetail.privacyNote', { name: signal.memberName })}
        </Text>
      </View>
    </ScreenLayout>
  );
}
