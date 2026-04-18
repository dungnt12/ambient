import { useState } from 'react';
import { TextInput as RNTextInput, View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type JournalTextareaProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  date?: string;
  maxLength?: number;
  showCounter?: boolean;
  minHeight?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: ViewStyle;
};

const DEFAULT_MIN_HEIGHT = 240;
const PLACEHOLDER_FONT_SIZE = 18;
const PLACEHOLDER_LINE_HEIGHT = 26;

export function JournalTextarea({
  value,
  onChangeText,
  placeholder = 'Write a few lines…',
  date,
  maxLength,
  showCounter = false,
  minHeight = DEFAULT_MIN_HEIGHT,
  onFocus,
  onBlur,
  style,
}: JournalTextareaProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const isEmpty = value.length === 0;

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          minHeight,
          backgroundColor: theme.colors.bgRaised,
          borderRadius: theme.radius.input,
          borderWidth: theme.brand.border.hairline,
          borderColor: focused ? theme.colors.brand : theme.colors.border,
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.base,
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      {date ? (
        <Text variant="overline" color="fgFaint">
          {date}
        </Text>
      ) : null}
      <View
        style={{
          flex: 1,
          minHeight: Math.max(minHeight - 80, 40),
          paddingBottom: showCounter && maxLength ? theme.spacing.lg : 0,
        }}
      >
        {isEmpty ? (
          <Text
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              fontFamily: theme.fontFamily.serifRegular,
              fontSize: PLACEHOLDER_FONT_SIZE,
              lineHeight: PLACEHOLDER_LINE_HEIGHT,
              fontStyle: 'italic',
              color: theme.colors.fgFaint,
            }}
          >
            {placeholder}
          </Text>
        ) : null}
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          maxLength={maxLength}
          multiline
          textAlignVertical="top"
          style={[
            theme.typography.bodyStandard,
            {
              color: theme.colors.fg,
              flexGrow: 1,
              padding: 0,
            },
          ]}
        />
      </View>
      {showCounter && maxLength ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            right: theme.spacing.lg,
            bottom: theme.spacing.base,
          }}
        >
          <Text variant="mono" color="fgFaint" style={{ fontSize: 12, lineHeight: 16 }}>
            {`${value.length} / ${maxLength}`}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
