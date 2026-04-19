import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Card, type CardTone } from './Card';
import { Text } from './Text';
import { useTheme } from '../theme';

export type ListRowTrailing = ReactNode | 'chevron' | 'none';

export type ListRowProps = {
  /** Main label. Rendered as `buttonLabelSocial`. */
  label: string;
  /** Sub-label rendered BELOW the label, `bodySmall` fgFaint. */
  sublabel?: string;
  /** Eyebrow rendered ABOVE the label, `metaLabel` fgFaint. */
  eyebrow?: string;
  /** Optional leading slot (icon, mood dot, etc). Centered, fixed-width. */
  leading?: ReactNode;
  /**
   * Trailing slot. Pass `'chevron'` for default ChevronRight, `'none'` /
   * `undefined` for no trailing, or any ReactNode for custom (value text,
   * toggle, badge...).
   */
  trailing?: ListRowTrailing;
  /** Card tone. Default `'plain'` — matches existing SettingsScreen rows. */
  tone?: Extract<CardTone, 'plain' | 'raised'>;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
  testID?: string;
};

export function ListRow({
  label,
  sublabel,
  eyebrow,
  leading,
  trailing,
  tone = 'plain',
  onPress,
  disabled = false,
  style,
  accessibilityLabel,
  testID,
}: ListRowProps) {
  const t = useTheme();

  const labelColor = disabled ? 'fgFaint' : 'fg';

  const trailingNode =
    trailing === 'chevron' ? (
      <ChevronRight size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
    ) : trailing === 'none' || trailing === undefined ? null : (
      trailing
    );

  return (
    <Card
      tone={tone}
      density="row"
      pressable={onPress ? { disabled } : false}
      onPress={disabled ? undefined : onPress}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
    >
      {leading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: t.iconSize.lg,
          }}
        >
          {leading}
        </View>
      ) : null}
      <View style={{ flex: 1, gap: t.spacing.xxs }}>
        {eyebrow ? (
          <Text variant="metaLabel" color="fgFaint">
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="buttonLabelSocial" color={labelColor}>
          {label}
        </Text>
        {sublabel ? (
          <Text variant="bodySmall" color="fgFaint">
            {sublabel}
          </Text>
        ) : null}
      </View>
      {trailingNode}
    </Card>
  );
}
