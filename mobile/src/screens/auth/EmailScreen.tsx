import { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CaptchaRow,
  CTAButton,
  ScreenHeader,
  ScreenLayout,
  Text,
  TextButton,
  TextInput,
  useTheme,
} from '../../design-system';

export type EmailScreenProps = {
  onBack?: () => void;
  onSendCode?: (email: string) => void;
  onUseApple?: () => void;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailScreen({ onBack, onSendCode, onUseApple }: EmailScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState(false);

  const canSubmit = EMAIL_RE.test(email) && captcha;

  const handleSubmit = () => onSendCode?.(email);
  const handleUseApple = () => onUseApple?.();

  return (
    <ScreenLayout
      avoidKeyboard
      header={
        <ScreenHeader
          back={{ onPress: onBack }}
          overline={tr('auth.email.overline')}
          title={tr('auth.email.title')}
          body={tr('auth.email.body')}
        />
      }
      footer={
        <View style={{ paddingHorizontal: t.layout.screenPaddingX, paddingBottom: t.spacing.base }}>
          <TextButton label={tr('auth.email.useApple')} onPress={handleUseApple} />
        </View>
      }
    >
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xxl,
        }}
      >
        <View style={{ gap: t.spacing.base }}>
          <TextInput
            label={tr('auth.email.label')}
            value={email}
            onChangeText={setEmail}
            placeholder={tr('auth.email.placeholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />
          <CaptchaRow
            label={tr('auth.email.captcha')}
            metaLabel={tr('auth.email.captchaMeta')}
            checked={captcha}
            onToggle={setCaptcha}
          />
        </View>

        <CTAButton
          style={{ marginTop: t.spacing.lg }}
          label={tr('auth.email.cta')}
          variant="dark"
          disabled={!canSubmit}
          onPress={handleSubmit}
        />

        <Text
          variant="bodySmall"
          color="fgFaint"
          align="center"
          style={{ marginTop: t.spacing.lg }}
        >
          {tr('auth.email.footer')}
        </Text>
      </View>
    </ScreenLayout>
  );
}
