import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomSheet, CTAButton, Text, useTheme } from '../../design-system';

export type LeaveGroupSheetScreenProps = {
  groupName: string;
  onLeave?: () => void;
  onStay?: () => void;
  onDismiss?: () => void;
};

const SLIDE_DISTANCE = Dimensions.get('window').height;

export function LeaveGroupSheetScreen({
  groupName,
  onLeave,
  onStay,
  onDismiss,
}: LeaveGroupSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslate = useRef(new Animated.Value(SLIDE_DISTANCE)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: t.opacity.pressedGhost,
        duration: t.motion.duration.base,
        easing: t.motion.easing.entrance,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslate, {
        toValue: 0,
        duration: t.motion.duration.base,
        easing: t.motion.easing.entrance,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropOpacity, sheetTranslate, t.motion, t.opacity.pressedGhost]);

  return (
    <View style={{ flex: 1 }}>
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={tr('common.cancel')}
          onPress={onDismiss ?? onStay}
          style={{ flex: 1 }}
        />
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateY: sheetTranslate }],
        }}
      >
        <BottomSheet>
          <View style={{ gap: t.spacing.md }}>
            <Text variant="metaLabel" color="fgFaint">
              {tr('group.leave.eyebrow', { group: groupName.toUpperCase() })}
            </Text>
            <Text variant="headingPulse" color="fg">
              {tr('group.leave.title')}
            </Text>
            <Text variant="bodyStandard" color="fgSubtle">
              {tr('group.leave.body')}
            </Text>
          </View>
          <CTAButton variant="primary" label={tr('group.leave.cta')} onPress={onLeave} />
          <Pressable
            accessibilityRole="button"
            onPress={onStay ?? onDismiss}
            style={{ paddingVertical: t.spacing.sm }}
          >
            <Text variant="buttonLabelSocial" color="fgFaint" align="center">
              {tr('group.leave.stay')}
            </Text>
          </Pressable>
        </BottomSheet>
      </Animated.View>
    </View>
  );
}
