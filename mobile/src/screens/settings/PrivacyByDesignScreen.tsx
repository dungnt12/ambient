import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BackButton, CTAButton, Heading, Screen, Text, useTheme } from '../../design-system';

export type PrivacyByDesignScreenProps = {
  onAcknowledge: () => void;
  onReadPolicy: () => void;
  onClose?: () => void;
};

type StepKey = 'write' | 'reads' | 'senses' | 'choose' | 'neverSeen';

const STEPS: StepKey[] = ['write', 'reads', 'senses', 'choose', 'neverSeen'];

export function PrivacyByDesignScreen({
  onAcknowledge,
  onReadPolicy,
  onClose,
}: PrivacyByDesignScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      {onClose ? (
        <View style={{ paddingHorizontal: t.spacing.sm }}>
          <BackButton variant="filled" onPress={onClose} />
        </View>
      ) : null}
      <View style={{ flex: 1, paddingHorizontal: t.layout.screenPaddingX, gap: t.spacing.xl }}>
        <View style={{ gap: t.spacing.md }}>
          <Text variant="overline" color="fgFaint">
            {tr('settings.privacy.eyebrow')}
          </Text>
          <Heading variant="headingSection">{tr('settings.privacy.title')}</Heading>
          <Text variant="bodyLarge" color="fgSubtle">
            {tr('settings.privacy.body')}
          </Text>
        </View>

        <FlowCard>
          {STEPS.map((key, index) => (
            <FlowStep
              key={key}
              eyebrow={tr(`settings.privacy.steps.${key}.eyebrow`)}
              description={tr(`settings.privacy.steps.${key}.description`)}
              isLast={index === STEPS.length - 1}
            />
          ))}
        </FlowCard>

        <View style={{ flex: 1 }} />

        <CTAButton variant="dark" label={tr('settings.privacy.cta')} onPress={onAcknowledge} />
        <Pressable
          accessibilityRole="button"
          onPress={onReadPolicy}
          style={({ pressed }) => ({
            alignSelf: 'center',
            paddingVertical: t.spacing.sm,
            opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
          })}
        >
          <Text variant="bodySmall" color="fgMuted" align="center">
            {tr('settings.privacy.readPolicy')}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function FlowCard({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: t.colors.bgCard,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        padding: t.spacing.xl,
        gap: t.spacing.lg,
      }}
    >
      {children}
    </View>
  );
}

function FlowStep({
  eyebrow,
  description,
  isLast,
}: {
  eyebrow: string;
  description: string;
  isLast: boolean;
}) {
  const t = useTheme();
  return (
    <View style={{ gap: t.spacing.xs, paddingBottom: isLast ? 0 : t.spacing.xs }}>
      <Text variant="overline" color="fgFaint">
        {eyebrow}
      </Text>
      <Text variant="bodyStandard" color="fgSubtle">
        {description}
      </Text>
    </View>
  );
}
