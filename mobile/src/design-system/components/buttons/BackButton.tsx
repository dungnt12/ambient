import { Pressable, type PressableProps, View, type ViewStyle } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../theme';

export type BackButtonVariant = 'ghost' | 'filled';

export type BackButtonProps = Omit<PressableProps, 'style'> & {
  variant?: BackButtonVariant;
  style?: ViewStyle;
};

const TAP_SIZE = 56;
const INNER_SIZE = 44;

export function BackButton({ variant = 'ghost', style, ...pressableProps }: BackButtonProps) {
  const theme = useTheme();
  const filled = variant === 'filled';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back"
      hitSlop={8}
      {...pressableProps}
      style={({ pressed }) => [
        {
          width: TAP_SIZE,
          height: TAP_SIZE,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? theme.opacity.pressedGhost : theme.opacity.full,
        },
        style,
      ]}
    >
      {filled ? (
        <View
          style={{
            width: INNER_SIZE,
            height: INNER_SIZE,
            borderRadius: INNER_SIZE / 2,
            backgroundColor: theme.colors.bgCard,
            borderWidth: theme.brand.border.hairline,
            borderColor: theme.colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft
            color={theme.colors.fg}
            size={theme.iconSize.lg}
            strokeWidth={theme.stroke.standard}
          />
        </View>
      ) : (
        <ArrowLeft
          color={theme.colors.fg}
          size={theme.iconSize.lg}
          strokeWidth={theme.stroke.standard}
        />
      )}
    </Pressable>
  );
}
