import { memo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../theme';
import { GardenIllustration, type GardenIllustrationName } from '../../illustrations/garden';

export type GardenCellState = 'empty' | 'today' | 'written';

export type GardenCellProps = {
  state: GardenCellState;
  illustration?: GardenIllustrationName;
  label?: string;
  day?: number;
  style?: ViewStyle;
};

const CELL_SIZE = 40;
const ILLUSTRATION_SIZE = 32;
const TODAY_BORDER_WIDTH = 2;

function GardenCellImpl({ state, illustration, label, day, style }: GardenCellProps) {
  const theme = useTheme();

  const base: ViewStyle = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: theme.radius.xs,
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
      backgroundColor: theme.colors.bgMuted,
      borderWidth: theme.brand.border.hairline,
      borderColor: theme.colors.border,
    };
  } else {
    variantStyle = {
      backgroundColor: theme.colors.bgRaised,
      borderWidth: theme.brand.border.hairline,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
    };
  }

  return (
    <View
      accessible
      accessibilityLabel={label}
      accessibilityRole="image"
      style={[base, variantStyle, style]}
    >
      {state === 'written' && illustration ? (
        <GardenIllustration name={illustration} size={ILLUSTRATION_SIZE} />
      ) : null}
      {day !== undefined ? (
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
      ) : null}
    </View>
  );
}

export const GardenCell = memo(GardenCellImpl);
