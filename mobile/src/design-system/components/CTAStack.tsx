import { Pressable, View, type ViewStyle } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';

export type CTASecondary = {
  /** Already-translated label. */
  label: string;
  onPress: () => void;
  /** `subtle` (default): olive text. `faint`: stone text. */
  tone?: 'subtle' | 'faint';
};

export type CTAStackProps = {
  /** A single CTAButton element (or compatible primary action). */
  primary: React.ReactElement;
  secondary?: CTASecondary;
  style?: ViewStyle;
};

/**
 * Footer rhythm used across settings / auth / ambient screens:
 * full-width primary CTA with a centered subtle text link beneath.
 *
 * Strings come in pre-translated — the component never calls `t()`.
 */
export function CTAStack({ primary, secondary, style }: CTAStackProps) {
  const t = useTheme();
  const tone: ColorToken = secondary?.tone === 'faint' ? 'fgFaint' : 'fgSubtle';

  return (
    <View style={style}>
      {primary}
      {secondary ? (
        <Pressable
          accessibilityRole="button"
          onPress={secondary.onPress}
          hitSlop={t.spacing.sm}
          style={({ pressed }) => ({
            marginTop: t.spacing.sm,
            alignSelf: 'center',
            paddingVertical: t.spacing.sm,
            paddingHorizontal: t.spacing.base,
            opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
          })}
        >
          <Text variant="buttonLabelSocial" color={tone} align="center">
            {secondary.label}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
