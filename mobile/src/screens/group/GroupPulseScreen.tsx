import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, MessageCircleHeart, Sparkles, X } from 'lucide-react-native';
import {
  Card,
  CTAButton,
  CTAStack,
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

export type GroupPulseScreenProps = {
  groupName: string;
  memberCount: number;
  since?: string;
  members: PulseMember[];
  empty?: boolean;
  /** Optional AI-surfaced insight. When meaningful, shows at top of stream. */
  insight?: GroupInsight | null;
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
  insight = null,
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
        <View style={{ paddingTop: t.rhythm.header.padTop, gap: t.rhythm.header.gap }}>
          <GroupNameRow
            groupName={groupName}
            hasMultipleGroups={hasMultipleGroups}
            onOpenSwitcher={onOpenSwitcher}
          />
          <Text variant="bodySmall" color="fgFaint">
            {subtitle}
          </Text>
        </View>
      }
      footer={
        <View style={{ paddingTop: t.spacing.xl }}>
          <PulseFooter />
        </View>
      }
      bodyContentContainerStyle={{ paddingTop: t.spacing.xxl }}
      bodyGap={t.rhythm.list}
    >
      {insight ? (
        <InsightCard
          insight={insight}
          onDismiss={onDismissInsight}
          onOpenDigest={onOpenDigest}
          onProposeMeetup={onProposeMeetup}
          onCheckIn={onCheckInOnMember}
        />
      ) : null}
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
        <Text variant="buttonLabelSocial" color="fg">
          {member.name}
        </Text>
        <View style={{ flex: 1 }} />
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
  onDismiss,
  onOpenDigest,
  onProposeMeetup,
  onCheckIn,
}: {
  insight: GroupInsight;
  onDismiss?: () => void;
  onOpenDigest?: () => void;
  onProposeMeetup?: () => void;
  onCheckIn?: (name: string) => void;
}) {
  if (insight.kind === 'support') {
    return (
      <SupportInsightCard
        name={insight.targetName}
        onCheckIn={() => onCheckIn?.(insight.targetName)}
        onDismiss={onDismiss}
      />
    );
  }
  if (insight.kind === 'meetup') {
    return <MeetupInsightCard onPropose={onProposeMeetup} onDismiss={onDismiss} />;
  }
  return <DigestInsightCard onOpen={onOpenDigest} onDismiss={onDismiss} />;
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
  onPropose,
  onDismiss,
}: {
  onPropose?: () => void;
  onDismiss?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <InsightShell tone="brand" onDismiss={onDismiss}>
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
  onCheckIn,
  onDismiss,
}: {
  name: string;
  onCheckIn?: () => void;
  onDismiss?: () => void;
}) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <InsightShell onDismiss={onDismiss}>
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

function DigestInsightCard({ onOpen, onDismiss }: { onOpen?: () => void; onDismiss?: () => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  return (
    <InsightShell onDismiss={onDismiss}>
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
      header={
        <View style={{ paddingTop: t.spacing.base }}>
          <Text variant="headingPulse" color="fg">
            {groupName}
          </Text>
          <Text variant="bodySmall" color="fgFaint" style={{ marginTop: t.spacing.md }}>
            {subtitle}
          </Text>
        </View>
      }
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
