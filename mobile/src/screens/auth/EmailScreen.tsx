import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BackButton,
  CaptchaRow,
  CTAButton,
  Heading,
  Screen,
  Text,
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

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={{ paddingHorizontal: t.spacing.sm, paddingTop: t.spacing.sm }}>
          <BackButton variant="filled" onPress={onBack} />
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: t.spacing.base,
          }}
        >
          <Text variant="overline" color="fgFaint">
            {tr('auth.email.overline')}
          </Text>
          <View style={{ marginTop: t.spacing.sm, gap: t.spacing.base }}>
            <Heading variant="headingSection">{tr('auth.email.title')}</Heading>
            <Text variant="bodyLarge" color="fgMuted">
              {tr('auth.email.body')}
            </Text>
          </View>

          <View style={{ marginTop: t.spacing.xxl, gap: t.spacing.base }}>
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
            onPress={() => onSendCode?.(email)}
          />

          <Text
            variant="bodySmall"
            color="fgFaint"
            align="center"
            style={{ marginTop: t.spacing.lg }}
          >
            {tr('auth.email.footer')}
          </Text>

          <View style={{ flex: 1 }} />

          <Pressable
            accessibilityRole="button"
            onPress={onUseApple}
            hitSlop={t.spacing.sm}
            style={({ pressed }) => ({
              paddingBottom: t.spacing.base,
              opacity: pressed ? t.opacity.pressed : t.opacity.full,
            })}
          >
            <Text variant="buttonLabelSocial" color="fgSubtle" align="center">
              {tr('auth.email.useApple')}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
