import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { ReactNode } from 'react';
import { GardenScreen } from '../screens/garden';
import { JournalListScreen } from '../screens/journal';
import { GroupCreateJoinScreen } from '../screens/group';
import { SettingsScreen } from '../screens/settings';
import { SAMPLE_ENTRIES } from '../mocks/journal';
import { SAMPLE_GROUP, SAMPLE_PULSE_MEMBERS, SAMPLE_SAVED_INVITES } from '../mocks/group';
import {
  BottomBarInsetProvider,
  TabBarVisibilityProvider,
  useTabBarScrollY,
} from '../design-system';
import { AppTabBar } from './AppTabBar';
import { useTabBarInset } from './useTabBarInset';
import type { RootNav, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

// Wraps every tab scene with BottomBarInsetProvider so any DS container
// inside (Screen, ScreenLayout, or a component calling useBottomBarInset)
// reserves space for the floating tab bar without prop drilling.
function TabScreenLayout({ children }: { children: ReactNode }) {
  const inset = useTabBarInset();
  return <BottomBarInsetProvider value={inset}>{children}</BottomBarInsetProvider>;
}

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
