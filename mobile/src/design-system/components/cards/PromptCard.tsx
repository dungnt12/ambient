import { View, type ViewStyle } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type PromptCardVariant = 'raised' | 'muted';

export type PromptCardProps = {
  eyebrow?: string;
  prompt: string;
  meta?: string;
  followup?: string;
  variant?: PromptCardVariant;
  sparkle?: boolean;
  style?: ViewStyle;
};

const DIVIDER_HEIGHT = 1;
const PROMPT_FONT_SIZE = 22;
const PROMPT_LINE_HEIGHT = 28;

export function PromptCard({
  eyebrow = "TODAY'S PROMPT",
  prompt,
  meta,
  followup,
  variant = 'raised',
  sparkle = false,
  style,
}: PromptCardProps) {
  const theme = useTheme();
  const background = variant === 'muted' ? theme.colors.bgMuted : theme.colors.bgRaised;

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          backgroundColor: background,
          borderRadius: theme.radius.card,
          padding: theme.spacing.xl,
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
        }}
      >
        {sparkle ? (
          <Sparkles
            size={theme.iconSize.xs}
            strokeWidth={theme.stroke.standard}
            color={theme.colors.brand}
          />
        ) : null}
        <Text variant="overline" color={sparkle ? 'brand' : 'fgFaint'}>
          {eyebrow}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: theme.fontFamily.serif,
          fontSize: PROMPT_FONT_SIZE,
          lineHeight: PROMPT_LINE_HEIGHT,
          color: theme.colors.fg,
        }}
      >
        {prompt}
      </Text>
      {followup ? (
        <Text variant="bodyStandard" color="fgSubtle">
          {followup}
        </Text>
      ) : null}
      {meta ? (
        <>
          <View
            style={{
              height: DIVIDER_HEIGHT,
              backgroundColor: theme.colors.borderSoft,
              marginTop: theme.spacing.xs,
            }}
          />
          <Text variant="bodySmall" color="fgFaint">
            {meta}
          </Text>
        </>
      ) : null}
    </View>
  );
}
