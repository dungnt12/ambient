import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { MoodGlyph } from './MoodGlyph';
import { type MoodLevel } from './types';

export type MoodPickerProps = {
  value: MoodLevel | null;
  onChange: (value: MoodLevel) => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

const MOODS: readonly MoodLevel[] = [1, 2, 3, 4, 5];
const PRESS_SCALE = 1.06;

export function MoodPicker({ value, onChange, style, accessibilityLabel }: MoodPickerProps) {
  const theme = useTheme();
  const mp = theme.brand.moodPicker;
  const { duration, easing, spring } = theme.motion;
  // Keep the glyph slot at the larger height always so mood 5 (taller rays)
  // doesn't shift the column height when selected.
  const slotHeight = mp.slotHeightLarge;

  // Per-dot press-pulse (brief tap feedback). Native-driven.
  const pressAnims = useRef(MOODS.map(() => new Animated.Value(0))).current;
  // Per-dot selectedness 0→1. Native-driven — drives scale (transform) and
  // opacity of the brand-colored overlay layer only.
  const selectedAnims = useRef(MOODS.map((m) => new Animated.Value(value === m ? 1 : 0))).current;
  // Glyph slot opacity/translate for the crossfade. Native-driven.
  const glyphAnim = useRef(new Animated.Value(value !== null ? 1 : 0)).current;
  // The mood currently painted in the slot — held one tick behind `value`
  // so the outgoing glyph can fade before the incoming one swaps in.
  const [renderedMood, setRenderedMood] = useState<MoodLevel | null>(value);

  // Drive each dot's selectedness with a gentle spring whenever `value` changes.
  useEffect(() => {
    MOODS.forEach((mood, idx) => {
      Animated.spring(selectedAnims[idx], {
        toValue: value === mood ? 1 : 0,
        ...spring.gentle,
        useNativeDriver: true,
      }).start();
    });
  }, [value, selectedAnims, spring.gentle]);

  // Crossfade the glyph: fade out the old, swap, fade in the new.
  useEffect(() => {
    if (value === renderedMood) return;
    const hadMood = renderedMood !== null;
    Animated.timing(glyphAnim, {
      toValue: 0,
      duration: hadMood ? duration.micro : 0,
      easing: easing.exit,
      useNativeDriver: true,
    }).start(() => {
      setRenderedMood(value);
      Animated.timing(glyphAnim, {
        toValue: value !== null ? 1 : 0,
        duration: duration.base,
        easing: easing.entrance,
        useNativeDriver: true,
      }).start();
    });
  }, [value, renderedMood, glyphAnim, duration.micro, duration.base, easing.entrance, easing.exit]);

  const handlePress = (mood: MoodLevel, index: number) => {
    const anim = pressAnims[index];
    anim.stopAnimation();
    anim.setValue(0);
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: duration.instant,
        easing: easing.standard,
        useNativeDriver: true,
      }),
      Animated.spring(anim, { toValue: 0, ...spring.gentle, useNativeDriver: true }),
    ]).start();
    onChange(mood);
  };

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[{ alignItems: 'center', gap: mp.columnGap }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: mp.dotGap }}>
        {MOODS.map((mood, index) => (
          <MoodDot
            key={mood}
            selected={value === mood}
            selectedAnim={selectedAnims[index]}
            pressAnim={pressAnims[index]}
            onPress={() => handlePress(mood, index)}
          />
        ))}
      </View>
      <Animated.View
        style={{
          width: mp.slotWidth,
          height: slotHeight,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: glyphAnim,
          transform: [
            {
              translateY: glyphAnim.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }),
            },
            {
              scale: glyphAnim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }),
            },
          ],
        }}
      >
        {renderedMood ? <MoodGlyph mood={renderedMood} selected /> : null}
      </Animated.View>
    </View>
  );
}

type MoodDotProps = {
  selected: boolean;
  selectedAnim: Animated.Value;
  pressAnim: Animated.Value;
  onPress: () => void;
};

function MoodDot({ selected, selectedAnim, pressAnim, onPress }: MoodDotProps) {
  const theme = useTheme();
  const mp = theme.brand.moodPicker;

  // Selected dot grows from dotSize to dotSelectedSize via scale (transform,
  // native-driver compatible) rather than animating width/height directly.
  const selectedScale = selectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [mp.dotSize / mp.dotSelectedSize, 1],
  });
  const pressScale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, PRESS_SCALE],
  });

  const layerStyle = {
    position: 'absolute' as const,
    width: mp.dotSelectedSize,
    height: mp.dotSelectedSize,
    borderRadius: mp.dotRadius,
  };

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      hitSlop={mp.dotGap / 2}
      style={{
        width: mp.dotSelectedSize,
        height: mp.dotSelectedSize,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.View
        style={{
          width: mp.dotSelectedSize,
          height: mp.dotSelectedSize,
          transform: [{ scale: selectedScale }, { scale: pressScale }],
        }}
      >
        {/* Idle base — always rendered. */}
        <View
          style={{
            ...layerStyle,
            backgroundColor: theme.colors.bgMuted,
            borderWidth: mp.dotBorder,
            borderColor: theme.colors.borderSoft,
          }}
        />
        {/* Brand overlay — fades in as the dot becomes selected. */}
        <Animated.View
          style={{
            ...layerStyle,
            backgroundColor: theme.colors.brand,
            borderWidth: mp.dotSelectedBorder,
            borderColor: theme.colors.ringSoft,
            opacity: selectedAnim,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}
