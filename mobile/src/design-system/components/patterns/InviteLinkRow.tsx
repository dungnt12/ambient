import { Pressable, View, type ViewStyle } from 'react-native';
import { Hash, Copy } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type InviteLinkRowProps = {
  url: string;
  onCopy?: () => void;
  style?: ViewStyle;
};

const COPY_HIT_SLOP = 8;

export function InviteLinkRow({ url, onCopy, style }: InviteLinkRowProps) {
  const theme = useTheme();

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
        accessibilityLabel="Copy invite link"
        onPress={onCopy}
        hitSlop={COPY_HIT_SLOP}
        style={({ pressed }) => ({
          opacity: pressed ? theme.opacity.pressedSubtle : theme.opacity.full,
        })}
      >
        <Copy
          size={theme.iconSize.base}
          strokeWidth={theme.stroke.standard}
          color={theme.colors.fgMuted}
        />
      </Pressable>
    </View>
  );
}
