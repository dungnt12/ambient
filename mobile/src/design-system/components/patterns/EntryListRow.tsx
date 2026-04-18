import { Pressable, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type EntryListRowProps = {
  date: string;
  preview: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const DATE_COL_WIDTH = 48;

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
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          opacity: pressed ? theme.opacity.pressedSubtle : theme.opacity.full,
        },
        style,
      ]}
    >
      <Text variant="overline" color="fgFaint" style={{ width: DATE_COL_WIDTH }}>
        {date}
      </Text>
      <Text
        variant="bodyStandard"
        color="fg"
        numberOfLines={2}
        style={{ flexGrow: 1, flexShrink: 1 }}
      >
        {preview}
      </Text>
    </Pressable>
  );
}
