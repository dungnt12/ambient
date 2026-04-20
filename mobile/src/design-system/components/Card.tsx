import type { ReactNode } from 'react';
import {
  Pressable,
  View,
  type AccessibilityRole,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

export type CardTone = 'raised' | 'brand' | 'plain';
export type CardDensity = 'card' | 'row' | 'comfort';

export type CardProps = {
  children: ReactNode;
  /** Visual tone. Default: 'raised' — ivory card on parchment. */
  tone?: CardTone;
  /** Internal rhythm. 'card' = rhythm.card, 'row' = rhythm.row. Default: 'card'. */
  density?: CardDensity;
  /** Pass `true` to wrap in a Pressable, or pass Pressable props to customize. */
  pressable?: boolean | Omit<PressableProps, 'children' | 'style'>;
  onPress?: () => void;
  /** Escape hatch — override specific props. Use sparingly. */
  style?: ViewStyle;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  testID?: string;
};

export function Card({
  children,
  tone = 'raised',
  density = 'card',
  pressable,
  onPress,
  style,
  accessibilityRole,
  accessibilityLabel,
  testID,
}: CardProps) {
  const t = useTheme();

  const toneStyle: ViewStyle =
    tone === 'brand'
      ? { backgroundColor: t.colors.brand }
      : tone === 'plain'
        ? {
            backgroundColor: t.colors.bg,
            borderColor: t.colors.borderSoft,
            borderWidth: t.brand.border.hairline,
          }
        : {
            backgroundColor: t.colors.bgRaised,
            borderColor: t.colors.borderSoft,
            borderWidth: t.brand.border.hairline,
          };

  const rhythmSlot =
    density === 'row' ? t.rhythm.row : density === 'comfort' ? t.rhythm.comfort : t.rhythm.card;
  const radius = density === 'row' ? t.radius.base : t.radius.card;

  const baseStyle: ViewStyle = {
    borderRadius: radius,
    paddingHorizontal: rhythmSlot.padH,
    paddingVertical: rhythmSlot.padV,
    gap: rhythmSlot.gap,
    ...toneStyle,
  };

  const isPressable = pressable === true || typeof pressable === 'object' || Boolean(onPress);

  if (isPressable) {
    const pressableProps = typeof pressable === 'object' ? pressable : undefined;
    return (
      <Pressable
        {...pressableProps}
        onPress={onPress ?? pressableProps?.onPress}
        accessibilityRole={accessibilityRole ?? pressableProps?.accessibilityRole ?? 'button'}
        accessibilityLabel={accessibilityLabel ?? pressableProps?.accessibilityLabel}
        testID={testID ?? pressableProps?.testID}
        style={({ pressed }) => [
          baseStyle,
          { opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[baseStyle, style]}
    >
      {children}
    </View>
  );
}
