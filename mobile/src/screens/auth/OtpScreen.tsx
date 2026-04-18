import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BackButton,
  CTAButton,
  Heading,
  OtpInput,
  Screen,
  Text,
  useTheme,
} from '../../design-system';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export type OtpScreenProps = {
  email: string;
  onBack?: () => void;
  onVerify?: (code: string) => void;
};

export function OtpScreen({ email, onBack, onVerify }: OtpScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  // Resend countdown — single interval, cleared on unmount.
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const canSubmit = code.length === OTP_LENGTH;
  const formatted = `0:${seconds.toString().padStart(2, '0')}`;

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
            {tr('auth.otp.overline')}
          </Text>
          <View style={{ marginTop: t.spacing.sm, gap: t.spacing.base }}>
            <Heading variant="headingSection">{tr('auth.otp.title')}</Heading>
            <Text variant="bodyLarge" color="fgMuted">
              {tr('auth.otp.bodyPrefix')} {email}
            </Text>
          </View>

          <View style={{ marginTop: t.spacing.xxl, gap: t.spacing.base }}>
            <Text variant="overline" color="fgFaint">
              {tr('auth.otp.label')}
            </Text>
            <OtpInput value={code} onChange={setCode} length={OTP_LENGTH} autoFocus />
          </View>

          <CTAButton
            style={{ marginTop: t.spacing.lg }}
            label={tr('auth.otp.cta')}
            variant="primary"
            disabled={!canSubmit}
            onPress={() => onVerify?.(code)}
          />

          <Text
            variant="bodySmall"
            color="fgFaint"
            align="center"
            style={{ marginTop: t.spacing.lg }}
          >
            {tr('auth.otp.spamHint')}
          </Text>

          <View style={{ flex: 1 }} />

          <Text
            variant="buttonLabelSocial"
            color="fgSubtle"
            align="center"
            style={{ paddingBottom: t.spacing.base }}
          >
            {tr('auth.otp.resendIn', { time: formatted })}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
