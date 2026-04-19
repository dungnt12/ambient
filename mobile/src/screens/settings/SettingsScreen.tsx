import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react-native';
import {
  Avatar,
  CTAButton,
  ScreenHeader,
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

  const header = <ScreenHeader overline={tr('settings.eyebrow')} title={tr('settings.title')} />;

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

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.layout.sectionGap,
          gap: t.spacing.md,
        }}
      >
        <Text variant="overline" color="fgFaint">
          {tr('settings.sections.reminders')}
        </Text>
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
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.layout.sectionGap,
          gap: t.spacing.md,
        }}
      >
        <Text variant="overline" color="fgFaint">
          {tr('settings.sections.ambient')}
        </Text>
        <LinkRow
          label={tr('settings.ambient.quietNotes')}
          linkLabel={tr('settings.ambient.open')}
          onPress={onOpenAmbient}
        />
      </View>

      <View
        style={{
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.layout.sectionGap,
          gap: t.spacing.md,
        }}
      >
        <Text variant="overline" color="fgFaint">
          {tr('settings.sections.privacy')}
        </Text>
        <LinkRow
          label={tr('settings.privacy.whoCanRead')}
          linkLabel={tr('settings.privacy.view')}
          onPress={onOpenPrivacy}
        />
      </View>

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

function ProfileCard({ name, email, initial }: { name: string; email: string; initial: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        height: t.layout.profileCardHeight,
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: t.spacing.lg,
        gap: t.spacing.base,
      }}
    >
      <Avatar size={t.layout.avatarMd} variant="initial" initial={initial} />
      <View style={{ flexGrow: 1, flexShrink: 1, gap: t.spacing.xxs }}>
        <Text variant="headingFeature" color="fg">
          {name}
        </Text>
        <Text variant="bodySmall" color="fgFaint">
          {email}
        </Text>
      </View>
    </View>
  );
}

function RowCard({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View
      style={{
        height: t.layout.rowHeight,
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.base,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: t.spacing.lg,
        gap: t.spacing.md,
      }}
    >
      {children}
    </View>
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
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <RowCard>
        <Text variant="buttonLabelSocial" color="fg" style={{ flexShrink: 1 }}>
          {label}
        </Text>
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
      </RowCard>
    </Pressable>
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
  return (
    <RowCard>
      <Text variant="buttonLabelSocial" color="fg" style={{ flexShrink: 1 }}>
        {label}
      </Text>
      <Toggle value={value} onChange={onChange} />
    </RowCard>
  );
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
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <RowCard>
        <Text variant="buttonLabelSocial" color="fg" style={{ flexShrink: 1 }}>
          {label}
        </Text>
        <Text variant="buttonLabelSocial" style={{ color: t.colors.brand }}>
          {linkLabel}
        </Text>
      </RowCard>
    </Pressable>
  );
}
