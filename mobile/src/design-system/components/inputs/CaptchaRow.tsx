import { Pressable, View, type ViewStyle } from 'react-native';
import { Shield } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { Checkbox } from './Checkbox';

export type CaptchaRowProps = {
  label: string;
  metaLabel: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
};

const CONTAINER_HEIGHT = 56;

export function CaptchaRow({
  label,
  metaLabel,
  checked,
  onToggle,
  disabled = false,
  style,
}: CaptchaRowProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => onToggle(!checked)}
      style={({ pressed }) => [
        {
          width: '100%',
          height: CONTAINER_HEIGHT,
          borderRadius: theme.radius.input,
          backgroundColor: theme.colors.bgRaised,
          borderColor: theme.colors.border,
          borderWidth: theme.brand.border.hairline,
          paddingHorizontal: theme.spacing.base,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
          opacity: disabled
            ? theme.opacity.disabled
            : pressed
              ? theme.opacity.pressedSubtle
              : theme.opacity.full,
        },
        style,
      ]}
    >
      <Checkbox value={checked} onChange={onToggle} disabled={disabled} />
      <Text variant="bodyStandard" color="fg" style={{ flex: 1 }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
        <Shield
          size={theme.iconSize.md}
          strokeWidth={theme.stroke.standard}
          color={theme.colors.fgFaint}
        />
        <Text variant="bodySmall" color="fgFaint">
          {metaLabel}
        </Text>
      </View>
    </Pressable>
  );
}
