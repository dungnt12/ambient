import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CTAButton, Heading, Screen, Text, useTheme } from '../../design-system';

export type SignInScreenProps = {
  onApple?: () => void;
  onEmail?: () => void;
  onNewHere?: () => void;
  onHelp?: () => void;
};

export function SignInScreen({ onApple, onEmail, onNewHere, onHelp }: SignInScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']} padHorizontal background="bg">
      <View style={{ flex: 1, paddingTop: t.spacing.xxl }}>
        <Text variant="overline" color="fgFaint">
          {tr('auth.signIn.overline')}
        </Text>
        <View style={{ marginTop: t.spacing.sm, gap: t.spacing.base }}>
          <Heading variant="headingSection">{tr('auth.signIn.title')}</Heading>
          <Text variant="bodyLarge" color="fgMuted">
            {tr('auth.signIn.body')}
          </Text>
        </View>

        <View style={{ marginTop: t.spacing['3xl'], gap: t.spacing.md }}>
          <CTAButton label={tr('auth.signIn.apple')} variant="social-apple" onPress={onApple} />
          <CTAButton label={tr('auth.signIn.email')} variant="social-email" onPress={onEmail} />
        </View>

        <Text
          variant="bodySmall"
          color="fgFaint"
          style={{ marginTop: t.spacing.xl }}
          align="center"
        >
          {tr('auth.signIn.terms')}
        </Text>

        <View style={{ flex: 1 }} />

        <CTAButton label={tr('auth.signIn.newHere')} variant="secondary" onPress={onNewHere} />
        <Pressable
          accessibilityRole="button"
          onPress={onHelp}
          hitSlop={t.spacing.sm}
          style={({ pressed }) => ({
            marginTop: t.spacing.base,
            opacity: pressed ? t.opacity.pressed : t.opacity.full,
          })}
        >
          <Text variant="buttonLabelSocial" color="fgSubtle" align="center">
            {tr('auth.signIn.help')}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
