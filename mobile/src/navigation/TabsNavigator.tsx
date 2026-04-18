import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { GardenScreen } from '../screens/garden';
import { JournalListScreen } from '../screens/journal';
import { GroupCreateJoinScreen } from '../screens/group';
import { SettingsScreen } from '../screens/settings';
import { SAMPLE_ENTRIES } from '../mocks/journal';
import { SAMPLE_GROUP, SAMPLE_PULSE_MEMBERS, SAMPLE_SAVED_INVITES } from '../mocks/group';
import { AppTabBar } from './AppTabBar';
import type { RootNav, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function GardenTab() {
  return <GardenScreen />;
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
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  return (
    <GroupCreateJoinScreen
      inviteUrl={SAMPLE_GROUP.inviteUrl}
      savedInvites={SAMPLE_SAVED_INVITES}
      onCreate={(groupName) => rootNav.navigate('GroupJoined', { groupName })}
      onOpenInvite={(invite) =>
        rootNav.navigate('InviteOffer', {
          inviterName: invite.inviterName,
          groupName: invite.groupName,
          memberCount: invite.memberCount,
          since: invite.since,
          memberInitials: invite.memberInitials,
        })
      }
      onSimulateIncomingLink={() =>
        rootNav.navigate('InviteOffer', {
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
      onOpenPrivacy={() => rootNav.navigate('PrivacyByDesign')}
      onSignOut={() => rootNav.reset({ index: 0, routes: [{ name: 'Onboarding' }] })}
      onDeleteAccount={() => rootNav.navigate('DeleteAccount')}
    />
  );
}

export function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, lazy: true }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tab.Screen name="Garden" component={GardenTab} />
      <Tab.Screen name="Journal" component={JournalTab} />
      <Tab.Screen name="Group" component={GroupTab} />
      <Tab.Screen name="You" component={YouTab} />
    </Tab.Navigator>
  );
}
