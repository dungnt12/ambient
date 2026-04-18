import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton, CTAButton, Screen, Text, useTheme } from '../../design-system';

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

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      {onClose ? (
        <View style={{ paddingHorizontal: t.spacing.sm }}>
          <BackButton variant="filled" onPress={onClose} />
        </View>
      ) : null}
      <View
        style={{
          flex: 1,
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

        <View style={{ flex: 1 }} />

        <CTAButton
          variant="dark"
          label={tr('settings.notificationsPermission.allow')}
          onPress={onAllow}
        />

        <View style={{ height: t.spacing.base }} />

        <Pressable
          accessibilityRole="button"
          onPress={onSkip}
          style={({ pressed }) => ({
            alignSelf: 'center',
            paddingVertical: t.spacing.sm,
            paddingHorizontal: t.spacing.base,
            opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
          })}
        >
          <Text variant="buttonLabelSocial" color="fgSubtle">
            {tr('settings.notificationsPermission.skip')}
          </Text>
        </Pressable>
      </View>
    </Screen>
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
