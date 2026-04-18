import { View, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { useTheme } from '../../theme';

export type BottomSheetProps = {
  children: ReactNode;
  style?: ViewStyle;
};

const HANDLE_WIDTH = 40;
const HANDLE_HEIGHT = 4;
const HANDLE_RADIUS = 2;
const HANDLE_ROW_HEIGHT = 12;
const HANDLE_TOP_PADDING = 12;

/**
 * BottomSheet — presentational sheet body (no modal logic).
 * Layout: top-rounded card with drag handle, padded content slot.
 * Wrap in a React Native <Modal> or a showcase <View> to place on screen.
 */
export function BottomSheet({ children, style }: BottomSheetProps) {
  const t = useTheme();

  return (
    <View
      style={[
        {
          width: '100%',
          alignSelf: 'stretch',
          backgroundColor: t.colors.bgRaised,
          borderTopLeftRadius: t.radius.sheet,
          borderTopRightRadius: t.radius.sheet,
          paddingTop: HANDLE_TOP_PADDING,
          paddingBottom: t.spacing.xxl,
          paddingHorizontal: t.spacing.screen,
          gap: t.spacing.xl,
          ...t.shadow.ringDeep,
        },
        style,
      ]}
    >
      <View
        style={{
          height: HANDLE_ROW_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: HANDLE_WIDTH,
            height: HANDLE_HEIGHT,
            borderRadius: HANDLE_RADIUS,
            backgroundColor: t.colors.bgMuted,
          }}
        />
      </View>
      {children}
    </View>
  );
}
