import { useState } from 'react';
import {
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type TextInputState = 'default' | 'focus' | 'filled' | 'error' | 'disabled';

export type TextInputProps = Omit<RNTextInputProps, 'style' | 'onChangeText' | 'value'> & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  state?: TextInputState;
  errorText?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
};

const CONTAINER_MIN_HEIGHT = 92;

export function TextInput({
  label,
  value,
  onChangeText,
  state,
  errorText,
  placeholder,
  secureTextEntry,
  style,
  ...rest
}: TextInputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  // Derive effective state: explicit prop wins, otherwise compute from value/focus.
  const effectiveState: TextInputState =
    state ?? (focused ? 'focus' : value.length > 0 ? 'filled' : 'default');

  const palette = resolvePalette(theme, effectiveState);
  const isDisabled = effectiveState === 'disabled';
  const isError = effectiveState === 'error';

  return (
    <View
      style={[
        {
          width: '100%',
          minHeight: CONTAINER_MIN_HEIGHT,
          gap: theme.spacing.sm,
          opacity: isDisabled ? theme.opacity.disabled : theme.opacity.full,
        },
        style,
      ]}
    >
      <Text variant="label" color="fgFaint">
        {label}
      </Text>
      <View
        style={{
          height: theme.layout.inputHeight,
          width: '100%',
          borderRadius: theme.radius.input,
          backgroundColor: palette.background,
          borderColor: palette.border,
          borderWidth: palette.borderWidth,
          paddingHorizontal: theme.spacing.base,
          justifyContent: 'center',
        }}
      >
        <RNTextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.fgFaint}
          secureTextEntry={secureTextEntry}
          editable={!isDisabled}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[theme.typography.bodyLarge, { color: palette.foreground, padding: 0 }]}
        />
      </View>
      {isError && errorText ? (
        <Text variant="bodySmall" color="error">
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}

type Palette = {
  background: string;
  border: string;
  borderWidth: number;
  foreground: string;
};

function resolvePalette(theme: ReturnType<typeof useTheme>, state: TextInputState): Palette {
  const hairline = theme.brand.border.hairline;
  const doubled = hairline * 2;
  switch (state) {
    case 'focus':
      return {
        background: theme.colors.bgRaised,
        border: theme.colors.focus,
        borderWidth: doubled,
        foreground: theme.colors.fg,
      };
    case 'error':
      return {
        background: theme.colors.bgRaised,
        border: theme.colors.error,
        borderWidth: doubled,
        foreground: theme.colors.error,
      };
    case 'filled':
      return {
        background: theme.colors.bgRaised,
        border: theme.colors.border,
        borderWidth: hairline,
        foreground: theme.colors.fg,
      };
    case 'disabled':
    case 'default':
    default:
      return {
        background: theme.colors.bgRaised,
        border: theme.colors.border,
        borderWidth: hairline,
        foreground: theme.colors.fg,
      };
  }
}
