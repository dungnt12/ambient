import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type DigestRowProps = {
  label: string;
  meta?: string;
  style?: ViewStyle;
};

const DOT_SIZE = 6;

export function DigestRow({ label, meta, style }: DigestRowProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.brand,
        }}
      />
      <Text variant="bodySmall" color="fgMuted" style={{ flexGrow: 1, flexShrink: 1 }}>
        {label}
      </Text>
      {meta ? (
        <Text variant="bodySmall" color="fgFaint">
          {meta}
        </Text>
      ) : null}
    </View>
  );
}
