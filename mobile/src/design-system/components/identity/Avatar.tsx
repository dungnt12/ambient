import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type AvatarSize = 24 | 32 | 48 | 56;
export type AvatarVariant = 'initial' | 'empty';
export type AvatarTone = 'neutral' | 'brand';

export type AvatarProps = {
  size: AvatarSize;
  variant?: AvatarVariant;
  tone?: AvatarTone;
  initial?: string;
  label?: string;
  style?: ViewStyle;
};

export function Avatar({
  size,
  variant = 'initial',
  tone = 'neutral',
  initial,
  label,
  style,
}: AvatarProps) {
  const theme = useTheme();
  const isInitial = variant === 'initial';
  const initialBg = tone === 'brand' ? theme.colors.brand : theme.colors.bgInverse;
  const initialFg = tone === 'brand' ? theme.colors.fgOnBrand : theme.colors.bgRaised;
  const background = isInitial ? initialBg : theme.colors.bgMuted;
  const foreground = isInitial ? initialFg : theme.colors.fgGhost;
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
          borderWidth: isInitial ? 0 : theme.brand.border.hairline,
          borderColor: theme.colors.borderSoft,
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
