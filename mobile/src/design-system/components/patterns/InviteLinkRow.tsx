import { Pressable, View, type ViewStyle } from 'react-native';
import { Hash, Copy, Check } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export type InviteLinkRowProps = {
  url: string;
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: () => void;
  style?: ViewStyle;
};

const COPY_HIT_SLOP = 8;

export function InviteLinkRow({
  url,
  copyLabel = 'Copy invite link',
  copiedLabel = 'Copied',
  onCopy,
  style,
}: InviteLinkRowProps) {
  const theme = useTheme();
  const { copied, copy } = useCopyToClipboard(url);

  const handlePress = () => {
    void copy();
    onCopy?.();
  };

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          backgroundColor: theme.colors.bgCard,
          borderColor: theme.colors.border,
          borderWidth: theme.brand.border.hairline,
          borderRadius: theme.radius.base,
          padding: theme.spacing.base,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
        },
        style,
      ]}
    >
      <Hash
        size={theme.iconSize.base}
        strokeWidth={theme.stroke.standard}
        color={theme.colors.fgMuted}
      />
      <Text variant="mono" color="fgMuted" numberOfLines={1} style={{ flexGrow: 1, flexShrink: 1 }}>
        {url}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={copied ? copiedLabel : copyLabel}
        accessibilityState={{ selected: copied }}
        onPress={handlePress}
        hitSlop={COPY_HIT_SLOP}
        style={({ pressed }) => ({
          opacity: pressed ? theme.opacity.pressedSubtle : theme.opacity.full,
        })}
      >
        {copied ? (
          <Check
            size={theme.iconSize.base}
            strokeWidth={theme.stroke.standard}
            color={theme.colors.brand}
          />
        ) : (
          <Copy
            size={theme.iconSize.base}
            strokeWidth={theme.stroke.standard}
            color={theme.colors.fgMuted}
          />
        )}
      </Pressable>
    </View>
  );
}
