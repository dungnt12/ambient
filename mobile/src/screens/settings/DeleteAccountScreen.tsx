import { Alert, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CTAButton, Heading, Screen, Text, useTheme } from '../../design-system';

export type DeleteAccountScreenProps = {
  onConfirmDelete: () => void;
  onKeep: () => void;
};

export function DeleteAccountScreen({ onConfirmDelete, onKeep }: DeleteAccountScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const handleDeletePress = () => {
    Alert.alert(
      tr('settings.deleteAccount.confirmAlert.title'),
      tr('settings.deleteAccount.confirmAlert.body'),
      [
        { text: tr('settings.deleteAccount.confirmAlert.cancel'), style: 'cancel' },
        {
          text: tr('settings.deleteAccount.confirmAlert.confirm'),
          style: 'destructive',
          onPress: onConfirmDelete,
        },
      ],
    );
  };

  const reasons = [
    tr('settings.deleteAccount.reason1'),
    tr('settings.deleteAccount.reason2'),
    tr('settings.deleteAccount.reason3'),
  ];

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <View style={{ flex: 1, paddingHorizontal: t.layout.screenPaddingX }}>
        <Text variant="overline" color="fgFaint" style={{ marginTop: t.spacing.sm }}>
          {tr('settings.deleteAccount.eyebrow')}
        </Text>

        <Heading variant="headingSection" color="fg" style={{ marginTop: t.spacing.md }}>
          {tr('settings.deleteAccount.title')}
        </Heading>

        <Text variant="bodyLarge" color="fgMuted" style={{ marginTop: t.spacing.lg }}>
          {tr('settings.deleteAccount.body')}
        </Text>

        <View
          style={{
            marginTop: t.spacing.xxl,
            backgroundColor: t.colors.bgRaised,
            borderRadius: t.radius.card,
            borderWidth: t.brand.border.hairline,
            borderColor: t.colors.borderSoft,
            paddingVertical: t.spacing.xl,
            paddingHorizontal: t.spacing.xl,
            gap: t.spacing.xl,
          }}
        >
          {reasons.map((reason, i) => (
            <ReasonRow key={i} text={reason} />
          ))}
        </View>

        <Text variant="bodySmall" color="fgFaint" style={{ marginTop: t.spacing.lg }}>
          {tr('settings.deleteAccount.caption')}
        </Text>

        <View style={{ flex: 1 }} />

        <CTAButton
          variant="destructive"
          label={tr('settings.deleteAccount.cta')}
          onPress={handleDeletePress}
        />

        <Pressable
          accessibilityRole="button"
          onPress={onKeep}
          style={({ pressed }) => ({
            marginTop: t.spacing.md,
            alignSelf: 'center',
            paddingVertical: t.spacing.sm,
            paddingHorizontal: t.spacing.base,
            opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
          })}
        >
          <Text variant="buttonLabelSocial" color="fgSubtle" align="center">
            {tr('settings.deleteAccount.keep')}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function ReasonRow({ text }: { text: string }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: t.spacing.base }}>
      <View
        style={{
          width: t.spacing.sm,
          height: t.spacing.sm,
          borderRadius: t.radius.pill,
          backgroundColor: t.colors.brand,
          marginTop: t.spacing.sm,
        }}
      />
      <Text variant="headingFeature" color="fg" style={{ flex: 1 }}>
        {text}
      </Text>
    </View>
  );
}
