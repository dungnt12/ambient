import { memo } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../theme';
import {
  GardenIllustration,
  getGardenCellTint,
  type GardenIllustrationName,
} from '../../illustrations/garden';

export type GardenCellState = 'empty' | 'today' | 'written';

export type GardenCellProps = {
  state: GardenCellState;
  illustration?: GardenIllustrationName;
  label?: string;
  day?: number;
  style?: ViewStyle;
  onPress?: () => void;
};

const CELL_SIZE = 44;
const ILLUSTRATION_SIZE = 30;
const TODAY_BORDER_WIDTH = 2;

function GardenCellImpl({ state, illustration, label, day, style, onPress }: GardenCellProps) {
  const theme = useTheme();

  const base: ViewStyle = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  };

  let variantStyle: ViewStyle;
  if (state === 'today') {
    variantStyle = {
      backgroundColor: theme.colors.bgRaised,
      borderWidth: TODAY_BORDER_WIDTH,
      borderColor: theme.colors.brand,
    };
  } else if (state === 'written') {
    variantStyle = {
      backgroundColor: illustration ? getGardenCellTint(illustration) : theme.colors.bgMuted,
    };
  } else {
    variantStyle = {
      backgroundColor: theme.colors.bgRaised,
      borderWidth: theme.brand.border.hairline,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
    };
  }

  const dayBadge =
    day !== undefined ? (
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: theme.spacing.xs,
          right: theme.spacing.xs,
        }}
      >
        <Text variant="overline" color="fgGhost">
          {String(day)}
        </Text>
      </View>
    ) : null;

  const content = (
    <>
      {state === 'written' && illustration ? (
        <GardenIllustration name={illustration} size={ILLUSTRATION_SIZE} />
      ) : null}
      {dayBadge}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="button"
        onPress={onPress}
        hitSlop={theme.spacing.xxs}
        style={({ pressed }) => [
          base,
          variantStyle,
          style,
          { opacity: pressed ? theme.opacity.pressedSubtle : theme.opacity.full },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      accessible
      accessibilityLabel={label}
      accessibilityRole="image"
      style={[base, variantStyle, style]}
    >
      {content}
    </View>
  );
}

export const GardenCell = memo(GardenCellImpl);
