import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar, BottomSheetModal, CTAButton, Text, useTheme } from '../../design-system';

export type InviteOfferSheetScreenProps = {
  inviterName: string;
  groupName: string;
  memberCount: number;
  since?: string;
  memberInitials: string[];
  onJoin?: () => void;
  onSaveForLater?: () => void;
};

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
  const close = onSaveForLater ?? (() => {});

  return (
    <BottomSheetModal onDismiss={close}>
      {({ dismiss }) => (
        <>
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

            <View style={{ flexDirection: 'row', marginTop: t.spacing.md }}>
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

          <CTAButton
            variant="primary"
            label={tr('group.inviteOffer.join')}
            onPress={() => dismiss(onJoin)}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => dismiss(onSaveForLater)}
            style={{ paddingVertical: t.spacing.md }}
          >
            <Text variant="buttonLabelSocial" color="fgFaint" align="center">
              {tr('group.inviteOffer.later')}
            </Text>
          </Pressable>
        </>
      )}
    </BottomSheetModal>
  );
}
