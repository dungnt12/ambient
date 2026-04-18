import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar, BottomSheet, CTAButton, Text, useTheme } from '../../design-system';

export type InviteOfferSheetScreenProps = {
  inviterName: string;
  groupName: string;
  memberCount: number;
  since?: string;
  memberInitials: string[];
  onJoin?: () => void;
  onSaveForLater?: () => void;
};

const SLIDE_DISTANCE = Dimensions.get('window').height;

export function InviteOfferSheetScreen({
  inviterName,
  groupName,
  memberCount,
  since,
  memberInitials,
  onJoin,
  onSaveForLater,
}: InviteOfferSheetScreenProps) {
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
          onPress={onSaveForLater}
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
              {tr('group.inviteOffer.eyebrow', { name: inviterName.toUpperCase() })}
            </Text>
            <Text variant="headingPulse" color="fg">
              {tr('group.inviteOffer.title', { group: groupName })}
            </Text>
            <Text variant="bodyStandard" color="fgSubtle">
              {since
                ? tr('group.memberSubtitle', { count: memberCount, since })
                : tr('group.memberSubtitlePlain', { count: memberCount })}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: t.spacing.sm }}>
              {memberInitials.slice(0, 6).map((letter, idx) => (
                <View
                  key={`${letter}-${idx}`}
                  style={{ marginLeft: idx === 0 ? 0 : -t.layout.avatarOverlap }}
                >
                  <Avatar size={t.layout.avatarMd} initial={letter} />
                </View>
              ))}
            </View>
          </View>

          <CTAButton variant="primary" label={tr('group.inviteOffer.join')} onPress={onJoin} />
          <Pressable
            accessibilityRole="button"
            onPress={onSaveForLater}
            style={{ paddingVertical: t.spacing.sm }}
          >
            <Text variant="buttonLabelSocial" color="fgFaint" align="center">
              {tr('group.inviteOffer.later')}
            </Text>
          </Pressable>
        </BottomSheet>
      </Animated.View>
    </View>
  );
}
