import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingWelcomeScreen } from '../screens/onboarding';
import { EmailScreen, OtpScreen, SignInScreen } from '../screens/auth';
import { EntryDetailScreen, EntryEditScreen, JournalComposeScreen } from '../screens/journal';
import { SAMPLE_ENTRY_BODY } from '../mocks/journal';
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
      onVerify={() => navigation.navigate('Tabs', { screen: 'Journal' })}
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
    </Stack.Navigator>
  );
}
