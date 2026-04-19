import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { GardenScreen } from '../screens/garden';
import { JournalListScreen } from '../screens/journal';
import { GroupCreateScreen, GroupPulseScreen } from '../screens/group';
import { SettingsScreen } from '../screens/settings';
import { SAMPLE_ENTRIES } from '../mocks/journal';
import {
  SAMPLE_GROUPS,
  SAMPLE_GROUP_INSIGHTS,
  SAMPLE_PULSE_MEMBERS,
  getAllInsights,
  getAllPulseMembers,
  getTotalMemberCount,
} from '../mocks/group';
import { SAMPLE_RECEIVED_NOTES } from '../mocks/ambient';
import {
  BottomBarInsetProvider,
  TabBarVisibilityProvider,
  useTabBarScrollY,
} from '../design-system';
import { AppTabBar } from './AppTabBar';
import { useTabBarInset } from './useTabBarInset';
import type { RootNav, TabParamList } from './types';
import { useActiveGroup } from '../state/activeGroup';
import { useGroupInsights } from '../state/groupInsights';
import { addMeetupToCalendar } from '../lib/calendar';

const Tab = createBottomTabNavigator<TabParamList>();

// Wraps every tab scene with BottomBarInsetProvider so any DS container
// inside (Screen, ScreenLayout, or a component calling useBottomBarInset)
// reserves space for the floating tab bar without prop drilling.
function TabScreenLayout({ children }: { children: ReactNode }) {
  const inset = useTabBarInset();
  return <BottomBarInsetProvider value={inset}>{children}</BottomBarInsetProvider>;
}

function GardenTab() {
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  return (
    <GardenScreen
      onDayPress={({ year, monthIndex, day }) => {
        rootNav.navigate('Day', { year, monthIndex, day });
      }}
    />
  );
}

function JournalTab() {
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  return (
    <JournalListScreen
      entries={SAMPLE_ENTRIES}
      onEntryPress={(entry) => rootNav.navigate('EntryDetail', { entryId: entry.id })}
    />
  );
}

function GroupTab() {
  const { activeGroupId } = useActiveGroup();
  if (SAMPLE_GROUPS.length === 0) {
    return <GroupCreateTabScene />;
  }
  if (activeGroupId === null) {
    return <GroupPulseAllScene />;
  }
  const active = SAMPLE_GROUPS.find((g) => g.id === activeGroupId);
  if (!active) {
    return <GroupPulseAllScene />;
  }
  return <GroupPulseTabScene activeGroupId={active.id} />;
}

function GroupPulseAllScene() {
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  const { t: tr } = useTranslation();
  const { proposals } = useGroupInsights();
  const members = getAllPulseMembers();
  const insights = getAllInsights().map((e) => ({ insight: e.insight, groupName: e.groupName }));
  return (
    <GroupPulseScreen
      key="all"
      groupName={tr('group.allGroups')}
      memberCount={getTotalMemberCount()}
      members={members}
      insights={insights}
      aggregatedGroupCount={SAMPLE_GROUPS.length}
      hasMultipleGroups={SAMPLE_GROUPS.length > 1}
      onOpenSwitcher={() => rootNav.navigate('GroupSwitcher')}
      onInviteMore={() => rootNav.navigate('GroupCreate')}
      onWriteFirst={() => rootNav.navigate('JournalCompose')}
      onDismissInsight={() => {}}
      onProposeMeetup={(proposalId) => rootNav.navigate('MeetupProposal', { proposalId })}
      onAddMeetupToCalendar={(proposalId) => {
        const proposal = proposals[proposalId];
        if (proposal) void addMeetupToCalendar(proposal);
      }}
      onOpenDigest={() => rootNav.navigate('WeeklyDigest')}
      onCheckInOnMember={() => rootNav.navigate('SupportSignalDetail')}
      receivedNotesCount={SAMPLE_RECEIVED_NOTES.length}
      receivedNotesSenderInitials={SAMPLE_RECEIVED_NOTES.map((n) => n.senderInitial)}
      onOpenReceivedNotes={() => rootNav.navigate('ReceivedNotes')}
    />
  );
}

function GroupPulseTabScene({ activeGroupId }: { activeGroupId: string }) {
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  const { proposals } = useGroupInsights();
  const active = SAMPLE_GROUPS.find((g) => g.id === activeGroupId) ?? SAMPLE_GROUPS[0];
  const members = SAMPLE_PULSE_MEMBERS[active.id] ?? [];
  const insight = SAMPLE_GROUP_INSIGHTS[active.id] ?? null;
  return (
    <GroupPulseScreen
      key={active.id}
      groupName={active.name}
      memberCount={active.memberCount}
      since={active.since}
      members={members}
      insights={insight ? [{ insight }] : []}
      hasMultipleGroups={SAMPLE_GROUPS.length > 1}
      onOpenSwitcher={() => rootNav.navigate('GroupSwitcher')}
      onInviteMore={() => rootNav.navigate('GroupCreate')}
      onWriteFirst={() => rootNav.navigate('JournalCompose')}
      onDismissInsight={() => {}}
      onProposeMeetup={(proposalId) => rootNav.navigate('MeetupProposal', { proposalId })}
      onAddMeetupToCalendar={(proposalId) => {
        const proposal = proposals[proposalId];
        if (proposal) void addMeetupToCalendar(proposal);
      }}
      onOpenDigest={() => rootNav.navigate('WeeklyDigest')}
      onCheckInOnMember={() => rootNav.navigate('SupportSignalDetail')}
      onLeaveGroup={() => rootNav.navigate('LeaveGroup', { groupName: active.name })}
      receivedNotesCount={SAMPLE_RECEIVED_NOTES.length}
      receivedNotesSenderInitials={SAMPLE_RECEIVED_NOTES.map((n) => n.senderInitial)}
      onOpenReceivedNotes={() => rootNav.navigate('ReceivedNotes')}
    />
  );
}

function GroupCreateTabScene() {
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  const primary = SAMPLE_GROUPS[0];
  const primaryMembers = primary ? (SAMPLE_PULSE_MEMBERS[primary.id] ?? []) : [];
  return (
    <GroupCreateScreen
      inviteUrl={primary?.inviteUrl ?? ''}
      onCreate={(groupName) => rootNav.navigate('GroupJoined', { groupName })}
      onCopyInvite={() => {}}
      onSimulateIncomingLink={() => {
        if (!primary) return;
        rootNav.navigate('InviteOffer', {
          inviterName: primary.inviterName,
          groupName: primary.name,
          memberCount: primary.memberCount,
          since: primary.since,
          memberInitials: primaryMembers.map((m) => m.initial),
        });
      }}
    />
  );
}

function YouTab() {
  const rootNav = useNavigation<RootNav<'Tabs'>>();
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
      onOpenNotifications={() => rootNav.navigate('NotificationsPermission', { returnTo: 'back' })}
      onOpenAmbient={() => rootNav.navigate('QuietNotes')}
      onOpenPrivacy={() => rootNav.navigate('PrivacyByDesign')}
      onOpenSubscription={() => rootNav.navigate('Subscription')}
      onSignOut={() => rootNav.reset({ index: 0, routes: [{ name: 'Onboarding' }] })}
      onDeleteAccount={() => rootNav.navigate('DeleteAccount')}
    />
  );
}

export function TabsNavigator() {
  const scrollY = useTabBarScrollY();
  return (
    <TabBarVisibilityProvider scrollY={scrollY}>
      <Tab.Navigator
        screenOptions={{ headerShown: false, lazy: true }}
        tabBar={(props) => <AppTabBar {...props} />}
        screenLayout={({ children }) => <TabScreenLayout>{children}</TabScreenLayout>}
        screenListeners={{
          // Tab switch restores the bar so the newly focused scene never
          // inherits a hidden state from the previous scroll position.
          focus: () => scrollY.setValue(0),
        }}
      >
        <Tab.Screen name="Garden" component={GardenTab} />
        <Tab.Screen name="Journal" component={JournalTab} />
        <Tab.Screen name="Group" component={GroupTab} />
        <Tab.Screen name="You" component={YouTab} />
      </Tab.Navigator>
    </TabBarVisibilityProvider>
  );
}
