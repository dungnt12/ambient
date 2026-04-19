import { useRef, useState } from 'react';
import {
  Animated,
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
  onDevSkipAuth?: () => void;
};

export function OnboardingWelcomeScreen({
  onContinue,
  onSignIn,
  onDevSkipAuth,
}: OnboardingWelcomeScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(0);
  const devTapCount = useRef(0);
  const devTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDevTap = () => {
    if (!onDevSkipAuth) return;
    devTapCount.current += 1;
    if (devTapTimer.current) clearTimeout(devTapTimer.current);
    if (devTapCount.current >= 3) {
      devTapCount.current = 0;
      onDevSkipAuth();
      return;
    }
    devTapTimer.current = setTimeout(() => {
      devTapCount.current = 0;
    }, 600);
  };

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
        {onDevSkipAuth ? (
          <Pressable
            accessibilityLabel="dev-skip-auth"
            onPress={handleDevTap}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: t.spacing['5xl'],
              height: t.spacing['5xl'],
              zIndex: 10,
            }}
          />
        ) : null}
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
        >
          {STEPS.map((step, i) => (
            <Slide
              key={step}
              step={step}
              index={i}
              width={width}
              scrollX={scrollX}
              title={tr(`onboarding.${step}.title`)}
              body={tr(`onboarding.${step}.body`)}
            />
          ))}
        </Animated.ScrollView>

        <View
          style={{
            paddingHorizontal: t.layout.screenPaddingX,
            paddingBottom: t.spacing.base,
            gap: t.spacing.xl,
          }}
        >
          <PageDots total={STEPS.length} width={width} scrollX={scrollX} />
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
  index,
  width,
  scrollX,
  title,
  body,
}: {
  step: Step;
  index: number;
  width: number;
  scrollX: Animated.Value;
  title: string;
  body: string;
}) {
  const t = useTheme();
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const heroTranslate = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.25, 0, -width * 0.25],
    extrapolate: 'clamp',
  });
  const textTranslate = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.5, 0, -width * 0.5],
    extrapolate: 'clamp',
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [t.opacity.muted, t.opacity.full, t.opacity.muted],
    extrapolate: 'clamp',
  });
  return (
    <View
      style={{
        width,
        paddingHorizontal: t.layout.screenPaddingX,
        paddingTop: t.spacing['3xl'],
        gap: t.spacing.xxl,
      }}
    >
      <Animated.View
        style={{ alignItems: 'center', opacity, transform: [{ translateX: heroTranslate }] }}
      >
        <HeroIllustration step={step} />
      </Animated.View>
      <Animated.View
        style={{ gap: t.spacing.base, opacity, transform: [{ translateX: textTranslate }] }}
      >
        <Heading variant="displayHero">{title}</Heading>
        <Text variant="bodyLarge" color="fgSubtle">
          {body}
        </Text>
      </Animated.View>
    </View>
  );
}

function PageDots({
  total,
  width,
  scrollX,
}: {
  total: number;
  width: number;
  scrollX: Animated.Value;
}) {
  const t = useTheme();
  const dotSize = t.spacing.sm;
  const dotActiveWidth = t.spacing.xl;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: t.spacing.sm,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [dotSize, dotActiveWidth, dotSize],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [t.opacity.muted, t.opacity.full, t.opacity.muted],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={{
              width: dotWidth,
              height: dotSize,
              borderRadius: t.radius.pill,
              backgroundColor: t.colors.brand,
              opacity,
            }}
          />
        );
      })}
    </View>
  );
}
