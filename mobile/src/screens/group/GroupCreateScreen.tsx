import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react-native';
import {
  Card,
  CTAButton,
  ScreenLayout,
  Text,
  TextInput,
  useCopyToClipboard,
  useTheme,
} from '../../design-system';

export type GroupCreateScreenProps = {
  inviteUrl: string;
  onCreate?: (groupName: string) => void;
  onCopyInvite?: () => void;
  /** Dev-only affordance to enter the receiving side of the invite deep-link. */
  onSimulateIncomingLink?: () => void;
};

export function GroupCreateScreen({
  inviteUrl,
  onCreate,
  onCopyInvite,
  onSimulateIncomingLink,
}: GroupCreateScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [name, setName] = useState(tr('group.create.defaultName'));

  const handleCreate = () => {
    onCreate?.(name.trim() || tr('group.create.defaultName'));
  };

  const header = (
    <View style={{ gap: t.spacing.xl, paddingTop: t.spacing.base }}>
      <Text variant="headingScreen" color="fg">
        {tr('group.create.title')}
      </Text>
      <Text variant="bodyLarge" color="fgSubtle">
        {tr('group.create.body')}
      </Text>
    </View>
  );

  const footer = (
    <CTAButton variant="primary" label={tr('group.create.cta')} onPress={handleCreate} />
  );

  return (
    <ScreenLayout
      padHorizontal
      avoidKeyboard
      header={header}
      footer={footer}
      bodyContentContainerStyle={{ paddingTop: t.spacing.xl }}
    >
      <View style={{ gap: t.spacing.xl }}>
        <TextInput
          label={tr('group.create.nameLabel')}
          value={name}
          onChangeText={setName}
          placeholder={tr('group.create.namePlaceholder')}
        />
        <InviteBlock url={inviteUrl} onCopy={onCopyInvite} />
        {onSimulateIncomingLink ? (
          <Pressable
            accessibilityRole="button"
            onPress={onSimulateIncomingLink}
            style={({ pressed }) => ({
              alignSelf: 'center',
              paddingVertical: t.spacing.md,
              paddingTop: t.spacing.md,
              opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
            })}
          >
            <Text variant="metaLabel" color="fgFaint">
              {tr('group.create.simulateInvite')}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </ScreenLayout>
  );
}

function InviteBlock({ url, onCopy }: { url: string; onCopy?: () => void }) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const { copied, copy } = useCopyToClipboard(url);

  const handlePress = () => {
    void copy();
    onCopy?.();
  };

  return (
    <Card
      onPress={handlePress}
      style={{
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.lg,
        gap: t.spacing.lg,
      }}
    >
      <Text variant="metaLabel" color="fgFaint">
        {tr('group.create.inviteLabel')}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
        <Text variant="headingSubLarge" color="fg" numberOfLines={1} style={{ flex: 1 }}>
          {url}
        </Text>
        {copied ? (
          <Check size={t.iconSize.base} strokeWidth={t.stroke.standard} color={t.colors.brand} />
        ) : null}
      </View>
      <Text variant="bodySmall" color={copied ? 'brand' : 'fgSubtle'}>
        {copied ? tr('group.create.inviteCopied') : tr('group.create.inviteHint')}
      </Text>
    </Card>
  );
}
