import { Pressable, View, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../../theme';

export type CheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
};

const SIZE = 24;

export function Checkbox({ value, onChange, disabled = false, style }: CheckboxProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onChange(!value)}
      hitSlop={8}
      style={({ pressed }) => [
        {
          width: SIZE,
          height: SIZE,
          borderRadius: theme.radius.xs,
          backgroundColor: value ? theme.colors.bgCard : 'transparent',
          borderColor: value ? theme.colors.brand : theme.colors.border,
          borderWidth: theme.brand.border.hairline * 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled
            ? theme.opacity.disabled
            : pressed
              ? theme.opacity.pressedSubtle
              : theme.opacity.full,
        },
        style,
      ]}
    >
      {value ? (
        <View>
          <Check
            size={theme.iconSize.sm}
            strokeWidth={theme.stroke.bold}
            color={theme.colors.brand}
          />
        </View>
      ) : null}
    </Pressable>
  );
}
