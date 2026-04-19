import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import {
  PanGestureHandler,
  State,
  type PanGestureHandlerGestureEvent,
  type PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { BottomSheet, type BottomSheetProps } from './BottomSheet';

export type BottomSheetModalRenderProps = {
  dismiss: (after?: () => void) => void;
};

export type BottomSheetModalProps = {
  onDismiss: () => void;
  children: ReactNode | ((ctx: BottomSheetModalRenderProps) => ReactNode);
  sheetStyle?: BottomSheetProps['style'];
  dismissOnBackdropPress?: boolean;
  dismissOnSwipe?: boolean;
};

const FALLBACK_HEIGHT = Dimensions.get('window').height;
const DISMISS_DISTANCE_RATIO = 0.25;
const DISMISS_VELOCITY = 800;

/**
 * BottomSheetModal — full-screen overlay with animated entrance/exit,
 * backdrop-tap dismiss, and swipe-down-to-dismiss.
 * Wraps children in the presentational <BottomSheet> body.
 */
export function BottomSheetModal({
  onDismiss,
  children,
  sheetStyle,
  dismissOnBackdropPress = true,
  dismissOnSwipe = true,
}: BottomSheetModalProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const [sheetHeight, setSheetHeight] = useState(FALLBACK_HEIGHT);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const baseTranslate = useRef(new Animated.Value(FALLBACK_HEIGHT)).current;
  const dragTranslate = useRef(new Animated.Value(0)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const mountedRef = useRef(false);
  const dismissingRef = useRef(false);

  // Lift the sheet above the soft keyboard so TextInput stays visible.
  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvt, (e) => {
      Animated.timing(keyboardOffset, {
        toValue: e.endCoordinates.height,
        duration: t.motion.duration.base,
        easing: t.motion.easing.entrance,
        useNativeDriver: true,
      }).start();
    });
    const hideSub = Keyboard.addListener(hideEvt, () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: t.motion.duration.quick,
        easing: t.motion.easing.exit,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardOffset, t.motion]);

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: t.opacity.pressedGhost,
        duration: t.motion.duration.base,
        easing: t.motion.easing.entrance,
        useNativeDriver: true,
      }),
      Animated.timing(baseTranslate, {
        toValue: 0,
        duration: t.motion.duration.base,
        easing: t.motion.easing.entrance,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropOpacity, baseTranslate, t.motion, t.opacity.pressedGhost]);

  const dismiss = useCallback(
    (after?: () => void) => {
      if (dismissingRef.current) return;
      dismissingRef.current = true;
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: t.motion.duration.quick,
          easing: t.motion.easing.exit,
          useNativeDriver: true,
        }),
        Animated.timing(baseTranslate, {
          toValue: sheetHeight,
          duration: t.motion.duration.quick,
          easing: t.motion.easing.exit,
          useNativeDriver: true,
        }),
      ]).start(() => {
        (after ?? onDismiss)();
      });
    },
    [backdropOpacity, baseTranslate, onDismiss, sheetHeight, t.motion],
  );

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    animateIn();
  }, [animateIn]);

  const onSheetLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      if (h > 0 && h !== sheetHeight) {
        setSheetHeight(h);
        if (!mountedRef.current) {
          baseTranslate.setValue(h);
        }
      }
    },
    [baseTranslate, sheetHeight],
  );

  const onPanEvent = Animated.event<PanGestureHandlerGestureEvent>(
    [{ nativeEvent: { translationY: dragTranslate } }],
    { useNativeDriver: true },
  );

  const onPanStateChange = useCallback(
    (e: PanGestureHandlerStateChangeEvent) => {
      const { state, translationY, velocityY } = e.nativeEvent;
      if (state !== State.END && state !== State.CANCELLED && state !== State.FAILED) return;

      const shouldDismiss =
        state === State.END &&
        (translationY > sheetHeight * DISMISS_DISTANCE_RATIO || velocityY > DISMISS_VELOCITY);

      if (shouldDismiss) {
        baseTranslate.setValue(translationY);
        dragTranslate.setValue(0);
        dismiss();
      } else {
        Animated.spring(dragTranslate, {
          toValue: 0,
          useNativeDriver: true,
          friction: t.motion.spring.standard.friction,
          tension: t.motion.spring.standard.tension,
        }).start();
      }
    },
    [baseTranslate, dismiss, dragTranslate, sheetHeight, t.motion.spring.standard],
  );

  const translateY = Animated.subtract(
    Animated.add(
      baseTranslate,
      dragTranslate.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
      }),
    ),
    keyboardOffset,
  );

  const rendered = typeof children === 'function' ? children({ dismiss }) : children;

  const containerStyle: ViewStyle = { flex: 1 };

  return (
    <View style={containerStyle}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: t.colors.bgInverse,
          opacity: backdropOpacity,
        }}
      >
        {dismissOnBackdropPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tr('common.cancel')}
            onPress={() => dismiss()}
            style={{ flex: 1 }}
          />
        ) : null}
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateY }],
        }}
        onLayout={onSheetLayout}
      >
        {dismissOnSwipe ? (
          <PanGestureHandler
            onGestureEvent={onPanEvent}
            onHandlerStateChange={onPanStateChange}
            activeOffsetY={t.layout.sheetSwipeActivation}
            failOffsetX={[-t.layout.sheetSwipeHorizontalFail, t.layout.sheetSwipeHorizontalFail]}
          >
            <Animated.View>
              <BottomSheet style={sheetStyle}>{rendered}</BottomSheet>
            </Animated.View>
          </PanGestureHandler>
        ) : (
          <BottomSheet style={sheetStyle}>{rendered}</BottomSheet>
        )}
      </Animated.View>
    </View>
  );
}
