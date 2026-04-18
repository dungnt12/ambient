import { View, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type ScreenShellProps = {
  children: ReactNode;
  width?: number;
  height?: number;
  style?: ViewStyle;
};

const STATUS_BAR_HEIGHT = 44;
const HOME_INDICATOR_HEIGHT = 32;
const HOME_INDICATOR_WIDTH = 134;
const HOME_INDICATOR_THICKNESS = 5;
const HOME_INDICATOR_RADIUS = 3;
const STATUS_DOT_SIZE = 4;
const STATUS_DOT_GAP = 3;

// Mockup-only dimensions: used to render the fake phone frame in the showcase.
// NOT a layout assumption for real screens — real app uses <Screen> with SafeAreaView
// and adapts to the actual device via useWindowDimensions().
const MOCKUP_DEVICE_WIDTH = 390;
const MOCKUP_DEVICE_HEIGHT = 844;

/**
 * ScreenShell — showcase-only phone-frame wrapper.
 *
 * Renders a fake status bar (time + dots), a content slot, and a home
 * indicator stripe. Use this to preview other components inside a 390×844
 * phone frame in the showcase. NOT a replacement for <Screen>; real app
 * screens use <Screen> (SafeAreaView) instead.
 */
export function ScreenShell({ children, width, height, style }: ScreenShellProps) {
  const t = useTheme();
  const resolvedWidth = width ?? MOCKUP_DEVICE_WIDTH;
  const resolvedHeight = height ?? MOCKUP_DEVICE_HEIGHT;

  return (
    <View
      style={[
        {
          width: resolvedWidth,
          height: resolvedHeight,
          backgroundColor: t.colors.bgRaised,
          flexDirection: 'column',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: STATUS_BAR_HEIGHT,
          width: '100%',
          paddingHorizontal: t.spacing.screen,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="bodySmall" color="fg" style={{ fontWeight: '600' }}>
          9:41
        </Text>
        <View style={{ flexDirection: 'row', gap: STATUS_DOT_GAP }}>
          <StatusDot />
          <StatusDot />
          <StatusDot />
        </View>
      </View>

      <View style={{ flex: 1, width: '100%' }}>{children}</View>

      <View
        style={{
          height: HOME_INDICATOR_HEIGHT,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: HOME_INDICATOR_WIDTH,
            height: HOME_INDICATOR_THICKNESS,
            borderRadius: HOME_INDICATOR_RADIUS,
            backgroundColor: t.colors.fg,
          }}
        />
      </View>
    </View>
  );
}

function StatusDot() {
  const t = useTheme();
  return (
    <View
      style={{
        width: STATUS_DOT_SIZE,
        height: STATUS_DOT_SIZE,
        borderRadius: STATUS_DOT_SIZE / 2,
        backgroundColor: t.colors.fgMuted,
      }}
    />
  );
}
