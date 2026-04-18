import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react-native';
import { Text, useTheme } from '../../../design-system';

export type GroupInsightsBodyProps = {
  supportTargetName: string;
  onProposeMeetup?: () => void;
  onLaterMeetup?: () => void;
  onOpenDigest?: () => void;
};

export function GroupInsightsBody({
  supportTargetName,
  onProposeMeetup,
  onLaterMeetup,
  onOpenDigest,
}: GroupInsightsBodyProps) {
  const { t: tr } = useTranslation();

  return (
    <>
      <MeetupCard
        eyebrow={tr('group.insights.meetupEyebrow')}
        body={tr('group.insights.meetupBody')}
        proposeLabel={tr('group.insights.meetupPropose')}
        laterLabel={tr('group.insights.meetupLater')}
        onPropose={onProposeMeetup}
        onLater={onLaterMeetup}
      />
      <SupportCard
        eyebrow={tr('group.insights.supportEyebrow')}
        body={tr('group.insights.supportBody', { name: supportTargetName })}
      />
      <DigestCard
        eyebrow={tr('group.insights.digestEyebrow')}
        label={tr('group.insights.digestLabel')}
        onPress={onOpenDigest}
      />
    </>
  );
}

function MeetupCard({
  eyebrow,
  body,
  proposeLabel,
  laterLabel,
  onPropose,
  onLater,
}: {
  eyebrow: string;
  body: string;
  proposeLabel: string;
  laterLabel: string;
  onPropose?: () => void;
  onLater?: () => void;
}) {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: t.colors.brand,
        borderRadius: t.radius.card,
        paddingHorizontal: t.spacing.xl,
        paddingVertical: t.spacing.lg,
        gap: t.spacing.md,
      }}
    >
      <Text variant="metaLabel" color="fgOnBrand">
        {eyebrow}
      </Text>
      <Text variant="bodySerifTight" color="fgOnBrand">
        {body}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: t.spacing.sm,
          justifyContent: 'flex-end',
          marginTop: t.spacing.xs,
        }}
      >
        <InlineButton label={proposeLabel} kind="solid" onPress={onPropose} />
        <InlineButton label={laterLabel} kind="ghost" onPress={onLater} />
      </View>
    </View>
  );
}

function InlineButton({
  label,
  kind,
  onPress,
}: {
  label: string;
  kind: 'solid' | 'ghost';
  onPress?: () => void;
}) {
  const t = useTheme();
  const solid = kind === 'solid';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        height: t.layout.inlineButtonHeight,
        paddingHorizontal: t.spacing.lg,
        borderRadius: t.radius.sm,
        backgroundColor: solid ? t.colors.bgRaised : 'transparent',
        borderWidth: solid ? 0 : t.brand.border.hairline,
        borderColor: solid ? 'transparent' : t.colors.fgOnBrand,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? t.opacity.pressed : t.opacity.full,
      })}
    >
      <Text variant="buttonLabelSocial" color={solid ? 'brand' : 'fgOnBrand'}>
        {label}
      </Text>
    </Pressable>
  );
}

function SupportCard({ eyebrow, body }: { eyebrow: string; body: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.border,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.base,
        gap: t.spacing.sm,
      }}
    >
      <Text variant="metaLabel" color="brandSoft">
        {eyebrow}
      </Text>
      <Text variant="bodySerifTight" color="fg">
        {body}
      </Text>
    </View>
  );
}

function DigestCard({
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
        borderColor: t.colors.borderSoft,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.card,
        paddingHorizontal: t.spacing.lg,
        paddingVertical: t.spacing.base,
        gap: t.spacing.xs,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      <Text variant="metaLabel" color="fgFaint">
        {eyebrow}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
        <Text variant="buttonLabelSocial" color="fg" style={{ flex: 1 }}>
          {label}
        </Text>
        <ChevronRight
          size={t.iconSize.base}
          strokeWidth={t.stroke.standard}
          color={t.colors.fgFaint}
        />
      </View>
    </Pressable>
  );
}
