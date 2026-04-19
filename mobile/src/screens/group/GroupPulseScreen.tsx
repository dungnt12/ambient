import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, MessageCircleHeart, Sparkles, X } from 'lucide-react-native';
import {
  Card,
  CTAButton,
  CTAStack,
  ScreenHeader,
  ScreenLayout,
  Text,
  useTheme,
  type ColorToken,
  type PulseMood,
} from '../../design-system';
import type { PulseMember } from '../../mocks/group';

export type GroupInsightKind = 'meetup' | 'support' | 'digest';

export type GroupInsight =
  | { kind: 'meetup' }
  | { kind: 'support'; targetName: string }
  | { kind: 'digest' };

export type InsightCardEntry = {
  insight: GroupInsight;
  // When multiple groups' insights are stacked (All view), the group name is
  // rendered as an eyebrow so the reader knows which circle it belongs to.
  groupName?: string;
};

export type GroupPulseScreenProps = {
  groupName: string;
  memberCount: number;
  since?: string;
  members: PulseMember[];
  empty?: boolean;
  /** AI-surfaced insights shown at top of stream. Empty array = silence. */
  insights?: InsightCardEntry[];
  /**
   * When set, the header subtitle becomes "{members} · across {groupCount} groups"
   * to reflect the aggregated "All groups" feed. `since` is ignored in this mode.
   */
  aggregatedGroupCount?: number;
  onWriteFirst?: () => void;
  onInviteMore?: () => void;
  onDismissInsight?: () => void;
  onOpenDigest?: () => void;
  onProposeMeetup?: () => void;
  onCheckInOnMember?: (memberName: string) => void;
  onLeaveGroup?: () => void;
  /** Tapping the group name opens the switcher sheet. */
  onOpenSwitcher?: () => void;
  /** When false, the name renders without a chevron affordance. */
  hasMultipleGroups?: boolean;
};

export function GroupPulseScreen({
  groupName,
  memberCount,
  since,
  members,
  empty = false,
  insights = [],
  aggregatedGroupCount,
  onWriteFirst,
  onInviteMore,
  onDismissInsight,
  onOpenDigest,
  onProposeMeetup,
  onCheckInOnMember,
  onLeaveGroup,
  onOpenSwitcher,
  hasMultipleGroups = false,
}: GroupPulseScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const subtitle = empty
    ? tr('group.memberSubtitleToday', { count: memberCount })
    : aggregatedGroupCount != null
      ? tr('group.memberSubtitleAll', { count: memberCount, groups: aggregatedGroupCount })
      : since
        ? tr('group.memberSubtitle', { count: memberCount, since })
        : tr('group.memberSubtitlePlain', { count: memberCount });

  if (empty) {
    return (
      <PulseEmpty
        groupName={groupName}
        subtitle={subtitle}
        members={members}
        onWriteFirst={onWriteFirst}
        onInviteMore={onInviteMore}
      />
    );
  }

  return (
    <ScreenLayout
      padHorizontal
      header={
        <ScreenHeader
          title={
            <GroupNameRow
              groupName={groupName}
              hasMultipleGroups={hasMultipleGroups}
              onOpenSwitcher={onOpenSwitcher}
            />
          }
          subtitle={subtitle}
        />
      }
      footer={
        <View style={{ paddingTop: t.spacing.xl }}>
          <PulseFooter />
        </View>
      }
      bodyContentContainerStyle={{ paddingTop: t.spacing.xxl }}
      bodyGap={t.rhythm.list}
    >
      {insights.map((entry, idx) => (
        <InsightCard
          key={`${entry.insight.kind}-${entry.groupName ?? 'single'}-${idx}`}
          insight={entry.insight}
          groupName={entry.groupName}
          onDismiss={onDismissInsight}
          onOpenDigest={onOpenDigest}
          onProposeMeetup={onProposeMeetup}
          onCheckIn={onCheckInOnMember}
        />
      ))}
      <PulseList members={members} />
      {onLeaveGroup ? <LeaveGroupRow onPress={onLeaveGroup} /> : null}
    </ScreenLayout>
  );
}

function GroupNameRow({
  groupName,
  hasMultipleGroups,
  onOpenSwitcher,
}: {
  groupName: string;
  hasMultipleGroups: boolean;
  onOpenSwitcher?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  if (!hasMultipleGroups || !onOpenSwitcher) {
    return (
      <Text variant="headingPulse" color="fg">
        {groupName}
      </Text>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tr('group.switcher.open')}
      onPress={onOpenSwitcher}
      hitSlop={t.spacing.sm}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.sm,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <Text variant="headingPulse" color="fg">
        {groupName}
      </Text>
      <ChevronDown size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
    </Pressable>
  );
}

function LeaveGroupRow({ onPress }: { onPress: () => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      hitSlop={t.spacing.sm}
      style={({ pressed }) => ({
        alignItems: 'center',
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <Text variant="metaLabel" color="fgFaint">
        {tr('group.pulse.leave')}
      </Text>
    </Pressable>
  );
}

function PulseList({ members }: { members: PulseMember[] }) {
  const { t: tr } = useTranslation();
  const formatUpdated = (m: PulseMember) =>
    m.updatedAt.kind === 'yesterday'
      ? tr('group.updatedAt.yesterday')
      : tr('group.updatedAt.hoursAgo', { count: m.updatedAt.hours });

  return (
    <>
      {members.map((m) => (
        <MemberSignalCard key={m.id} member={m} updatedLabel={formatUpdated(m)} />
      ))}
    </>
  );
}

// Dot color follows mood intensity on a single warm axis from muted (low) to
// brand-strong (high). Same MoodLevel vocabulary as MoodGlyph — 'empty' slot
// when no signal has formed yet.
const MOOD_DOT_COLORS: Record<PulseMood, ColorToken> = {
  1: 'ringStrong',
  2: 'ringSoft',
  3: 'borderSoft',
  4: 'brandSoft',
  5: 'brand',
  empty: 'bgMuted',
};

function MemberSignalCard({ member, updatedLabel }: { member: PulseMember; updatedLabel: string }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.rhythm.inner }}>
        <View
          style={{
            width: t.layout.moodDot,
            height: t.layout.moodDot,
            borderRadius: t.radius.pill,
            backgroundColor: t.colors[MOOD_DOT_COLORS[member.mood]],
          }}
        />
        <View style={{ flex: 1, gap: t.spacing.xxs }}>
          <Text variant="buttonLabelSocial" color="fg">
            {member.name}
          </Text>
          {member.fromGroup ? (
            <Text variant="metaLabel" color="fgFaint">
              {tr('group.fromGroup', { group: member.fromGroup })}
            </Text>
          ) : null}
        </View>
        <Text variant="metaLabel" color="fgFaint">
          {updatedLabel}
        </Text>
      </View>
      <Text variant="bodySerif" color="fg">
        {member.signal}
      </Text>
    </Card>
  );
}

function InsightCard({
  insight,
  groupName,
  onDismiss,
  onOpenDigest,
  onProposeMeetup,
  onCheckIn,
}: {
  insight: GroupInsight;
  groupName?: string;
  onDismiss?: () => void;
  onOpenDigest?: () => void;
  onProposeMeetup?: () => void;
  onCheckIn?: (name: string) => void;
}) {
  if (insight.kind === 'support') {
    return (
      <SupportInsightCard
        name={insight.targetName}
        groupName={groupName}
        onCheckIn={() => onCheckIn?.(insight.targetName)}
        onDismiss={onDismiss}
      />
    );
  }
  if (insight.kind === 'meetup') {
    return (
      <MeetupInsightCard groupName={groupName} onPropose={onProposeMeetup} onDismiss={onDismiss} />
    );
  }
  return <DigestInsightCard groupName={groupName} onOpen={onOpenDigest} onDismiss={onDismiss} />;
}

function InsightGroupEyebrow({
  groupName,
  onBrand = false,
}: {
  groupName?: string;
  onBrand?: boolean;
}) {
  const { t: tr } = useTranslation();
  if (!groupName) return null;
  return (
    <Text variant="metaLabel" color={onBrand ? 'fgOnBrand' : 'fgFaint'}>
      {tr('group.fromGroup', { group: groupName })}
    </Text>
  );
}

function InsightShell({
  children,
  onDismiss,
  tone = 'raised',
}: {
  children: ReactNode;
  onDismiss?: () => void;
  tone?: 'raised' | 'brand';
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const isBrand = tone === 'brand';
  return (
    <Card tone={isBrand ? 'brand' : 'raised'}>
      {children}
      {onDismiss ? (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tr('group.insights.dismiss')}
            onPress={onDismiss}
            hitSlop={t.spacing.sm}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: t.spacing.sm,
              paddingVertical: t.spacing.xs,
              opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
            })}
          >
            <X
              size={t.iconSize.sm}
              strokeWidth={t.stroke.standard}
              color={isBrand ? t.colors.fgOnBrand : t.colors.fgFaint}
            />
            <Text variant="metaLabel" color={isBrand ? 'fgOnBrand' : 'fgFaint'}>
              {tr('group.insights.dismiss')}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </Card>
  );
}

function MeetupInsightCard({
  groupName,
  onPropose,
  onDismiss,
}: {
  groupName?: string;
  onPropose?: () => void;
  onDismiss?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <InsightShell tone="brand" onDismiss={onDismiss}>
      <InsightGroupEyebrow groupName={groupName} onBrand />
      <Text variant="metaLabel" color="fgOnBrand">
        {tr('group.insights.meetupEyebrow')}
      </Text>
      <Text variant="bodySerifTight" color="fgOnBrand">
        {tr('group.insights.meetupBody')}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onPropose}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: t.spacing.xs,
          paddingTop: t.spacing.sm,
          opacity: pressed ? t.opacity.pressed : t.opacity.full,
        })}
      >
        <Text variant="buttonLabelSocial" color="fgOnBrand">
          {tr('group.insights.meetupPropose')}
        </Text>
        <ChevronRight
          size={t.iconSize.sm}
          strokeWidth={t.stroke.standard}
          color={t.colors.fgOnBrand}
        />
      </Pressable>
    </InsightShell>
  );
}

function SupportInsightCard({
  name,
  groupName,
  onCheckIn,
  onDismiss,
}: {
  name: string;
  groupName?: string;
  onCheckIn?: () => void;
  onDismiss?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <InsightShell onDismiss={onDismiss}>
      <InsightGroupEyebrow groupName={groupName} />
      <Text variant="metaLabel" color="brandSoft">
        {tr('group.insights.supportEyebrow')}
      </Text>
      <Text variant="bodySerifTight" color="fg">
        {tr('group.insights.supportBody', { name })}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onCheckIn}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: t.spacing.xs,
          paddingTop: t.spacing.sm,
          opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
        })}
      >
        <MessageCircleHeart
          size={t.iconSize.sm}
          strokeWidth={t.stroke.standard}
          color={t.colors.brand}
        />
        <Text variant="buttonLabelSocial" color="brand">
          {tr('group.insights.supportCheckIn', { name })}
        </Text>
      </Pressable>
    </InsightShell>
  );
}

function DigestInsightCard({
  groupName,
  onOpen,
  onDismiss,
}: {
  groupName?: string;
  onOpen?: () => void;
  onDismiss?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <InsightShell onDismiss={onDismiss}>
      <InsightGroupEyebrow groupName={groupName} />
      <Text variant="metaLabel" color="fgFaint">
        {tr('group.insights.digestEyebrow')}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onOpen}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: t.spacing.sm,
          paddingTop: t.spacing.sm,
          opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
        })}
      >
        <Text variant="buttonLabelSocial" color="fg" style={{ flex: 1 }}>
          {tr('group.insights.digestLabel')}
        </Text>
        <ChevronRight
          size={t.iconSize.base}
          strokeWidth={t.stroke.standard}
          color={t.colors.fgFaint}
        />
      </Pressable>
    </InsightShell>
  );
}

function PulseFooter() {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
      <Sparkles size={t.iconSize.sm} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
      <Text variant="bodySmall" color="fgFaint" style={{ flex: 1 }}>
        {tr('group.aiSignalNote')}
      </Text>
    </View>
  );
}

function PulseEmpty({
  groupName,
  subtitle,
  members,
  onWriteFirst,
  onInviteMore,
}: {
  groupName: string;
  subtitle: string;
  members: PulseMember[];
  onWriteFirst?: () => void;
  onInviteMore?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const initials = members.slice(0, 4).map((m) => m.initial);

  return (
    <ScreenLayout
      padHorizontal
      header={<ScreenHeader title={groupName} titleVariant="headingPulse" subtitle={subtitle} />}
      footer={
        <CTAStack
          primary={
            <CTAButton variant="dark" label={tr('group.pulse.empty.cta')} onPress={onWriteFirst} />
          }
          secondary={{
            label: tr('group.pulse.empty.invite'),
            onPress: () => onInviteMore?.(),
          }}
        />
      }
      bodyContentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: t.spacing.xl,
      }}
    >
      <EmptyPulseBlob />

      <View style={{ gap: t.spacing.md, alignItems: 'center' }}>
        <Text variant="overline" color="fgFaint" align="center">
          {tr('group.pulse.empty.eyebrow')}
        </Text>
        <Text variant="headingSub" color="fg" align="center">
          {tr('group.pulse.empty.headline')}
        </Text>
        <Text variant="bodyLarge" color="fgSubtle" align="center">
          {tr('group.pulse.empty.body')}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: t.spacing.md }}>
        {initials.map((letter, idx) => (
          <SmallInitial key={`${letter}-${idx}`} letter={letter} />
        ))}
      </View>
    </ScreenLayout>
  );
}

function EmptyPulseBlob() {
  const t = useTheme();
  const blob = t.layout.illustrationSlot;
  const inner = t.layout.avatarMd;
  return (
    <View
      style={{
        width: blob,
        height: blob,
        borderRadius: blob / 2,
        backgroundColor: t.colors.bgMuted,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: inner,
          height: inner,
          borderRadius: inner / 2,
          backgroundColor: t.colors.bg,
          borderWidth: t.brand.border.hairline,
          borderColor: t.colors.borderSoft,
        }}
      />
    </View>
  );
}

function SmallInitial({ letter }: { letter: string }) {
  const t = useTheme();
  const size = t.layout.avatarSm;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: t.colors.brandSoft,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text variant="buttonLabelSocial" color="fgOnBrand">
        {letter}
      </Text>
    </View>
  );
}
