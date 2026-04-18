import { useRef, useState } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { CTAButton, Heading, HeroIllustration, Screen, Text, useTheme } from '../../design-system';

type Step = 'welcome' | 'signal' | 'hints';

const STEPS: readonly Step[] = ['welcome', 'signal', 'hints'] as const;
const STEPS_WITH_SIGN_IN: readonly Step[] = ['welcome', 'hints'] as const;

export type OnboardingWelcomeScreenProps = {
  onContinue?: (step: Step) => void;
  onSignIn?: () => void;
};

export function OnboardingWelcomeScreen({ onContinue, onSignIn }: OnboardingWelcomeScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [active, setActive] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== active) setActive(next);
  };

  const handleContinue = () => {
    const current = STEPS[active];
    if (active < STEPS.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (active + 1), animated: true });
    } else {
      onContinue?.(current);
    }
  };

  const currentStep = STEPS[active];
  const showSignIn = STEPS_WITH_SIGN_IN.includes(currentStep);

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
        >
          {STEPS.map((step) => (
            <Slide
              key={step}
              step={step}
              width={width}
              title={tr(`onboarding.${step}.title`)}
              body={tr(`onboarding.${step}.body`)}
            />
          ))}
        </ScrollView>

        <View
          style={{
            paddingHorizontal: t.layout.screenPaddingX,
            paddingBottom: t.spacing.base,
            gap: t.spacing.xl,
          }}
        >
          <PageDots total={STEPS.length} active={active} />
          <CTAButton
            label={tr(`onboarding.${currentStep}.cta`)}
            variant="primary"
            onPress={handleContinue}
          />
          <Pressable
            accessibilityRole="button"
            onPress={onSignIn}
            disabled={!showSignIn}
            hitSlop={t.spacing.sm}
            style={({ pressed }) => ({
              opacity: !showSignIn ? t.opacity.full : pressed ? t.opacity.pressed : t.opacity.full,
            })}
          >
            <Text
              variant="buttonLabelSocial"
              color="fgFaint"
              align="center"
              style={{ opacity: showSignIn ? t.opacity.full : t.opacity.disabled }}
            >
              {tr('onboarding.signIn')}
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

function Slide({
  step,
  width,
  title,
  body,
}: {
  step: Step;
  width: number;
  title: string;
  body: string;
}) {
  const t = useTheme();
  return (
    <View
      style={{
        width,
        paddingHorizontal: t.layout.screenPaddingX,
        paddingTop: t.spacing['3xl'],
        gap: t.spacing['4xl'],
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <HeroIllustration step={step} />
      </View>
      <View style={{ gap: t.spacing.base }}>
        <Heading variant="displayHero">{title}</Heading>
        <Text variant="bodyLarge" color="fgSubtle">
          {body}
        </Text>
      </View>
    </View>
  );
}

function PageDots({ total, active }: { total: number; active: number }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: t.spacing.sm,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <View
            key={i}
            style={{
              width: t.spacing.sm,
              height: t.spacing.sm,
              borderRadius: t.spacing.xs,
              backgroundColor: isActive ? t.colors.brand : t.colors.ringSoft,
            }}
          />
        );
      })}
    </View>
  );
}
