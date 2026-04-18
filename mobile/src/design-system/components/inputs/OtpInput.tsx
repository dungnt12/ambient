import { useRef } from 'react';
import { TextInput as RNTextInput, View, Pressable, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

const CELL_WIDTH = 48;
const CELL_HEIGHT = 56;
const DEFAULT_LENGTH = 6;

export type OtpCellProps = {
  char?: string;
  active?: boolean;
  style?: ViewStyle;
};

export function OtpCell({ char, active = false, style }: OtpCellProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          width: CELL_WIDTH,
          height: CELL_HEIGHT,
          borderRadius: theme.radius.input,
          backgroundColor: theme.colors.bgRaised,
          borderColor: active ? theme.colors.brand : theme.colors.border,
          borderWidth: active ? theme.brand.border.hairline * 2 : theme.brand.border.hairline,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text variant="headingSub" color="fg">
        {char ?? ''}
      </Text>
    </View>
  );
}

export type OtpRowProps = {
  value: string;
  length?: number;
  activeIndex?: number;
  style?: ViewStyle;
};

export function OtpRow({ value, length = DEFAULT_LENGTH, activeIndex, style }: OtpRowProps) {
  const theme = useTheme();
  const cells = Array.from({ length }, (_, i) => i);
  return (
    <View style={[{ flexDirection: 'row', gap: theme.spacing.md }, style]}>
      {cells.map((i) => (
        <OtpCell key={i} char={value[i]} active={i === activeIndex} />
      ))}
    </View>
  );
}

export type OtpInputProps = {
  value: string;
  length?: number;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  style?: ViewStyle;
};

export function OtpInput({
  value,
  length = DEFAULT_LENGTH,
  onChange,
  autoFocus,
  style,
}: OtpInputProps) {
  const inputRef = useRef<RNTextInput>(null);

  // Derived from value: no useState needed.
  const activeIndex = Math.min(value.length, length - 1);

  const focus = () => inputRef.current?.focus();

  const handleChange = (next: string) => {
    // Keep only digits, clamp to length.
    const digits = next.replace(/[^0-9]/g, '').slice(0, length);
    onChange(digits);
  };

  return (
    <Pressable onPress={focus} style={style}>
      <OtpRow value={value} length={length} activeIndex={activeIndex} />
      <RNTextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        // Visually hidden but still focusable/typeable.
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />
    </Pressable>
  );
}
