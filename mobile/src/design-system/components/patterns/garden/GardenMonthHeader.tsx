import { View, type ViewStyle } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../theme';

export type GardenMonthHeaderProps = {
  month: string;
  count?: number | string;
  style?: ViewStyle;
};

const HEADER_HEIGHT = 52;

export function GardenMonthHeader({ month, count, style }: GardenMonthHeaderProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          height: HEADER_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: theme.spacing.md,
        },
        style,
      ]}
    >
      <Text variant="headingFeature" color="fg">
        {month}
      </Text>
      {count !== undefined && count !== null ? (
        <Text variant="bodySmall" color="fgFaint">
          {typeof count === 'number' ? String(count) : count}
        </Text>
      ) : null}
    </View>
  );
}
