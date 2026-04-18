import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CTAButton,
  CTAStack,
  ScreenHeader,
  ScreenLayout,
  Text,
  useTheme,
} from '../../design-system';

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

  const footer = (
    <CTAStack
      primary={
        <CTAButton
          variant="destructive"
          label={tr('settings.deleteAccount.cta')}
          onPress={handleDeletePress}
        />
      }
      secondary={{ label: tr('settings.deleteAccount.keep'), onPress: onKeep }}
      style={{ paddingHorizontal: t.layout.screenPaddingX }}
    />
  );

  return (
    <ScreenLayout
      header={
        <ScreenHeader
          overline={tr('settings.deleteAccount.eyebrow')}
          title={tr('settings.deleteAccount.title')}
        />
      }
      footer={footer}
    >
      <View style={{ paddingHorizontal: t.layout.screenPaddingX }}>
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
      </View>
    </ScreenLayout>
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
