import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type FilterChipProps = {
  label?: string;
  selected: boolean;
  onPress: () => void;
  leading?: ReactNode;
  accessibilityLabel?: string;
};

export function FilterChip({
  label,
  selected,
  onPress,
  leading,
  accessibilityLabel,
}: FilterChipProps) {
  const t = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      hitSlop={t.spacing.xs}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.xs,
        height: t.layout.segmentHeight,
        paddingHorizontal: t.spacing.base,
        borderRadius: t.radius.pill,
        borderWidth: t.brand.border.hairline,
        backgroundColor: selected ? t.colors.brand : t.colors.bgCard,
        borderColor: selected ? t.colors.brand : t.colors.borderSoft,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      {leading ? <View>{leading}</View> : null}
      {label ? (
        <Text variant="label" color={selected ? 'fgOnBrand' : 'fgMuted'}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
