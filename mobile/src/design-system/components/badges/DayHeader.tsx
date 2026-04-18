import { View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type DayHeaderProps = {
  label: string;
};

export function DayHeader({ label }: DayHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
      }}
    >
      <View
        style={{
          flexGrow: 1,
          height: theme.brand.border.hairline,
          backgroundColor: theme.colors.borderSoft,
        }}
      />
      <Text variant="overline" color="fgFaint">
        {label}
      </Text>
      <View
        style={{
          flexGrow: 1,
          height: theme.brand.border.hairline,
          backgroundColor: theme.colors.borderSoft,
        }}
      />
    </View>
  );
}
