import { useState } from 'react';
import { View, type ViewStyle } from 'react-native';
import { Settings } from 'lucide-react-native';
import {
  ActionCard,
  AILabelRow,
  AppHeader,
  Avatar,
  BackButton,
  BottomSheet,
  CaptchaRow,
  Checkbox,
  CTAButton,
  DayHeader,
  DigestRow,
  EmptyState,
  EntryListRow,
  GardenCell,
  GardenLegend,
  GardenMonthHeader,
  HeroIllustration,
  InsightCard,
  InviteLinkRow,
  JournalTextarea,
  MoodGlyph,
  MoodPicker,
  OtpRow,
  PrivacyBadge,
  PromptCard,
  PulseFooterRow,
  PulseMemberCard,
  Screen as _Screen,
  ScreenShell,
  SettingsRow,
  SuggestionDateChip,
  TabBar,
  Text,
  TextInput,
  Toggle,
  useTheme,
  type GardenIllustrationName,
  type MoodLevel,
} from '../design-system';

void _Screen;

export function ComponentsGallery() {
  const t = useTheme();
  return (
    <View style={{ gap: t.spacing['3xl'] }}>
      <Group title="Buttons">
        <ButtonsDemo />
      </Group>
      <Group title="Inputs">
        <InputsDemo />
      </Group>
      <Group title="Identity">
        <IdentityDemo />
      </Group>
      <Group title="Badges & Labels">
        <BadgesDemo />
      </Group>
      <Group title="Containers">
        <ContainersDemo />
      </Group>
      <Group title="Cards">
        <CardsDemo />
      </Group>
      <Group title="Patterns">
        <PatternsDemo />
      </Group>
      <Group title="Garden">
        <GardenDemo />
      </Group>
      <Group title="Illustrations">
        <IllustrationsDemo />
      </Group>
    </View>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ gap: t.spacing.base }}>
      <Text variant="headingSub">{title}</Text>
      <View style={{ gap: t.spacing.base }}>{children}</View>
    </View>
  );
}

function Row({
  label,
  children,
  style,
}: {
  label?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const t = useTheme();
  return (
    <View style={{ gap: t.spacing.xs }}>
      {label ? (
        <Text variant="overline" color="fgFaint">
          {label}
        </Text>
      ) : null}
      <View style={[{ gap: t.spacing.sm }, style]}>{children}</View>
    </View>
  );
}

function ButtonsDemo() {
  const t = useTheme();
  return (
    <>
      <Row label="CTAButton variants">
        <CTAButton label="Primary" variant="primary" />
        <CTAButton label="Secondary" variant="secondary" />
        <CTAButton label="Tertiary" variant="tertiary" />
        <CTAButton label="Destructive" variant="destructive" />
        <CTAButton label="Continue with Apple" variant="social-apple" />
        <CTAButton label="Continue with email" variant="social-email" />
        <CTAButton label="Dark" variant="dark" />
      </Row>
      <Row label="States">
        <CTAButton label="Loading" variant="primary" loading />
        <CTAButton label="Disabled" variant="primary" disabled />
      </Row>
      <Row label="BackButton" style={{ flexDirection: 'row', gap: t.spacing.base }}>
        <BackButton variant="ghost" />
        <BackButton variant="filled" />
      </Row>
    </>
  );
}

function InputsDemo() {
  const t = useTheme();
  const [value, setValue] = useState('ban@vidu.com');
  const [otp] = useState('1234');
  const [captcha, setCaptcha] = useState(false);
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <TextInput label="YOUR EMAIL" value={value} onChangeText={setValue} />
      <TextInput
        label="YOUR EMAIL"
        value="bad-value"
        onChangeText={() => undefined}
        state="error"
        errorText="Not a valid email"
      />
      <Row label="OTP (6 cells)">
        <OtpRow value={otp} activeIndex={otp.length} />
      </Row>
      <Row label="Checkbox + Toggle" style={{ flexDirection: 'row', gap: t.spacing.lg }}>
        <Checkbox value={captcha} onChange={setCaptcha} />
        <Toggle value={toggle} onChange={setToggle} />
      </Row>
      <CaptchaRow
        label="I'm not a robot"
        metaLabel="Protected"
        checked={captcha}
        onToggle={setCaptcha}
      />
    </>
  );
}

function IdentityDemo() {
  const t = useTheme();
  const [mood, setMood] = useState<MoodLevel | null>(3);
  return (
    <>
      <Row
        label="Avatar sizes"
        style={{ flexDirection: 'row', gap: t.spacing.base, alignItems: 'flex-end' }}
      >
        <Avatar size={24} variant="initial" initial="A" />
        <Avatar size={32} variant="initial" initial="A" />
        <Avatar size={48} variant="initial" initial="A" />
        <Avatar size={24} variant="empty" />
        <Avatar size={32} variant="empty" />
        <Avatar size={48} variant="empty" />
      </Row>
      <Row label="MoodGlyph" style={{ flexDirection: 'row', gap: t.spacing.base }}>
        {[1, 2, 3, 4, 5].map((m) => (
          <MoodGlyph key={m} mood={m as MoodLevel} selected />
        ))}
      </Row>
      <Row label="MoodPicker">
        <MoodPicker value={mood} onChange={setMood} />
      </Row>
    </>
  );
}

function BadgesDemo() {
  const t = useTheme();
  return (
    <>
      <Row
        label="PrivacyBadge"
        style={{ flexDirection: 'row', gap: t.spacing.sm, flexWrap: 'wrap' }}
      >
        <PrivacyBadge kind="lock" label="ONLY YOU" />
        <PrivacyBadge kind="sparkles" label="AI GENERATED" />
        <PrivacyBadge kind="eye" label="VISIBLE TO GROUP" />
      </Row>
      <SuggestionDateChip label="Sun Apr 21 · 3pm" />
      <AILabelRow label="AI summary · updated 2 hours ago" />
      <DayHeader label="TODAY · APR 17" />
    </>
  );
}

function ContainersDemo() {
  const t = useTheme();
  return (
    <>
      <Row label="AppHeader">
        <AppHeader title="Plain" variant="plain" />
        <AppHeader title="With back" variant="with-back" />
        <AppHeader title="With action" variant="with-action" rightIcon={Settings} />
      </Row>
      <Row label="TabBar">
        <TabBar active="journal" onChange={() => undefined} />
      </Row>
      <Row label="BottomSheet">
        <BottomSheet>
          <Text variant="headingFeature">Sheet title</Text>
          <Text variant="bodyStandard" color="fgMuted">
            Bottom sheet content goes here.
          </Text>
          <CTAButton label="Confirm" variant="primary" />
        </BottomSheet>
      </Row>
      <Row label="ScreenShell (device frame preview)">
        <ScreenShell>
          <AppHeader title="Today" variant="with-action" rightIcon={Settings} />
          <View style={{ padding: t.spacing.xl, gap: t.spacing.base }}>
            <Text variant="headingSub">Hello, Hien.</Text>
            <Text variant="bodySerif" color="fgMuted">
              A quiet place to return to.
            </Text>
          </View>
        </ScreenShell>
      </Row>
    </>
  );
}

function CardsDemo() {
  return (
    <>
      <ActionCard
        title="Write today"
        body="A few lines about what stayed with you."
        action={<CTAButton label="Open journal" variant="primary" />}
      />
      <PromptCard
        eyebrow="TODAY'S PROMPT"
        prompt="What was small but good today?"
        meta="Generated for Hien · 7am"
      />
      <InsightCard
        type="meetup"
        title="Everyone seems free this weekend."
        body="The group's pulse points to a good moment to gather."
        suggestedDate="Sun Apr 21 · 3pm"
        primaryLabel="Suggest a time"
        onPrimary={() => undefined}
      />
      <InsightCard
        type="support"
        title="Linh seems a bit low."
        body="Three quiet days in a row. A gentle check-in could help."
      />
      <InsightCard
        type="weekly"
        title="A steady week."
        body="Warm pulse across the group — keep the rhythm."
        primaryLabel="View digest"
        onPrimary={() => undefined}
      />
      <PulseMemberCard name="Hien" signal="Feeling steady and present." mood={3} initial="H" />
      <PulseMemberCard name="Linh" signal="A lot on her mind today." mood={2} initial="L" />
      <PulseMemberCard name="Phong" signal="Energetic and curious." mood={4} initial="P" />
      <PulseMemberCard name="Mai" signal="Bright and warm." mood={5} initial="M" />
      <PulseMemberCard name="Khoa" signal="No entry yet." mood="empty" initial="K" />
      <EmptyState
        title="No notes yet"
        description="Your quiet notes from AI will appear here when they're ready."
      />
    </>
  );
}

function PatternsDemo() {
  const [entry, setEntry] = useState('');
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <JournalTextarea value={entry} onChangeText={setEntry} date="TODAY · APR 17" />
      <EntryListRow
        date="APR 17"
        preview="Had coffee with Phong. Felt light afterwards."
        onPress={() => undefined}
      />
      <DigestRow label="Group wrote 12 entries this week" meta="+3 vs last" />
      <SettingsRow kind="nav" title="Notifications" onPress={() => undefined} />
      <SettingsRow kind="toggle" title="Daily reminder" value={toggle} onChange={setToggle} />
      <SettingsRow kind="destructive" title="Delete account" onPress={() => undefined} />
      <InviteLinkRow url="https://ambient.app/g/sunday-group" onCopy={() => undefined} />
      <PulseFooterRow updatedAt="Updated 2 hours ago" attribution="from Phong" />
    </>
  );
}

function GardenDemo() {
  const t = useTheme();
  const illustrations: GardenIllustrationName[] = [
    'seedling',
    'leaf',
    'sun',
    'cloud',
    'moon',
    'petal',
    'stone',
    'drop',
    'spark',
    'crescent',
    'fern',
    'acorn',
  ];
  return (
    <>
      <GardenMonthHeader month="April 2026" count={17} />
      <Row
        label="GardenCell states"
        style={{ flexDirection: 'row', gap: t.spacing.sm, flexWrap: 'wrap' }}
      >
        <GardenCell state="empty" />
        <GardenCell state="today" />
        {illustrations.map((name) => (
          <GardenCell key={name} state="written" illustration={name} />
        ))}
      </Row>
      <GardenLegend />
    </>
  );
}

function IllustrationsDemo() {
  const t = useTheme();
  const illustrations: GardenIllustrationName[] = [
    'seedling',
    'leaf',
    'sun',
    'cloud',
    'moon',
    'petal',
    'stone',
    'drop',
    'spark',
    'crescent',
    'fern',
    'acorn',
  ];
  return (
    <>
      <Row label="Hero" style={{ flexDirection: 'row', gap: t.spacing.base, flexWrap: 'wrap' }}>
        <HeroIllustration step="welcome" size={160} />
        <HeroIllustration step="signal" size={160} />
        <HeroIllustration step="hints" size={160} />
      </Row>
      <Row label="Garden" style={{ flexDirection: 'row', gap: t.spacing.base, flexWrap: 'wrap' }}>
        {illustrations.map((name) => (
          <View key={name} style={{ alignItems: 'center', gap: t.spacing.xxs, width: 80 }}>
            <GardenCell state="written" illustration={name} />
            <Text variant="overline" color="fgFaint">
              {name}
            </Text>
          </View>
        ))}
      </Row>
    </>
  );
}
