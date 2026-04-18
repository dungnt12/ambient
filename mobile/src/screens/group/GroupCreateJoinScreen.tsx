import { useCallback, useState } from 'react';
import { type LayoutChangeEvent, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Link2 } from 'lucide-react-native';
import { Avatar, CTAButton, ScreenLayout, Text, TextInput, useTheme } from '../../design-system';
import type { SavedInvite } from '../../mocks/group';

type Segment = 'new' | 'join';

// Locks a block's height to the tallest variant seen so toggling segments
// doesn't cause content below to jump when the two localized strings differ
// in line count.
function useMaxHeight() {
  const [minHeight, setMinHeight] = useState(0);
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const next = e.nativeEvent.layout.height;
    setMinHeight((prev) => (next > prev ? next : prev));
  }, []);
  return { minHeight, onLayout };
}

export type GroupCreateJoinScreenProps = {
  inviteUrl: string;
  initialSegment?: Segment;
  savedInvites?: SavedInvite[];
  onCreate?: (groupName: string) => void;
  onOpenInvite?: (invite: SavedInvite) => void;
  onSimulateIncomingLink?: () => void;
  onCopyInvite?: () => void;
};

export function GroupCreateJoinScreen({
  inviteUrl,
  initialSegment = 'new',
  savedInvites = [],
  onCreate,
  onOpenInvite,
  onSimulateIncomingLink,
  onCopyInvite,
}: GroupCreateJoinScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [segment, setSegment] = useState<Segment>(initialSegment);
  const [name, setName] = useState(tr('group.create.defaultName'));
  const { minHeight: titleMinHeight, onLayout: onTitleLayout } = useMaxHeight();
  const { minHeight: bodyMinHeight, onLayout: onBodyLayout } = useMaxHeight();

  const isJoin = segment === 'join';

  const handleCreate = () => {
    onCreate?.(name.trim() || tr('group.create.defaultName'));
  };

  const header = (
    <View style={{ gap: t.spacing.xl, paddingTop: t.spacing.base }}>
      <View style={{ minHeight: titleMinHeight }}>
        <Text variant="headingScreen" color="fg" onLayout={onTitleLayout}>
          {isJoin ? tr('group.join.title') : tr('group.create.title')}
        </Text>
      </View>
      <View style={{ minHeight: bodyMinHeight }}>
        <Text variant="bodyLarge" color="fgSubtle" onLayout={onBodyLayout}>
          {isJoin ? tr('group.join.body') : tr('group.create.body')}
        </Text>
      </View>
      <SegmentedControl value={segment} onChange={setSegment} />
    </View>
  );

  const footer = isJoin ? undefined : (
    <CTAButton variant="primary" label={tr('group.create.cta')} onPress={handleCreate} />
  );

  return (
    <ScreenLayout
      padHorizontal
      avoidKeyboard
      header={header}
      footer={footer}
      bodyContentContainerStyle={{ paddingTop: t.spacing.xl }}
    >
      {isJoin ? (
        <JoinBody
          savedInvites={savedInvites}
          onOpenInvite={onOpenInvite}
          onSimulate={onSimulateIncomingLink}
        />
      ) : (
        <CreateBody
          name={name}
          onChangeName={setName}
          inviteUrl={inviteUrl}
          onCopyInvite={onCopyInvite}
        />
      )}
    </ScreenLayout>
  );
}

function CreateBody({
  name,
  onChangeName,
  inviteUrl,
  onCopyInvite,
}: {
  name: string;
  onChangeName: (v: string) => void;
  inviteUrl: string;
  onCopyInvite?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <View style={{ gap: t.spacing.xl }}>
      <TextInput
        label={tr('group.create.nameLabel')}
        value={name}
        onChangeText={onChangeName}
        placeholder={tr('group.create.namePlaceholder')}
      />
      <InviteBlock url={inviteUrl} onCopy={onCopyInvite} />
    </View>
  );
}

function JoinBody({
  savedInvites,
  onOpenInvite,
  onSimulate,
}: {
  savedInvites: SavedInvite[];
  onOpenInvite?: (invite: SavedInvite) => void;
  onSimulate?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <View style={{ gap: t.spacing.lg }}>
      <SimulateLinkRow onPress={onSimulate} />

      <View style={{ gap: t.spacing.sm }}>
        <Text variant="metaLabel" color="fgFaint">
          {tr('group.join.savedLabel')}
        </Text>
        {savedInvites.length === 0 ? (
          <Text variant="bodyStandard" color="fgFaint">
            {tr('group.join.emptySaved')}
          </Text>
        ) : (
          <View style={{ gap: t.spacing.md }}>
            {savedInvites.map((invite) => (
              <SavedInviteRow
                key={invite.id}
                invite={invite}
                onPress={() => onOpenInvite?.(invite)}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function SimulateLinkRow({ onPress }: { onPress?: () => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.base,
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.md,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <Link2 size={t.iconSize.base} strokeWidth={t.stroke.standard} color={t.colors.fgMuted} />
      <View style={{ flex: 1, gap: t.spacing.xxs }}>
        <Text variant="buttonLabelSocial" color="fg">
          {tr('group.join.simulateTitle')}
        </Text>
        <Text variant="bodySmall" color="fgFaint">
          {tr('group.join.simulateHint')}
        </Text>
      </View>
      <ChevronRight
        size={t.iconSize.base}
        strokeWidth={t.stroke.standard}
        color={t.colors.fgFaint}
      />
    </Pressable>
  );
}

function SavedInviteRow({ invite, onPress }: { invite: SavedInvite; onPress?: () => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.base,
        gap: t.spacing.sm,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
        <Text variant="buttonLabelSocial" color="fg" style={{ flex: 1 }}>
          {invite.groupName}
        </Text>
        <Text variant="metaLabel" color="fgFaint">
          {invite.receivedAgo}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.md }}>
        <View style={{ flexDirection: 'row' }}>
          {invite.memberInitials.slice(0, 4).map((letter, idx) => (
            <View
              key={`${letter}-${idx}`}
              style={{ marginLeft: idx === 0 ? 0 : -t.layout.avatarOverlapTight }}
            >
              <Avatar size={t.layout.avatarSm} initial={letter} />
            </View>
          ))}
        </View>
        <Text variant="bodySmall" color="fgFaint" style={{ flex: 1 }}>
          {tr('group.join.savedRowMeta', {
            name: invite.inviterName,
            count: invite.memberCount,
            memberLabel: tr('group.memberCountLabel', { count: invite.memberCount }),
          })}
        </Text>
        <ChevronRight
          size={t.iconSize.base}
          strokeWidth={t.stroke.standard}
          color={t.colors.fgFaint}
        />
      </View>
    </Pressable>
  );
}

function SegmentedControl({
  value,
  onChange,
}: {
  value: Segment;
  onChange: (next: Segment) => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const items: { key: Segment; label: string }[] = [
    { key: 'new', label: tr('group.create.segmentNew') },
    { key: 'join', label: tr('group.create.segmentJoin') },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: t.spacing.xs,
        backgroundColor: t.colors.bgMuted,
        borderRadius: t.radius.md,
        gap: t.spacing.xs,
      }}
    >
      {items.map(({ key, label }) => {
        const isActive = key === value;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(key)}
            style={{
              flex: 1,
              height: t.layout.segmentHeight,
              borderRadius: t.radius.sm,
              backgroundColor: isActive ? t.colors.bgRaised : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="buttonLabelSocial" color={isActive ? 'fg' : 'fgFaint'}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function InviteBlock({ url, onCopy }: { url: string; onCopy?: () => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onCopy}
      style={({ pressed }) => ({
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.base,
        gap: t.spacing.md,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <Text variant="metaLabel" color="fgFaint">
        {tr('group.create.inviteLabel')}
      </Text>
      <Text variant="headingSubLarge" color="fg" numberOfLines={1}>
        {url}
      </Text>
      <Text variant="bodySmall" color="fgSubtle">
        {tr('group.create.inviteHint')}
      </Text>
    </Pressable>
  );
}
