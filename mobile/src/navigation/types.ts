import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';

export type TabParamList = {
  Garden: undefined;
  Journal: undefined;
  Group: undefined;
  You: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  Email: undefined;
  Otp: { email: string };
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  JournalCompose: undefined;
  EntryDetail: { entryId: string };
  EntryEdit: { entryId: string };
  GroupCreate: undefined;
  InviteOffer: {
    inviterName: string;
    groupName: string;
    memberCount: number;
    since?: string;
    memberInitials: string[];
  };
  GroupAcceptInvite: { inviterName: string; groupName: string };
  GroupJoined: { groupName: string };
  GroupPulse: { groupName: string };
  GroupPulseEmpty: undefined;
  LeaveGroup: { groupName: string };
  QuietNotes: undefined;
  QuietNotesEmpty: undefined;
  WeeklyDigest: undefined;
  MeetupProposal: undefined;
  SupportSignalDetail: undefined;
  WeeklyNeedsWarmth: undefined;
  Settings: undefined;
  NotificationsPermission: undefined;
  PrivacyByDesign: undefined;
  DeleteAccount: undefined;
};

export type RootNav<T extends keyof RootStackParamList = keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootRoute<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, T>,
  RootNav<'Tabs'>
>;

export type TabBottomScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<
  TabParamList,
  T
>;
