import { Pressable, View, type ViewStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Text } from '../Text';
import { Toggle } from '../inputs';
import { useTheme } from '../../theme';

export type SettingsRowKind = 'nav' | 'toggle' | 'destructive';

export type SettingsRowProps = {
  kind: SettingsRowKind;
  title: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  onPress?: () => void;
  style?: ViewStyle;
};

const ROW_HEIGHT = 56;

export function SettingsRow({ kind, title, value, onChange, onPress, style }: SettingsRowProps) {
  const theme = useTheme();
  const isDestructive = kind === 'destructive';
  const isToggle = kind === 'toggle';

  const handlePress = isToggle ? () => onChange?.(!value) : onPress;

  return (
    <Pressable
      accessibilityRole={isToggle ? 'switch' : 'button'}
      accessibilityState={isToggle ? { checked: !!value } : undefined}
      onPress={handlePress}
      style={({ pressed }) => [
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          height: ROW_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.spacing.md,
          opacity: pressed ? theme.opacity.pressedSubtle : theme.opacity.full,
        },
        style,
      ]}
    >
      <Text
        variant="bodyStandard"
        color={isDestructive ? 'error' : 'fg'}
        style={{ flexGrow: 1, flexShrink: 1 }}
      >
        {title}
      </Text>
      {kind === 'nav' ? (
        <ChevronRight
          size={theme.iconSize.md}
          strokeWidth={theme.stroke.standard}
          color={theme.colors.fgFaint}
        />
      ) : null}
      {isToggle ? (
        <View pointerEvents="none">
          <Toggle value={!!value} onChange={() => {}} />
        </View>
      ) : null}
    </Pressable>
  );
}
