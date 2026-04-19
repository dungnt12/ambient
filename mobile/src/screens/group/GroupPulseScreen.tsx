import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, MessageCircleHeart, Sparkles, X } from 'lucide-react-native';
import {
  Avatar,
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
import { useGroupInsights } from '../../state/groupInsights';

export type GroupInsightKind = 'meetup' | 'support' | 'digest';

export type GroupInsight =
  | { kind: 'meetup'; proposalId: string }
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
  onProposeMeetup?: (proposalId: string) => void;
  onAddMeetupToCalendar?: (proposalId: string) => void;
  onCheckInOnMember?: (memberName: string) => void;
  onLeaveGroup?: () => void;
  /** Number of one-line notes sent by others that the viewer hasn't acknowledged. */
  receivedNotesCount?: number;
  /** Initials of senders — shown as a small avatar stack (max 3). */
  receivedNotesSenderInitials?: string[];
  /** Tap on the thinking-of-you card opens the received-notes sheet. */
  onOpenReceivedNotes?: () => void;
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
  onAddMeetupToCalendar,
  onCheckInOnMember,
  onLeaveGroup,
  onOpenSwitcher,
  hasMultipleGroups = false,
  receivedNotesCount = 0,
  receivedNotesSenderInitials = [],
  onOpenReceivedNotes,
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
      {receivedNotesCount > 0 ? (
        <ThinkingOfYouCard
          count={receivedNotesCount}
          initials={receivedNotesSenderInitials}
          onPress={onOpenReceivedNotes}
        />
      ) : null}
      {insights.map((entry, idx) => (
        <InsightCard
          key={`${entry.insight.kind}-${entry.groupName ?? 'single'}-${idx}`}
          insight={entry.insight}
          groupName={entry.groupName}
          onDismiss={onDismissInsight}
          onOpenDigest={onOpenDigest}
          onProposeMeetup={onProposeMeetup}
          onAddMeetupToCalendar={onAddMeetupToCalendar}
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
  onAddMeetupToCalendar,
  onCheckIn,
}: {
  insight: GroupInsight;
  groupName?: string;
  onDismiss?: () => void;
  onOpenDigest?: () => void;
  onProposeMeetup?: (proposalId: string) => void;
  onAddMeetupToCalendar?: (proposalId: string) => void;
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
      <MeetupInsightCard
        proposalId={insight.proposalId}
        groupName={groupName}
        onPropose={() => onProposeMeetup?.(insight.proposalId)}
        onAddToCalendar={() => onAddMeetupToCalendar?.(insight.proposalId)}
        onDismiss={onDismiss}
      />
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
  proposalId,
  groupName,
  onPropose,
  onAddToCalendar,
  onDismiss,
}: {
  proposalId: string;
  groupName?: string;
  onPropose?: () => void;
  onAddToCalendar?: () => void;
  onDismiss?: () => void;
}) {
  const t = useTheme();
  const { t: tr, i18n } = useTranslation();
  const { proposals } = useGroupInsights();
  const proposal = proposals[proposalId];
  const isProposed = proposal?.status === 'proposed';

  if (isProposed && proposal) {
    const when = formatRelativeTime(proposal.proposedAt, i18n.language);
    return (
      <InsightShell tone="brand">
        <InsightGroupEyebrow groupName={groupName} onBrand />
        <Text variant="metaLabel" color="fgOnBrand">
          {tr('group.insights.meetupProposedEyebrow', { when })}
        </Text>
        <Text variant="bodySerifTight" color="fgOnBrand">
          {proposal.headline}
        </Text>
        <Text variant="bodySmall" color="fgOnBrand">
          {tr('group.insights.meetupProposedBy', { name: proposal.proposedBy?.name ?? '—' })}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onAddToCalendar}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: t.spacing.xs,
            paddingTop: t.spacing.sm,
            opacity: pressed ? t.opacity.pressed : t.opacity.full,
          })}
        >
          <Text variant="buttonLabelSocial" color="fgOnBrand">
            {tr('group.insights.meetupAddToCalendar')}
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

function formatRelativeTime(iso: string | undefined, locale: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  const diffMin = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (diffMin < 1) return locale.startsWith('vi') ? 'vừa xong' : 'just now';
  if (diffMin < 60) {
    return locale.startsWith('vi') ? `${diffMin} phút trước` : `${diffMin} min ago`;
  }
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) {
    return locale.startsWith('vi') ? `${diffHr} giờ trước` : `${diffHr}h ago`;
  }
  const diffDay = Math.round(diffHr / 24);
  return locale.startsWith('vi') ? `${diffDay} ngày trước` : `${diffDay}d ago`;
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

function ThinkingOfYouCard({
  count,
  initials,
  onPress,
}: {
  count: number;
  initials: string[];
  onPress?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const shown = initials.slice(0, 3);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tr('group.thinkingOfYou.title', { count })}
      onPress={onPress}
      hitSlop={t.spacing.xs}
      style={({ pressed }) => ({
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <Card tone="raised">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.rhythm.inner }}>
          <AvatarStack initials={shown} />
          <View style={{ flex: 1, gap: t.spacing.xxs }}>
            <Text variant="metaLabel" color="fgFaint">
              {tr('group.thinkingOfYou.eyebrow')}
            </Text>
            <Text variant="bodySerifTight" color="fg">
              {tr('group.thinkingOfYou.title', { count })}
            </Text>
          </View>
          <ChevronRight
            size={t.iconSize.base}
            strokeWidth={t.stroke.standard}
            color={t.colors.fgFaint}
          />
        </View>
      </Card>
    </Pressable>
  );
}

function AvatarStack({ initials }: { initials: string[] }) {
  const t = useTheme();
  if (initials.length === 0) return null;
  return (
    <View style={{ flexDirection: 'row' }}>
      {initials.map((letter, idx) => (
        <View
          key={`${letter}-${idx}`}
          style={{
            marginLeft: idx === 0 ? 0 : -t.layout.avatarOverlapTight,
          }}
        >
          <Avatar size={32} initial={letter} />
        </View>
      ))}
    </View>
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
