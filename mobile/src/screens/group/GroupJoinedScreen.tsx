import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react-native';
import { CTAButton, Screen, Text, useTheme } from '../../design-system';

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

        <View style={{ gap: t.spacing.lg, marginTop: t.spacing.xxl }}>
          <NextRow
            eyebrow={tr('group.joined.nextWriteEyebrow')}
            label={tr('group.joined.nextWriteLabel')}
            onPress={onWriteFirst}
          />
          <NextRow
            eyebrow={tr('group.joined.nextPulseEyebrow')}
            label={tr('group.joined.nextPulseLabel')}
            onPress={onEnterPulse}
          />
        </View>

        <View style={{ gap: t.spacing.md, marginTop: t.spacing.xxl }}>
          <Text variant="bodySerifTight" color="fgSubtle">
            {memberNames.join(' · ') + ' · ' + tr('group.joined.andYou')}
          </Text>
          <Text variant="bodySmall" color="fgFaint">
            {tr('group.joined.memberListBody')}
          </Text>
        </View>

        <View style={{ flex: 1 }} />

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

function NextRow({
  eyebrow,
  label,
  onPress,
}: {
  eyebrow: string;
  label: string;
  onPress?: () => void;
}) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: t.colors.bgRaised,
        borderRadius: t.radius.lg,
        borderWidth: t.brand.border.hairline,
        borderColor: t.colors.borderSoft,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.md,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <View style={{ flex: 1, gap: t.spacing.xs }}>
        <Text variant="metaLabel" color="fgFaint">
          {eyebrow}
        </Text>
        <Text variant="buttonLabelSocial" color="fg">
          {label}
        </Text>
      </View>
      <ChevronRight
        size={t.iconSize.base}
        strokeWidth={t.stroke.standard}
        color={t.colors.fgFaint}
      />
    </Pressable>
  );
}
