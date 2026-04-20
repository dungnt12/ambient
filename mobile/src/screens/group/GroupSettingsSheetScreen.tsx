import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react-native';
import {
  Avatar,
  BottomSheetModal,
  Card,
  CTAButton,
  InviteLinkRow,
  SheetHeader,
  Text,
  TextInput,
  useTheme,
} from '../../design-system';
import type { PulseMember } from '../../mocks/group';

export type GroupSettingsSheetScreenProps = {
  groupId: string;
  groupName: string;
  inviteUrl: string;
  members: PulseMember[];
  /** Member id of the viewer — that row hides the remove control. */
  selfId?: string;
  onRename?: (nextName: string) => void;
  onRemoveMember?: (memberId: string) => void;
  onLeave?: () => void;
  onDismiss: () => void;
};

export function GroupSettingsSheetScreen({
  groupName,
  inviteUrl,
  members,
  selfId,
  onRename,
  onRemoveMember,
  onLeave,
  onDismiss,
}: GroupSettingsSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [name, setName] = useState(groupName);
  const trimmed = name.trim();
  const dirty = trimmed.length > 0 && trimmed !== groupName;

  return (
    <BottomSheetModal onDismiss={onDismiss}>
      {({ dismiss }) => (
        <>
          <SheetHeader
            title={tr('group.settings.title')}
            onDismiss={() => dismiss()}
            accessibilityDismissLabel={tr('group.switcher.close')}
          />

          <View style={{ gap: t.spacing.xl }}>
            <View style={{ gap: t.spacing.sm }}>
              <TextInput
                label={tr('group.settings.renameLabel')}
                value={name}
                onChangeText={setName}
                placeholder={groupName}
              />
              <CTAButton
                variant="primary"
                label={tr('group.settings.saveName')}
                disabled={!dirty}
                onPress={() => onRename?.(trimmed)}
              />
            </View>

            <View style={{ gap: t.spacing.sm }}>
              <Text variant="metaLabel" color="fgFaint">
                {tr('group.settings.inviteEyebrow')}
              </Text>
              <InviteLinkRow url={inviteUrl} />
            </View>

            <View style={{ gap: t.spacing.sm }}>
              <Text variant="metaLabel" color="fgFaint">
                {tr('group.settings.membersEyebrow', { count: members.length })}
              </Text>
              {members.map((m) => (
                <MemberRow
                  key={m.id}
                  member={m}
                  removable={m.id !== selfId}
                  onRemove={() => onRemoveMember?.(m.id)}
                />
              ))}
            </View>

            {onLeave ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => dismiss(onLeave)}
                hitSlop={t.spacing.sm}
                style={({ pressed }) => ({
                  alignItems: 'center',
                  paddingVertical: t.spacing.md,
                  opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
                })}
              >
                <Text variant="buttonLabelSocial" color="fgFaint">
                  {tr('group.settings.leave')}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </>
      )}
    </BottomSheetModal>
  );
}

function MemberRow({
  member,
  removable,
  onRemove,
}: {
  member: PulseMember;
  removable: boolean;
  onRemove: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <Card tone="plain" density="row" style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar size={t.layout.avatarSm} initial={member.initial} />
      <View style={{ flex: 1 }}>
        <Text variant="buttonLabelSocial" color="fg">
          {member.name}
        </Text>
      </View>
      {removable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={tr('group.settings.removeMember', { name: member.name })}
          onPress={onRemove}
          hitSlop={t.spacing.sm}
          style={({ pressed }) => ({
            padding: t.spacing.xs,
            opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
          })}
        >
          <X size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
        </Pressable>
      ) : null}
    </Card>
  );
}
