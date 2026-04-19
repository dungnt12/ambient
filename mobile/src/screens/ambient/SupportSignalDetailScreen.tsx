import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CTAButton,
  CTAStack,
  EditorialHeader,
  ScreenLayout,
  Text,
  useTheme,
} from '../../design-system';
import type { SupportSignal } from '../../mocks/ambient';

export type SupportSignalDetailScreenProps = {
  signal: SupportSignal;
  onBack?: () => void;
  /** Open the note composer pre-filled with the AI draft. */
  onUseDraft?: (draft: string) => void;
  /** Open the note composer empty, for writing from scratch. */
  onWriteOwn?: () => void;
};

export function SupportSignalDetailScreen({
  signal,
  onBack,
  onUseDraft,
  onWriteOwn,
}: SupportSignalDetailScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const header = (
    <View>
      <EditorialHeader back={{ onPress: onBack }} />
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
            label={tr('ambient.supportDetail.useDraftCta')}
            onPress={() => onUseDraft?.(signal.aiBody)}
          />
        }
        secondary={{
          label: tr('ambient.supportDetail.writeOwn'),
          onPress: () => onWriteOwn?.(),
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
            {tr('ambient.supportDetail.draftEyebrow')}
          </Text>
          <Text variant="bodySerif" color="fg">
            {signal.aiBody}
          </Text>
          <Text variant="overline" color="fgFaint">
            {tr('ambient.supportDetail.draftHint')}
          </Text>
        </View>

        <Text variant="bodySmall" color="fgFaint">
          {tr('ambient.supportDetail.privacyNote', { name: signal.memberName })}
        </Text>
      </View>
    </ScreenLayout>
  );
}
