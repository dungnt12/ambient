import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type PulseFooterRowProps = {
  updatedAt: string;
  attribution?: string;
  style?: ViewStyle;
};

const ROW_HEIGHT = 40;

export function PulseFooterRow({ updatedAt, attribution, style }: PulseFooterRowProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          height: ROW_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      <Text variant="bodySmall" color="fgFaint">
        {updatedAt}
      </Text>
      {attribution ? (
        <Text variant="bodySmall" color="fgFaint">
          {attribution}
        </Text>
      ) : null}
    </View>
  );
}
