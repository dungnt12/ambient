import { Pressable, type ViewStyle } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';

export type TextButtonProps = {
  /** Already-translated label. */
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
  align?: 'left' | 'center' | 'right';
  style?: ViewStyle;
};

/**
 * Minimal text-only button — used for low-emphasis actions like "Keep account",
 * "Delete entry", inline cancels. Not a CTA; use `CTAButton` for primary actions.
 */
export function TextButton({
  label,
  onPress,
  variant = 'default',
  align = 'center',
  style,
}: TextButtonProps) {
  const t = useTheme();
  const color: ColorToken = variant === 'destructive' ? 'error' : 'fgSubtle';

  const alignSelf: ViewStyle['alignSelf'] =
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      hitSlop={t.spacing.sm}
      style={({ pressed }) => [
        {
          alignSelf,
          paddingVertical: t.spacing.sm,
          paddingHorizontal: t.spacing.base,
          opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
        },
        style,
      ]}
    >
      <Text variant="buttonLabelSocial" color={color} align={align}>
        {label}
      </Text>
    </Pressable>
  );
}
