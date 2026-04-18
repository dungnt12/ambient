import { ActivityIndicator, Pressable, type PressableProps, type ViewStyle } from 'react-native';
import { Mail } from 'lucide-react-native';
import { Text } from '../Text';
import { AppleLogo } from '../../icons';
import { useTheme } from '../../theme';

export type CTAButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'destructive'
  | 'social-apple'
  | 'social-email'
  | 'dark';

export type CTAButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: CTAButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function CTAButton({
  label,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  ...pressableProps
}: CTAButtonProps) {
  const theme = useTheme();
  const isSocial = variant === 'social-apple' || variant === 'social-email';
  const radius = isSocial ? theme.radius.buttonPill : theme.radius.button;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      {...pressableProps}
      style={({ pressed }) => {
        const palette = resolvePalette(theme, variant);
        const opacity = disabled
          ? theme.opacity.disabled
          : pressed && !loading
            ? theme.opacity.pressed
            : theme.opacity.full;
        return [
          {
            height: theme.layout.ctaHeight,
            borderRadius: radius,
            paddingHorizontal: theme.spacing.lg,
            backgroundColor: palette.background,
            borderColor: palette.border,
            borderWidth: palette.border === 'transparent' ? 0 : theme.brand.border.hairline,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.sm,
            width: fullWidth ? '100%' : undefined,
            alignSelf: fullWidth ? 'stretch' : 'flex-start',
            opacity,
          },
          style,
        ];
      }}
    >
      {loading ? (
        <ActivityIndicator color={resolvePalette(theme, variant).foreground} size="small" />
      ) : (
        <ButtonContent variant={variant} label={label} />
      )}
    </Pressable>
  );
}

function ButtonContent({ label, variant }: { label: string; variant: CTAButtonVariant }) {
  const theme = useTheme();
  const palette = resolvePalette(theme, variant);
  const isSocialApple = variant === 'social-apple';
  const isSocialEmail = variant === 'social-email';
  const isSocial = isSocialApple || isSocialEmail;

  return (
    <>
      {isSocialApple ? (
        <AppleLogo color={palette.foreground} size={theme.iconSize.social} />
      ) : isSocialEmail ? (
        <Mail
          color={palette.foreground}
          size={theme.iconSize.social}
          strokeWidth={theme.stroke.standard}
        />
      ) : null}
      <Text
        variant={isSocial ? 'buttonLabelSocial' : 'buttonLabel'}
        style={{ color: palette.foreground }}
      >
        {label}
      </Text>
    </>
  );
}

type Palette = { background: string; border: string; foreground: string };

function resolvePalette(theme: ReturnType<typeof useTheme>, variant: CTAButtonVariant): Palette {
  switch (variant) {
    case 'primary':
      return {
        background: theme.colors.brand,
        border: 'transparent',
        foreground: theme.colors.fgOnBrand,
      };
    case 'secondary':
      return {
        background: theme.colors.bgCard,
        border: theme.colors.border,
        foreground: theme.colors.fg,
      };
    case 'tertiary':
      return {
        background: 'transparent',
        border: 'transparent',
        foreground: theme.colors.fg,
      };
    case 'destructive':
      return {
        background: theme.colors.error,
        border: 'transparent',
        foreground: theme.colors.fgOnBrand,
      };
    case 'social-apple':
    case 'dark':
      return {
        background: theme.colors.bgInverse,
        border: 'transparent',
        foreground: theme.colors.bgRaised,
      };
    case 'social-email':
      return {
        background: theme.colors.bgRaised,
        border: theme.colors.border,
        foreground: theme.colors.fg,
      };
  }
}
