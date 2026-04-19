import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CTAButton, ListRow, Screen, Text, useTheme } from '../../design-system';

export type GroupJoinedScreenProps = {
  groupName: string;
  memberNames: string[];
  onWriteFirst?: () => void;
  onEnterPulse?: () => void;
};

export function GroupJoinedScreen({
  groupName,
  memberNames,
  onWriteFirst,
  onEnterPulse,
}: GroupJoinedScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']} background="bg">
      <View style={{ flex: 1, paddingHorizontal: t.layout.screenPaddingX }}>
        <Text variant="metaLabel" color="brand" style={{ marginTop: t.spacing.md }}>
          {tr('group.joined.eyebrow')}
        </Text>
        <Text variant="headingScreen" color="fg" style={{ marginTop: t.spacing.md }}>
          {tr('group.joined.title', { group: groupName })}
        </Text>
        <Text variant="bodyStandard" color="fgSubtle" style={{ marginTop: t.spacing.lg }}>
          {tr('group.joined.body')}
        </Text>

        <View style={{ marginTop: t.spacing.xxl }}>
          <ListRow
            eyebrow={tr('group.joined.nextWriteEyebrow')}
            label={tr('group.joined.nextWriteLabel')}
            onPress={onWriteFirst}
            trailing="chevron"
            tone="raised"
          />
        </View>

        <View style={{ gap: t.spacing.md, marginTop: t.spacing.xl }}>
          <Text variant="bodySerifTight" color="fgSubtle">
            {memberNames.join(' · ') + ' · ' + tr('group.joined.andYou')}
          </Text>
          <Text variant="bodySmall" color="fgFaint">
            {tr('group.joined.memberListBody')}
          </Text>
        </View>

        <View style={{ flex: 1, minHeight: t.spacing.xl }} />

        <CTAButton variant="primary" label={tr('group.joined.cta')} onPress={onEnterPulse} />
        <Text
          variant="bodySmall"
          color="fgFaint"
          align="center"
          style={{ marginTop: t.spacing.md }}
        >
          {tr('group.aiSignalNote')}
        </Text>
      </View>
    </Screen>
  );
}
