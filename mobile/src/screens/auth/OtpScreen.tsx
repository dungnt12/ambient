import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CTAButton,
  OtpInput,
  EditorialHeader,
  ScreenLayout,
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

  const handleVerify = () => onVerify?.(code);

  return (
    <ScreenLayout
      avoidKeyboard
      header={
        <EditorialHeader
          back={{ onPress: onBack }}
          overline={tr('auth.otp.overline')}
          title={tr('auth.otp.title')}
          body={`${tr('auth.otp.bodyPrefix')} ${email}`}
        />
      }
      footer={
        <Text
          variant="buttonLabelSocial"
          color="fgSubtle"
          align="center"
          style={{
            paddingHorizontal: t.layout.screenPaddingX,
            paddingBottom: t.spacing.base,
          }}
        >
          {tr('auth.otp.resendIn', { time: formatted })}
        </Text>
      }
    >
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xxl,
        }}
      >
        <View style={{ gap: t.spacing.base }}>
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
          onPress={handleVerify}
        />

        <Text
          variant="bodySmall"
          color="fgFaint"
          align="center"
          style={{ marginTop: t.spacing.lg }}
        >
          {tr('auth.otp.spamHint')}
        </Text>
      </View>
    </ScreenLayout>
  );
}
