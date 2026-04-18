import { Pressable, View, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme, type Theme } from '../../theme';
import { type MoodLevel } from './types';

export type MoodPickerProps = {
  value: MoodLevel | null;
  onChange: (value: MoodLevel) => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

const MOODS: readonly MoodLevel[] = [1, 2, 3, 4, 5];

export function MoodPicker({ value, onChange, style, accessibilityLabel }: MoodPickerProps) {
  const theme = useTheme();
  const mp = theme.brand.moodPicker;
  const slotHeight = value === 5 ? mp.slotHeightLarge : mp.slotHeight;

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[{ alignItems: 'center', gap: mp.columnGap }, style]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: mp.dotGap,
        }}
      >
        {MOODS.map((mood) => {
          const isSelected = value === mood;
          const size = isSelected ? mp.dotSelectedSize : mp.dotSize;
          return (
            <Pressable
              key={mood}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onChange(mood)}
              style={{
                width: size,
                height: size,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: size,
                  height: size,
                  borderRadius: mp.dotRadius,
                  backgroundColor: isSelected ? theme.colors.brand : theme.colors.bgMuted,
                  borderWidth: isSelected ? mp.dotSelectedBorder : mp.dotBorder,
                  borderColor: isSelected ? theme.colors.ringSoft : theme.colors.borderSoft,
                }}
              />
            </Pressable>
          );
        })}
      </View>
      <View
        style={{
          width: mp.slotWidth,
          height: slotHeight,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {value ? <MoodWaveGlyph mood={value} theme={theme} /> : null}
      </View>
    </View>
  );
}

function MoodWaveGlyph({ mood, theme }: { mood: MoodLevel; theme: Theme }) {
  const color = theme.colors.brand;
  const strokeWidth = theme.stroke.glyph;
  const hasRays = mood === 5;
  const height = hasRays ? 24 : 20;

  return (
    <Svg width={60} height={height} viewBox={`0 0 60 ${height}`} fill="none">
      {hasRays ? (
        <>
          <Path d="M15 2 L15 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
          <Path d="M30 1 L30 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
          <Path d="M45 2 L45 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      ) : null}
      <Path
        d={WAVE_PATHS[mood](hasRays ? 8 : 4)}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const WAVE_PATHS: Record<MoodLevel, (yOffset: number) => string> = {
  1: (y) => `M3 ${y + 2} Q30 ${y + 13} 57 ${y + 2}`,
  2: (y) => `M3 ${y + 2} Q15 ${y + 10} 30 ${y + 5} T57 ${y + 8}`,
  3: (y) => `M3 ${y + 5} Q15 ${y} 30 ${y + 5} T57 ${y + 5}`,
  4: (y) => `M3 ${y + 8} Q15 ${y} 30 ${y + 5} T57 ${y}`,
  5: (y) => `M3 ${y + 8} Q30 ${y - 3} 57 ${y + 8}`,
};
