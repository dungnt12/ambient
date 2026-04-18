import { View } from 'react-native';
import { CalendarDays } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type SuggestionDateChipProps = {
  label: string;
};

export function SuggestionDateChip({ label }: SuggestionDateChipProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xxs,
        backgroundColor: theme.colors.bgCard,
        borderColor: theme.colors.borderSoft,
        borderWidth: theme.brand.border.hairline,
        borderRadius: theme.radius.pill,
      }}
    >
      <CalendarDays
        size={theme.iconSize.sm}
        strokeWidth={theme.stroke.standard}
        color={theme.colors.fgMuted}
      />
      <Text variant="overline" color="fgMuted">
        {label}
      </Text>
    </View>
  );
}
