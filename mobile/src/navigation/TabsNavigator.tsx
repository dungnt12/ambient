import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { GardenScreen } from '../screens/garden';
import { JournalListScreen } from '../screens/journal';
import { GroupPulseScreen } from '../screens/group';
import { YouScreen } from '../screens/you';
import { SAMPLE_ENTRIES } from '../mocks/journal';
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
  return <GroupPulseScreen />;
}

function YouTab() {
  return <YouScreen />;
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
