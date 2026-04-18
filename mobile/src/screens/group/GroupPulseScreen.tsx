import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react-native';
import {
  CTAButton,
  CTAStack,
  ScreenLayout,
  Text,
  useTheme,
  type ColorToken,
  type PulseMood,
} from '../../design-system';
import type { PulseMember } from '../../mocks/group';
import { GroupInsightsBody } from './insights/GroupInsightsBody';
import { GroupInsightsEmptyBody } from './insights/GroupInsightsEmptyBody';

type PulseTab = 'pulse' | 'suggestions';

export type GroupPulseScreenProps = {
  groupName: string;
  memberCount: number;
  since?: string;
  members: PulseMember[];
  empty?: boolean;
  supportTargetName?: string;
  insightsEmpty?: boolean;
  onWriteFirst?: () => void;
  onInviteMore?: () => void;
  onProposeMeetup?: () => void;
  onLaterMeetup?: () => void;
  onOpenDigest?: () => void;
  onReminderSettings?: () => void;
  onBackToPulse?: () => void;
};

export function GroupPulseScreen({
  groupName,
  memberCount,
  since,
  members,
  empty = false,
  supportTargetName = 'Linh',
  insightsEmpty = false,
  onWriteFirst,
  onInviteMore,
  onProposeMeetup,
  onLaterMeetup,
  onOpenDigest,
  onReminderSettings,
  onBackToPulse,
}: GroupPulseScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [tab, setTab] = useState<PulseTab>('pulse');

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
        <View style={{ paddingTop: t.spacing.base, gap: t.spacing.sm }}>
          <Text variant="headingPulse" color="fg">
            {groupName}
          </Text>
          <Text variant="bodySmall" color="fgFaint">
            {subtitle}
          </Text>
          <View style={{ paddingTop: t.spacing.xl }}>
            <TabRow active={tab} onChange={setTab} />
          </View>
        </View>
      }
      footer={
        tab === 'pulse' ? (
          <View style={{ paddingTop: t.spacing.xl }}>
            <PulseFooter />
          </View>
        ) : undefined
      }
      bodyContentContainerStyle={{ paddingTop: t.spacing.xl, gap: t.spacing.md }}
    >
      {tab === 'pulse' ? (
        <PulseList members={members} />
      ) : insightsEmpty ? (
        <GroupInsightsEmptyBody onBack={onBackToPulse} onReminderSettings={onReminderSettings} />
      ) : (
        <GroupInsightsBody
          supportTargetName={supportTargetName}
          onProposeMeetup={onProposeMeetup}
          onLaterMeetup={onLaterMeetup}
          onOpenDigest={onOpenDigest}
        />
      )}
    </ScreenLayout>
  );
}

function TabRow({ active, onChange }: { active: PulseTab; onChange: (tab: PulseTab) => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const tabs: { key: PulseTab; label: string }[] = [
    { key: 'pulse', label: tr('group.tabs.pulse') },
    { key: 'suggestions', label: tr('group.tabs.suggestions') },
  ];
  return (
    <View style={{ flexDirection: 'row', gap: t.spacing.xl }}>
      {tabs.map(({ key, label }) => {
        const isActive = key === active;
        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(key)}
            hitSlop={t.spacing.sm}
          >
            <Text variant="tabSerif" color={isActive ? 'fg' : 'fgFaint'}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
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

const MOOD_DOT_COLORS: Record<PulseMood, ColorToken> = {
  calm: 'borderSoft',
  curious: 'bgMuted',
  dim: 'ringSoft',
  bright: 'brandSoft',
  empty: 'bgMuted',
};

function MemberSignalCard({ member, updatedLabel }: { member: PulseMember; updatedLabel: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.base,
        gap: t.spacing.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
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
      <Text variant="bodySerifTight" color="fg">
        {member.signal}
      </Text>
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
