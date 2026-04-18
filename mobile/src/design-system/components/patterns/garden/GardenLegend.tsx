import { View, type ViewStyle } from 'react-native';
import { Text } from '../../Text';
import { useTheme, type Theme } from '../../../theme';

export type GardenLegendLabels = {
  empty: string;
  today: string;
  written: string;
};

export type GardenLegendProps = {
  labels?: GardenLegendLabels;
  style?: ViewStyle;
};

const DEFAULT_LABELS: GardenLegendLabels = {
  empty: 'Empty',
  today: 'Today',
  written: 'Written',
};

const SWATCH_SIZE = 16;
const SWATCH_RADIUS = 3;
const TODAY_BORDER_WIDTH = 2;

type SwatchKind = 'empty' | 'today' | 'written';

function Swatch({ kind, theme }: { kind: SwatchKind; theme: Theme }) {
  const common: ViewStyle = {
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    borderRadius: SWATCH_RADIUS,
  };
  if (kind === 'today') {
    return (
      <View
        style={[
          common,
          {
            backgroundColor: theme.colors.bgRaised,
            borderWidth: TODAY_BORDER_WIDTH,
            borderColor: theme.colors.brand,
          },
        ]}
      />
    );
  }
  if (kind === 'written') {
    return (
      <View
        style={[
          common,
          {
            backgroundColor: theme.colors.bgMuted,
            borderWidth: theme.brand.border.hairline,
            borderColor: theme.colors.border,
          },
        ]}
      />
    );
  }
  return (
    <View
      style={[
        common,
        {
          backgroundColor: theme.colors.bgRaised,
          borderWidth: theme.brand.border.hairline,
          borderColor: theme.colors.border,
          borderStyle: 'dashed',
        },
      ]}
    />
  );
}

export function GardenLegend({ labels = DEFAULT_LABELS, style }: GardenLegendProps) {
  const theme = useTheme();
  const items: { kind: SwatchKind; label: string }[] = [
    { kind: 'empty', label: labels.empty },
    { kind: 'today', label: labels.today },
    { kind: 'written', label: labels.written },
  ];
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.lg,
        },
        style,
      ]}
    >
      {items.map((item) => (
        <View
          key={item.kind}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
          }}
        >
          <Swatch kind={item.kind} theme={theme} />
          <Text variant="bodySmall" color="fgFaint">
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
