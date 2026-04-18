import { useRef } from 'react';
import { Animated, Pressable, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
};

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 20;
const THUMB_INSET = 4;
const OFF_LEFT = THUMB_INSET;
const ON_LEFT = TRACK_WIDTH - THUMB_SIZE - THUMB_INSET;
const ANIM_DURATION = 200;

export function Toggle({ value, onChange, disabled = false, style }: ToggleProps) {
  const theme = useTheme();
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Drive animation on every render if value changed. Using useRef-based compare to avoid
  // useEffect state-sync pattern; Animated.timing is idempotent for the same target.
  Animated.timing(anim, {
    toValue: value ? 1 : 0,
    duration: ANIM_DURATION,
    useNativeDriver: false,
  }).start();

  const thumbLeft = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [OFF_LEFT, ON_LEFT],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onChange(!value)}
      style={({ pressed }) => [
        {
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          borderRadius: theme.radius.pill,
          backgroundColor: value ? theme.colors.brand : theme.colors.bgCard,
          borderColor: value ? theme.colors.brand : theme.colors.border,
          borderWidth: theme.brand.border.hairline,
          justifyContent: 'center',
          opacity: disabled
            ? theme.opacity.disabled
            : pressed
              ? theme.opacity.pressed
              : theme.opacity.full,
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.bgRaised,
          left: thumbLeft,
        }}
      />
    </Pressable>
  );
}
