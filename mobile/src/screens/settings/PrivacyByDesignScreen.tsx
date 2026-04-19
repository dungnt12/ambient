import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, CTAButton, Heading, ScreenLayout, Text, useTheme } from '../../design-system';

export type PrivacyByDesignScreenProps = {
  onAcknowledge: () => void;
  onReadPolicy: () => void;
};

type StepKey = 'write' | 'reads' | 'senses' | 'choose' | 'neverSeen';

const STEPS: StepKey[] = ['write', 'reads', 'senses', 'choose', 'neverSeen'];

// No back button — the primary CTA ("đã hiểu") is the dismiss affordance.
// A secondary back chevron would be redundant and muddy the read-and-ack
// flow this screen is for.
export function PrivacyByDesignScreen({ onAcknowledge, onReadPolicy }: PrivacyByDesignScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const footer = (
    <View style={{ paddingHorizontal: t.layout.screenPaddingX }}>
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
  );

  return (
    <ScreenLayout footer={footer}>
      <View style={{ paddingHorizontal: t.layout.screenPaddingX, gap: t.spacing.xl }}>
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
      </View>
    </ScreenLayout>
  );
}

function FlowCard({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  // Prose flow card: white surface + xl padding — preserves the editorial
  // feel of the steps list. Overrides Card's default ivory + rhythm.card.
  return (
    <Card
      style={{
        backgroundColor: t.colors.bgCard,
        paddingHorizontal: t.spacing.xl,
        paddingVertical: t.spacing.xl,
        gap: t.spacing.lg,
      }}
    >
      {children}
    </Card>
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
