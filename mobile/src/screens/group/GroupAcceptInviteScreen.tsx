import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar, CTAButton, Screen, Text, useTheme } from '../../design-system';

export type GroupAcceptInviteScreenProps = {
  inviterName: string;
  groupName: string;
  memberCount: number;
  since?: string;
  memberInitials: string[];
  onAccept?: () => void;
  onLater?: () => void;
};

export function GroupAcceptInviteScreen({
  inviterName,
  groupName,
  memberCount,
  since,
  memberInitials,
  onAccept,
  onLater,
}: GroupAcceptInviteScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <View
        style={{
          flex: 1,
          paddingHorizontal: t.layout.screenPaddingX,
        }}
      >
        <Text variant="metaLabel" color="fgFaint" style={{ marginTop: t.spacing.sm }}>
          {tr('group.accept.eyebrow', { name: inviterName.toUpperCase() })}
        </Text>
        <Text variant="headingScreen" color="fg" style={{ marginTop: t.spacing.md }}>
          {tr('group.accept.title', { group: groupName })}
        </Text>
        <Text variant="bodyStandard" color="fgSubtle" style={{ marginTop: t.spacing.lg }}>
          {tr('group.accept.body', { count: Math.max(memberCount - 1, 0) })}
        </Text>

        <View
          style={{
            marginTop: t.spacing.xl,
            backgroundColor: t.colors.bgRaised,
            borderRadius: t.radius.card,
            borderWidth: t.brand.border.hairline,
            borderColor: t.colors.borderSoft,
            padding: t.spacing.lg,
            gap: t.spacing.sm,
          }}
        >
          <Text variant="metaLabel" color="fgFaint">
            {tr('group.accept.groupEyebrow')}
          </Text>
          <Text variant="headingSubLarge" color="fg">
            {groupName}
          </Text>
          <Text variant="bodySmall" color="fgFaint">
            {since
              ? tr('group.memberSubtitle', { count: memberCount, since })
              : tr('group.memberSubtitlePlain', { count: memberCount })}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: t.spacing.sm }}>
            {memberInitials.map((letter, idx) => (
              <View
                key={`${letter}-${idx}`}
                style={{ marginLeft: idx === 0 ? 0 : -t.layout.avatarOverlap }}
              >
                <Avatar size={t.layout.avatarMd} initial={letter} />
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            marginTop: t.spacing.base,
            backgroundColor: t.colors.bg,
            borderRadius: t.radius.lg,
            borderWidth: t.brand.border.hairline,
            borderColor: t.colors.border,
            padding: t.spacing.lg,
            gap: t.spacing.sm,
          }}
        >
          <Text variant="metaLabel" color="fgFaint">
            {tr('group.accept.privacyTitle')}
          </Text>
          <Text variant="bodySerifTight" color="fg">
            {tr('group.accept.privacyBody')}
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <CTAButton
          variant="primary"
          label={tr('group.accept.cta', { group: groupName })}
          onPress={onAccept}
        />
        <Pressable
          accessibilityRole="button"
          onPress={onLater}
          style={{ paddingVertical: t.spacing.sm, marginTop: t.spacing.sm }}
        >
          <Text variant="buttonLabelSocial" color="fgFaint" align="center">
            {tr('group.accept.later')}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
