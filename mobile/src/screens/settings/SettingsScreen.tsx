import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react-native';
import {
  Avatar,
  Card,
  CTAButton,
  ListRow,
  EditorialHeader,
  ScreenLayout,
  Text,
  TextButton,
  Toggle,
  useTheme,
} from '../../design-system';

export type SettingsScreenProps = {
  userName: string;
  userEmail: string;
  userInitial: string;
  reminderTime: string;
  timezone: string;
  aiSuggestionsEnabled: boolean;
  onToggleAiSuggestions: (next: boolean) => void;
  onOpenReminder: () => void;
  onOpenTimezone: () => void;
  onOpenNotifications: () => void;
  onOpenAmbient: () => void;
  onOpenPrivacy: () => void;
  onSignOut: () => void;
  onDeleteAccount: () => void;
};

export function SettingsScreen({
  userName,
  userEmail,
  userInitial,
  reminderTime,
  timezone,
  aiSuggestionsEnabled,
  onToggleAiSuggestions,
  onOpenReminder,
  onOpenTimezone,
  onOpenNotifications,
  onOpenAmbient,
  onOpenPrivacy,
  onSignOut,
  onDeleteAccount,
}: SettingsScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  const header = <EditorialHeader overline={tr('settings.eyebrow')} title={tr('settings.title')} />;

  const footer = (
    <View
      style={{
        paddingHorizontal: t.layout.screenPaddingX,
        paddingTop: t.spacing.lg,
        paddingBottom: t.spacing.xl,
      }}
    >
      <Text variant="bodySmall" color="fgSubtle" align="center">
        {tr('settings.footer')}
      </Text>
    </View>
  );

  return (
    <ScreenLayout header={header} footer={footer}>
      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.xl,
        }}
      >
        <ProfileCard name={userName} email={userEmail} initial={userInitial} />
      </View>

      <Section overline={tr('settings.sections.reminders')}>
        <ValueRow
          label={tr('settings.reminders.dailyWrite')}
          value={reminderTime}
          onPress={onOpenReminder}
        />
        <ValueRow
          label={tr('settings.reminders.timezone')}
          value={timezone}
          onPress={onOpenTimezone}
        />
        <ToggleRow
          label={tr('settings.reminders.aiSuggestions')}
          value={aiSuggestionsEnabled}
          onChange={onToggleAiSuggestions}
        />
        <LinkRow
          label={tr('settings.reminders.pushNotifications')}
          linkLabel={tr('settings.reminders.pushNotificationsAction')}
          onPress={onOpenNotifications}
        />
      </Section>

      <Section overline={tr('settings.sections.ambient')}>
        <LinkRow
          label={tr('settings.ambient.quietNotes')}
          linkLabel={tr('settings.ambient.open')}
          onPress={onOpenAmbient}
        />
      </Section>

      <Section overline={tr('settings.sections.privacy')}>
        <LinkRow
          label={tr('settings.privacy.whoCanRead')}
          linkLabel={tr('settings.privacy.view')}
          onPress={onOpenPrivacy}
        />
      </Section>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.layout.sectionGap,
          gap: t.spacing.md,
        }}
      >
        <CTAButton variant="dark" label={tr('settings.actions.signOut')} onPress={onSignOut} />
        <TextButton
          variant="destructive"
          label={tr('settings.actions.deleteAccount')}
          onPress={onDeleteAccount}
        />
      </View>
    </ScreenLayout>
  );
}

function Section({ overline, children }: { overline: string; children: ReactNode }) {
  const t = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: t.layout.screenPaddingX,
        paddingTop: t.layout.sectionGap,
        gap: t.rhythm.section,
      }}
    >
      <Text variant="overline" color="fgFaint">
        {overline}
      </Text>
      <View style={{ gap: t.rhythm.rowStack }}>{children}</View>
    </View>
  );
}

function ProfileCard({ name, email, initial }: { name: string; email: string; initial: string }) {
  const t = useTheme();
  return (
    <Card
      style={{
        height: t.layout.profileCardHeight,
        paddingVertical: 0,
        paddingHorizontal: t.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.base,
      }}
    >
      <Avatar size={t.layout.avatarLg} variant="initial" tone="brand" initial={initial} />
      <View style={{ flexGrow: 1, flexShrink: 1, gap: t.spacing.xxs }}>
        <Text variant="headingFeature" color="fg">
          {name}
        </Text>
        <Text variant="bodySmall" color="fgFaint">
          {email}
        </Text>
      </View>
    </Card>
  );
}

function ValueRow({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <ListRow
      label={label}
      onPress={onPress}
      trailing={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.xs }}>
          <Text variant="bodyStandard" color="fgFaint">
            {value}
          </Text>
          <ChevronRight
            size={t.iconSize.sm}
            strokeWidth={t.stroke.standard}
            color={t.colors.fgFaint}
          />
        </View>
      }
    />
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return <ListRow label={label} trailing={<Toggle value={value} onChange={onChange} />} />;
}

function LinkRow({
  label,
  linkLabel,
  onPress,
}: {
  label: string;
  linkLabel: string;
  onPress: () => void;
}) {
  const t = useTheme();
  return (
    <ListRow
      label={label}
      onPress={onPress}
      trailing={
        <Text variant="buttonLabelSocial" style={{ color: t.colors.brand }}>
          {linkLabel}
        </Text>
      }
    />
  );
}
