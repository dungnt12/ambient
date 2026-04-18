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

export type SignInScreenProps = {
  onApple?: () => void;
  onEmail?: () => void;
  onNewHere?: () => void;
  onHelp?: () => void;
};

export function SignInScreen({ onApple, onEmail, onNewHere, onHelp }: SignInScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const handleNewHere = () => onNewHere?.();
  const handleHelp = () => onHelp?.();

  return (
    <ScreenLayout
      header={
        <View style={{ paddingTop: t.spacing.xxl }}>
          <ScreenHeader
            overline={tr('auth.signIn.overline')}
            title={tr('auth.signIn.title')}
            body={tr('auth.signIn.body')}
          />
        </View>
      }
      footer={
        <CTAStack
          primary={
            <CTAButton
              label={tr('auth.signIn.newHere')}
              variant="secondary"
              onPress={handleNewHere}
            />
          }
          secondary={{ label: tr('auth.signIn.help'), onPress: handleHelp }}
          style={{ paddingHorizontal: t.layout.screenPaddingX, paddingBottom: t.spacing.base }}
        />
      }
    >
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing['3xl'],
          gap: t.spacing.md,
        }}
      >
        <CTAButton label={tr('auth.signIn.apple')} variant="social-apple" onPress={onApple} />
        <CTAButton label={tr('auth.signIn.email')} variant="social-email" onPress={onEmail} />
      </View>

      <Text
        variant="bodySmall"
        color="fgFaint"
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          marginTop: t.spacing.xl,
        }}
        align="center"
      >
        {tr('auth.signIn.terms')}
      </Text>
    </ScreenLayout>
  );
}
