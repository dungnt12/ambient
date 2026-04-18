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

export type NotificationsPermissionScreenProps = {
  onAllow: () => void;
  onSkip: () => void;
  onClose?: () => void;
};

const REASON_KEYS = ['reason1', 'reason2', 'reason3'] as const;

export function NotificationsPermissionScreen({
  onAllow,
  onSkip,
  onClose,
}: NotificationsPermissionScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const header = onClose ? <ScreenHeader back={{ onPress: onClose }} /> : undefined;

  const footer = (
    <CTAStack
      primary={
        <CTAButton
          variant="dark"
          label={tr('settings.notificationsPermission.allow')}
          onPress={onAllow}
        />
      }
      secondary={{ label: tr('settings.notificationsPermission.skip'), onPress: onSkip }}
      style={{ paddingHorizontal: t.layout.screenPaddingX }}
    />
  );

  return (
    <ScreenLayout header={header} footer={footer}>
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.sm,
        }}
      >
        <Text variant="overline" color="fgFaint">
          {tr('settings.notificationsPermission.eyebrow')}
        </Text>

        <View style={{ height: t.spacing.base }} />

        <Text variant="headingScreen" color="fg">
          {tr('settings.notificationsPermission.title')}
        </Text>

        <View style={{ height: t.spacing.xl }} />

        <Text variant="bodyLarge" color="fgMuted">
          {tr('settings.notificationsPermission.body')}
        </Text>

        <View style={{ height: t.spacing.xxl }} />

        <ReasonsCard />

        <View style={{ height: t.spacing.base }} />

        <Text variant="bodySmall" color="fgFaint">
          {tr('settings.notificationsPermission.caption')}
        </Text>
      </View>
    </ScreenLayout>
  );
}

function ReasonsCard() {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <View
      style={{
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        paddingVertical: t.spacing.xl,
        paddingHorizontal: t.spacing.xl,
        gap: t.spacing.base,
      }}
    >
      {REASON_KEYS.map((key) => (
        <ReasonRow key={key} label={tr(`settings.notificationsPermission.reasons.${key}`)} />
      ))}
    </View>
  );
}

function ReasonRow({ label }: { label: string }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: t.spacing.base }}>
      <View
        style={{
          width: t.spacing.sm,
          height: t.spacing.sm,
          borderRadius: t.radius.pill,
          backgroundColor: t.colors.brand,
          marginTop: t.spacing.xs,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text variant="buttonLabelSocial" color="fg">
          {label}
        </Text>
      </View>
    </View>
  );
}
