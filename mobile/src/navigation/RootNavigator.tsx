import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingWelcomeScreen } from '../screens/onboarding';
import { EmailScreen, OtpScreen, SignInScreen } from '../screens/auth';
import { EntryDetailScreen, EntryEditScreen, JournalComposeScreen } from '../screens/journal';
import {
  GroupAcceptInviteScreen,
  GroupCreateJoinScreen,
  GroupJoinedScreen,
  GroupPulseScreen,
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
  SettingsScreen,
} from '../screens/settings';
import { SAMPLE_ENTRY_BODY } from '../mocks/journal';
import { SAMPLE_GROUP, SAMPLE_PULSE_MEMBERS, SAMPLE_SAVED_INVITES } from '../mocks/group';
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
  return (
    <GroupCreateJoinScreen
      inviteUrl={SAMPLE_GROUP.inviteUrl}
      savedInvites={SAMPLE_SAVED_INVITES}
      onCreate={(groupName) => navigation.navigate('GroupJoined', { groupName })}
      onOpenInvite={(invite) =>
        navigation.navigate('InviteOffer', {
          inviterName: invite.inviterName,
          groupName: invite.groupName,
          memberCount: invite.memberCount,
          since: invite.since,
          memberInitials: invite.memberInitials,
        })
      }
      onSimulateIncomingLink={() =>
        navigation.navigate('InviteOffer', {
          inviterName: SAMPLE_GROUP.inviterName,
          groupName: SAMPLE_GROUP.name,
          memberCount: SAMPLE_GROUP.memberCount,
          since: SAMPLE_GROUP.since,
          memberInitials: SAMPLE_PULSE_MEMBERS.map((m) => m.initial),
        })
      }
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
  return (
    <GroupAcceptInviteScreen
      inviterName={inviterName}
      groupName={groupName}
      memberCount={SAMPLE_GROUP.memberCount}
      since={SAMPLE_GROUP.since}
      memberInitials={SAMPLE_PULSE_MEMBERS.map((m) => m.initial)}
      onAccept={() => navigation.replace('GroupJoined', { groupName })}
      onLater={() => navigation.goBack()}
    />
  );
}

function GroupJoinedRoute({ navigation, route }: RootScreenProps<'GroupJoined'>) {
  const { groupName } = route.params;
  return (
    <GroupJoinedScreen
      groupName={groupName}
      memberNames={SAMPLE_PULSE_MEMBERS.map((m) => m.name)}
      onWriteFirst={() => navigation.navigate('JournalCompose')}
      onEnterPulse={() => navigation.replace('GroupPulse', { groupName })}
    />
  );
}

function GroupPulseRoute({ navigation, route }: RootScreenProps<'GroupPulse'>) {
  const { groupName } = route.params;
  return (
    <GroupPulseScreen
      groupName={groupName}
      memberCount={SAMPLE_GROUP.memberCount}
      since={SAMPLE_GROUP.since}
      members={SAMPLE_PULSE_MEMBERS}
      onInviteMore={() => navigation.navigate('GroupCreate')}
      onWriteFirst={() => navigation.navigate('JournalCompose')}
      onReminderSettings={() => navigation.navigate('LeaveGroup', { groupName })}
    />
  );
}

function GroupPulseEmptyRoute({ navigation }: RootScreenProps<'GroupPulseEmpty'>) {
  return (
    <GroupPulseScreen
      groupName={SAMPLE_GROUP.name}
      memberCount={SAMPLE_GROUP.memberCount}
      members={SAMPLE_PULSE_MEMBERS}
      empty
      onWriteFirst={() => navigation.navigate('JournalCompose')}
      onInviteMore={() => navigation.navigate('GroupCreate')}
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

function SettingsRoute({ navigation }: RootScreenProps<'Settings'>) {
  return (
    <SettingsScreen
      userName="Phong"
      userEmail="phong@ambient.app"
      userInitial="P"
      reminderTime="21:00"
      timezone="Asia/Ho_Chi_Minh"
      aiSuggestionsEnabled
      onToggleAiSuggestions={() => {}}
      onOpenReminder={() => {}}
      onOpenTimezone={() => {}}
      onOpenPrivacy={() => navigation.navigate('PrivacyByDesign')}
      onSignOut={() => navigation.popToTop()}
      onDeleteAccount={() => navigation.navigate('DeleteAccount')}
    />
  );
}

function NotificationsPermissionRoute({ navigation }: RootScreenProps<'NotificationsPermission'>) {
  const enterApp = () =>
    navigation.reset({ index: 0, routes: [{ name: 'Tabs', params: { screen: 'Journal' } }] });
  return <NotificationsPermissionScreen onAllow={enterApp} onSkip={enterApp} onClose={enterApp} />;
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
      <Stack.Screen name="EntryEdit" component={EntryEditRoute} />
      <Stack.Screen name="EntryDetail" component={EntryDetailRoute} />
      <Stack.Screen name="GroupCreate" component={GroupCreateRoute} />
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
      <Stack.Screen name="GroupPulseEmpty" component={GroupPulseEmptyRoute} />
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
      <Stack.Screen name="Settings" component={SettingsRoute} />
      <Stack.Screen name="NotificationsPermission" component={NotificationsPermissionRoute} />
      <Stack.Screen name="PrivacyByDesign" component={PrivacyByDesignRoute} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountRoute} />
      <Stack.Screen
        name="MeetupProposal"
        component={MeetupProposalRoute}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}
