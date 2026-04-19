import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { Avatar, MoodGlyph } from '../identity';
import type { MoodLevel } from '../identity/types';

// Pulse mood vocabulary aligns with MoodGlyph's MoodLevel (1..5); `empty` means
// no signal yet. Keeping a single vocabulary means the dot colors in the pulse
// stream, the MoodGlyph stroke, and the MoodPicker all speak the same language.
export type PulseMood = MoodLevel | 'empty';

export type PulseMemberCardProps = {
  name: string;
  signal: string;
  mood: PulseMood;
  initial?: string;
  style?: ViewStyle;
};

const AVATAR_SIZE = 48;
const GLYPH_CONTAINER_WIDTH = 52;
const GLYPH_CONTAINER_HEIGHT = 24;
const GLYPH_WIDTH = 40;

export function PulseMemberCard({ name, signal, mood, initial, style }: PulseMemberCardProps) {
  const theme = useTheme();
  const moodLevel: MoodLevel | null = mood === 'empty' ? null : mood;

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
            width: GLYPH_CONTAINER_WIDTH,
            height: GLYPH_CONTAINER_HEIGHT,
            borderRadius: theme.radius.pill,
            backgroundColor: theme.colors.bgMuted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MoodGlyph mood={moodLevel} size={GLYPH_WIDTH} selected />
        </View>
      ) : null}
    </View>
  );
}
