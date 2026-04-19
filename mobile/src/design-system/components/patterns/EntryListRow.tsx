import { Pressable, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type EntryListRowProps = {
  date: string;
  preview: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function EntryListRow({ date, preview, onPress, style }: EntryListRowProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          gap: theme.spacing.xs,
          paddingVertical: theme.spacing.md,
          opacity: pressed ? theme.opacity.pressedSubtle : theme.opacity.full,
        },
        style,
      ]}
    >
      <Text variant="overline" color="fgFaint" numberOfLines={1}>
        {date}
      </Text>
      <Text variant="bodyStandard" color="fg" numberOfLines={2}>
        {preview}
      </Text>
    </Pressable>
  );
}
