import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type AvatarSize = 24 | 32 | 48;
export type AvatarVariant = 'initial' | 'empty';

export type AvatarProps = {
  size: AvatarSize;
  variant?: AvatarVariant;
  initial?: string;
  label?: string;
  style?: ViewStyle;
};

export function Avatar({ size, variant = 'initial', initial, label, style }: AvatarProps) {
  const theme = useTheme();
  const isInitial = variant === 'initial';
  const background = isInitial ? theme.colors.bgInverse : theme.colors.bgMuted;
  const foreground = isInitial ? theme.colors.bgRaised : theme.colors.fgGhost;
  const letter = (initial ?? '').trim().slice(0, 1).toUpperCase();

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={label}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: background,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {isInitial && letter ? (
        <Text
          style={{
            fontFamily: theme.fontFamily.sansSemibold,
            fontSize: size / 2,
            lineHeight: size / 2,
            color: foreground,
            textAlign: 'center',
          }}
        >
          {letter}
        </Text>
      ) : null}
    </View>
  );
}
