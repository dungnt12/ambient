import { View } from 'react-native';
import { Sparkles, Bot } from 'lucide-react-native';
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
      <Bot
        size={theme.iconSize.sm}
        strokeWidth={theme.stroke.standard}
        color={theme.colors.fgFaint}
      />
      <Text variant="bodySmall" color="fgMuted">
        {label}
      </Text>
    </View>
  );
}
