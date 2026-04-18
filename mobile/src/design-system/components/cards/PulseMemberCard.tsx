import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { Avatar, MoodGlyph } from '../identity';
import type { MoodLevel } from '../identity/types';

export type PulseMood = 'calm' | 'curious' | 'dim' | 'bright' | 'empty';

export type PulseMemberCardProps = {
  name: string;
  signal: string;
  mood: PulseMood;
  initial?: string;
  style?: ViewStyle;
};

const AVATAR_SIZE = 48;
const GLYPH_CONTAINER = 24;

const MOOD_TO_LEVEL: Record<Exclude<PulseMood, 'empty'>, MoodLevel> = {
  calm: 3,
  curious: 4,
  dim: 2,
  bright: 5,
};

export function PulseMemberCard({ name, signal, mood, initial, style }: PulseMemberCardProps) {
  const theme = useTheme();
  const moodLevel = mood === 'empty' ? null : MOOD_TO_LEVEL[mood];

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          backgroundColor: theme.colors.bgCard,
          borderRadius: theme.radius.card,
          borderWidth: theme.brand.border.hairline,
          borderColor: theme.colors.borderSoft,
          padding: theme.spacing.base,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      <Avatar size={AVATAR_SIZE} initial={initial ?? name.charAt(0)} />

      <View style={{ flex: 1, gap: theme.spacing.xxs }}>
        <Text variant="headingFeature" color="fg">
          {name}
        </Text>
        <Text variant="bodyStandard" color="fgMuted">
          {signal}
        </Text>
      </View>

      {moodLevel ? (
        <View
          style={{
            width: GLYPH_CONTAINER,
            height: GLYPH_CONTAINER,
            borderRadius: theme.radius.pill,
            backgroundColor: theme.colors.bgMuted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MoodGlyph mood={moodLevel} size={theme.iconSize.lg} />
        </View>
      ) : null}
    </View>
  );
}
