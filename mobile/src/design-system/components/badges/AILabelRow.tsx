import { View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type AILabelRowProps = {
  label: string;
};

export function AILabelRow({ label }: AILabelRowProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
      }}
    >
      <Sparkles
        size={theme.iconSize.sm}
        strokeWidth={theme.stroke.standard}
        color={theme.colors.brand}
      />
      <Text variant="bodySmall" color="fgMuted">
        {label}
      </Text>
    </View>
  );
}
