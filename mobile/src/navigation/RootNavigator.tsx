import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingWelcomeScreen } from '../screens/onboarding';
import { EmailScreen, OtpScreen, SignInScreen } from '../screens/auth';
import {
  DayScreen,
  EntryDetailScreen,
  EntryEditScreen,
  JournalComposeScreen,
} from '../screens/journal';
import {
  GroupAcceptInviteScreen,
  GroupCreateSheetScreen,
  GroupJoinedScreen,
  GroupPulseScreen,
  GroupSwitcherSheetScreen,
  InviteOfferSheetScreen,
  LeaveGroupSheetScreen,
} from '../screens/group';
import {
  MeetupProposalSheetScreen,
  QuietNotesEmptyScreen,
  QuietNotesScreen,
  SupportSignalDetailScreen,
  WeeklyDigestNeedsWarmthScreen,
  WeeklyDigestScreen,
} from '../screens/ambient';
import {
  DeleteAccountScreen,
  NotificationsPermissionScreen,
  PrivacyByDesignScreen,
} from '../screens/settings';
import { SAMPLE_DAY_ENTRIES, SAMPLE_ENTRY_BODY } from '../mocks/journal';
import {
  SAMPLE_GROUPS,
  SAMPLE_GROUP_INSIGHTS,
  SAMPLE_PULSE_MEMBERS,
  SAMPLE_TIER,
} from '../mocks/group';
import { useActiveGroup } from '../state/activeGroup';
import {
  SAMPLE_MEETUP_PROPOSAL,
  SAMPLE_QUIET_NOTES,
  SAMPLE_SUPPORT_SIGNAL,
  SAMPLE_WEEKLY_DIGEST,
  SAMPLE_WEEKLY_DIGEST_WARMTH,
} from '../mocks/ambient';
import { TabsNavigator } from './TabsNavigator';
import type { RootScreenProps, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function OnboardingRoute({ navigation }: RootScreenProps<'Onboarding'>) {
  return (
    <OnboardingWelcomeScreen
      onContinue={() => navigation.navigate('SignIn')}
      onSignIn={() => navigation.navigate('SignIn')}
      onDevSkipAuth={() =>
        navigation.reset({ index: 0, routes: [{ name: 'Tabs', params: { screen: 'Journal' } }] })
      }
    />
  );
}

function SignInRoute({ navigation }: RootScreenProps<'SignIn'>) {
  return (
    <SignInScreen
      onApple={() => navigation.navigate('Email')}
      onEmail={() => navigation.navigate('Email')}
      onNewHere={() => navigation.navigate('Onboarding')}
    />
  );
}

function EmailRoute({ navigation }: RootScreenProps<'Email'>) {
  return (
    <EmailScreen
      onBack={() => navigation.goBack()}
      onSendCode={(email) => navigation.navigate('Otp', { email })}
      onUseApple={() => navigation.goBack()}
    />
  );
}

function OtpRoute({ navigation, route }: RootScreenProps<'Otp'>) {
  return (
    <OtpScreen
      email={route.params.email}
      onBack={() => navigation.goBack()}
      onVerify={() => navigation.navigate('NotificationsPermission')}
    />
  );
}

function JournalComposeRoute({ navigation }: RootScreenProps<'JournalCompose'>) {
  return (
    <JournalComposeScreen
      dayLabel="THURSDAY · APR 17"
      prompt="Is anything lighter today than yesterday?"
      promptFollowup="Yesterday you wrote about feeling low. How's tonight?"
      onCancel={() => navigation.goBack()}
      onSave={() => {
        navigation.goBack();
      }}
    />
  );
}

function EntryDetailRoute({ navigation, route }: RootScreenProps<'EntryDetail'>) {
  const { entryId } = route.params;
  return (
    <EntryDetailScreen
      dateEyebrow="TODAY · APR 17 · 08:24"
      headline="You feel ordinary today."
      body={SAMPLE_ENTRY_BODY}
      aiSummary="This person is having a quiet day — steady, unshaken. A warm gratitude for familiar things."
      mood={3}
      onBack={() => navigation.goBack()}
      onEdit={() => navigation.navigate('EntryEdit', { entryId })}
    />
  );
}

const MONTH_LABELS_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

function DayRoute({ navigation, route }: RootScreenProps<'Day'>) {
  const { year, monthIndex, day } = route.params;
  const today = new Date();
  const isToday =
    today.getFullYear() === year && today.getMonth() === monthIndex && today.getDate() === day;
  const dayLabel = `${day} ${MONTH_LABELS_EN[monthIndex]} ${year}`;
  return (
    <DayScreen
      dayLabel={dayLabel}
      entries={SAMPLE_DAY_ENTRIES}
      isToday={isToday}
      onBack={() => navigation.goBack()}
      onEntryPress={(entry) => navigation.navigate('EntryDetail', { entryId: entry.id })}
      onAddMore={() => navigation.navigate('JournalCompose')}
    />
  );
}

function EntryEditRoute({ navigation }: RootScreenProps<'EntryEdit'>) {
  return (
    <EntryEditScreen
      dateEyebrow="TODAY · APR 17 · 08:24"
      initialContent={SAMPLE_ENTRY_BODY}
      initialMood={3}
      onCancel={() => navigation.goBack()}
      onSave={() => navigation.goBack()}
    />
  );
}

function GroupCreateRoute({ navigation }: RootScreenProps<'GroupCreate'>) {
  const primary = SAMPLE_GROUPS[0];
  const primaryMembers = SAMPLE_PULSE_MEMBERS[primary.id] ?? [];
  return (
    <GroupCreateSheetScreen
      inviteUrl={primary.inviteUrl}
      onCreate={(groupName) => navigation.replace('GroupJoined', { groupName })}
      onCopyInvite={() => {}}
      onSimulateIncomingLink={() =>
        navigation.replace('InviteOffer', {
          inviterName: primary.inviterName,
          groupName: primary.name,
          memberCount: primary.memberCount,
          since: primary.since,
          memberInitials: primaryMembers.map((m) => m.initial),
        })
      }
      onDismiss={() => navigation.goBack()}
    />
  );
}

function InviteOfferRoute({ navigation, route }: RootScreenProps<'InviteOffer'>) {
  const { inviterName, groupName, memberCount, since, memberInitials } = route.params;
  return (
    <InviteOfferSheetScreen
      inviterName={inviterName}
      groupName={groupName}
      memberCount={memberCount}
      since={since}
      memberInitials={memberInitials}
      onJoin={() => navigation.replace('GroupAcceptInvite', { inviterName, groupName })}
      onSaveForLater={() => navigation.goBack()}
    />
  );
}

function GroupAcceptInviteRoute({ navigation, route }: RootScreenProps<'GroupAcceptInvite'>) {
  const { inviterName, groupName } = route.params;
  const primary = SAMPLE_GROUPS[0];
  const primaryMembers = SAMPLE_PULSE_MEMBERS[primary.id] ?? [];
  return (
    <GroupAcceptInviteScreen
      inviterName={inviterName}
      groupName={groupName}
      memberCount={primary.memberCount}
      since={primary.since}
      memberInitials={primaryMembers.map((m) => m.initial)}
      onAccept={() => navigation.replace('GroupJoined', { groupName })}
      onLater={() => navigation.goBack()}
    />
  );
}

function GroupJoinedRoute({ navigation, route }: RootScreenProps<'GroupJoined'>) {
  const { groupName } = route.params;
  const primary = SAMPLE_GROUPS[0];
  const primaryMembers = SAMPLE_PULSE_MEMBERS[primary.id] ?? [];
  return (
    <GroupJoinedScreen
      groupName={groupName}
      memberNames={primaryMembers.map((m) => m.name)}
      onWriteFirst={() => navigation.navigate('JournalCompose')}
      onEnterPulse={() => navigation.replace('GroupPulse', { groupName })}
    />
  );
}

function GroupPulseRoute({ navigation, route }: RootScreenProps<'GroupPulse'>) {
  const { groupName } = route.params;
  const active = SAMPLE_GROUPS.find((g) => g.name === groupName) ?? SAMPLE_GROUPS[0];
  const members = SAMPLE_PULSE_MEMBERS[active.id] ?? [];
  const insight = SAMPLE_GROUP_INSIGHTS[active.id] ?? null;
  return (
    <GroupPulseScreen
      groupName={active.name}
      memberCount={active.memberCount}
      since={active.since}
      members={members}
      insights={insight ? [{ insight }] : []}
      hasMultipleGroups={SAMPLE_GROUPS.length > 1}
      onOpenSwitcher={() => navigation.navigate('GroupSwitcher')}
      onInviteMore={() => navigation.navigate('GroupCreate')}
      onWriteFirst={() => navigation.navigate('JournalCompose')}
      onDismissInsight={() => {}}
      onProposeMeetup={() => navigation.navigate('MeetupProposal')}
      onOpenDigest={() => navigation.navigate('WeeklyDigest')}
      onCheckInOnMember={() => navigation.navigate('SupportSignalDetail')}
      onLeaveGroup={() => navigation.navigate('LeaveGroup', { groupName: active.name })}
    />
  );
}

function GroupSwitcherRoute({ navigation }: RootScreenProps<'GroupSwitcher'>) {
  const { activeGroupId, setActiveGroupId } = useActiveGroup();
  return (
    <GroupSwitcherSheetScreen
      groups={SAMPLE_GROUPS}
      activeGroupId={activeGroupId}
      tier={SAMPLE_TIER}
      onSelectGroup={(id) => {
        setActiveGroupId(id);
        navigation.goBack();
      }}
      onSelectAll={() => {
        setActiveGroupId(null);
        navigation.goBack();
      }}
      onCreateNew={() => navigation.replace('GroupCreate')}
      onDismiss={() => navigation.goBack()}
    />
  );
}

function LeaveGroupRoute({ navigation, route }: RootScreenProps<'LeaveGroup'>) {
  const { groupName } = route.params;
  return (
    <LeaveGroupSheetScreen
      groupName={groupName}
      onLeave={() => navigation.popToTop()}
      onStay={() => navigation.goBack()}
      onDismiss={() => navigation.goBack()}
    />
  );
}

function QuietNotesRoute({ navigation }: RootScreenProps<'QuietNotes'>) {
  const exit = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Tabs', params: { screen: 'Journal' } }] });
    }
  };
  return (
    <QuietNotesScreen
      notes={SAMPLE_QUIET_NOTES}
      onSelect={(note) => navigation.navigate(note.target)}
      onClose={exit}
    />
  );
}

function QuietNotesEmptyRoute({ navigation }: RootScreenProps<'QuietNotesEmpty'>) {
  return (
    <QuietNotesEmptyScreen onBack={() => navigation.goBack()} onMute={() => navigation.goBack()} />
  );
}

function WeeklyDigestRoute({ navigation }: RootScreenProps<'WeeklyDigest'>) {
  return (
    <WeeklyDigestScreen
      digest={SAMPLE_WEEKLY_DIGEST}
      onPropose={() => navigation.navigate('MeetupProposal')}
      onClose={() => navigation.goBack()}
    />
  );
}

function WeeklyNeedsWarmthRoute({ navigation }: RootScreenProps<'WeeklyNeedsWarmth'>) {
  return (
    <WeeklyDigestNeedsWarmthScreen
      digest={SAMPLE_WEEKLY_DIGEST_WARMTH}
      onMessage={() => navigation.navigate('SupportSignalDetail')}
      onOpenSummary={() => navigation.goBack()}
      onClose={() => navigation.goBack()}
    />
  );
}

function MeetupProposalRoute({ navigation }: RootScreenProps<'MeetupProposal'>) {
  return (
    <MeetupProposalSheetScreen
      proposal={SAMPLE_MEETUP_PROPOSAL}
      onPropose={() => navigation.goBack()}
      onDismiss={() => navigation.goBack()}
    />
  );
}

function NotificationsPermissionRoute({
  navigation,
  route,
}: RootScreenProps<'NotificationsPermission'>) {
  const dismiss =
    route.params?.returnTo === 'back'
      ? () => navigation.goBack()
      : () =>
          navigation.reset({ index: 0, routes: [{ name: 'Tabs', params: { screen: 'Journal' } }] });
  return <NotificationsPermissionScreen onAllow={dismiss} onSkip={dismiss} />;
}

function PrivacyByDesignRoute({ navigation }: RootScreenProps<'PrivacyByDesign'>) {
  return (
    <PrivacyByDesignScreen
      onAcknowledge={() => navigation.goBack()}
      onReadPolicy={() => navigation.goBack()}
    />
  );
}

function DeleteAccountRoute({ navigation }: RootScreenProps<'DeleteAccount'>) {
  return (
    <DeleteAccountScreen
      onConfirmDelete={() => navigation.popToTop()}
      onKeep={() => navigation.goBack()}
    />
  );
}

function SupportSignalDetailRoute({ navigation }: RootScreenProps<'SupportSignalDetail'>) {
  return (
    <SupportSignalDetailScreen
      signal={SAMPLE_SUPPORT_SIGNAL}
      onBack={() => navigation.goBack()}
      onSend={() => navigation.goBack()}
      onLater={() => navigation.goBack()}
    />
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingRoute} />
      <Stack.Screen name="SignIn" component={SignInRoute} />
      <Stack.Screen name="Email" component={EmailRoute} />
      <Stack.Screen name="Otp" component={OtpRoute} />
      <Stack.Screen name="Tabs" component={TabsNavigator} options={{ animation: 'fade' }} />
      <Stack.Screen name="JournalCompose" component={JournalComposeRoute} />
      <Stack.Screen name="Day" component={DayRoute} />
      <Stack.Screen name="EntryEdit" component={EntryEditRoute} />
      <Stack.Screen name="EntryDetail" component={EntryDetailRoute} />
      <Stack.Screen
        name="GroupCreate"
        component={GroupCreateRoute}
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="InviteOffer"
        component={InviteOfferRoute}
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
      <Stack.Screen name="GroupAcceptInvite" component={GroupAcceptInviteRoute} />
      <Stack.Screen name="GroupJoined" component={GroupJoinedRoute} />
      <Stack.Screen name="GroupPulse" component={GroupPulseRoute} />
      <Stack.Screen
        name="GroupSwitcher"
        component={GroupSwitcherRoute}
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="LeaveGroup"
        component={LeaveGroupRoute}
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
      <Stack.Screen name="QuietNotes" component={QuietNotesRoute} />
      <Stack.Screen name="QuietNotesEmpty" component={QuietNotesEmptyRoute} />
      <Stack.Screen name="WeeklyDigest" component={WeeklyDigestRoute} />
      <Stack.Screen name="WeeklyNeedsWarmth" component={WeeklyNeedsWarmthRoute} />
      <Stack.Screen name="SupportSignalDetail" component={SupportSignalDetailRoute} />
      <Stack.Screen name="NotificationsPermission" component={NotificationsPermissionRoute} />
      <Stack.Screen name="PrivacyByDesign" component={PrivacyByDesignRoute} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountRoute} />
      <Stack.Screen
        name="MeetupProposal"
        component={MeetupProposalRoute}
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
    </Stack.Navigator>
  );
}
