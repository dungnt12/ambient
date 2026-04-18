import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar, BottomSheetModal, CTAButton, Heading, Text, useTheme } from '../../design-system';
import type { MeetupProposal } from '../../mocks/ambient';

export type MeetupProposalSheetScreenProps = {
  proposal: MeetupProposal;
  onPropose?: () => void;
  onDismiss?: () => void;
};

export function MeetupProposalSheetScreen({
  proposal,
  onPropose,
  onDismiss,
}: MeetupProposalSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const close = onDismiss ?? (() => {});

  return (
    <BottomSheetModal onDismiss={close}>
      {({ dismiss }) => (
        <>
          <View style={{ gap: t.spacing.md }}>
            <Text variant="overline" color="fgFaint">
              {tr('ambient.meetupProposal.eyebrow')}
            </Text>
            <Heading variant="headingSubLarge">{proposal.headline}</Heading>
            <Text variant="bodyStandard" color="fgSubtle">
              {proposal.body}
            </Text>
          </View>

          <View style={{ gap: t.spacing.sm }}>
            <Text variant="overline" color="fgFaint">
              {tr('ambient.meetupProposal.mayJoin')}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm }}>
              {proposal.candidates.map((c) => (
                <CandidatePill key={c.id} initial={c.initial} name={c.name} />
              ))}
            </View>
          </View>

          <CTAButton
            variant="primary"
            label={tr('ambient.meetupProposal.proposeCta')}
            onPress={() => dismiss(onPropose)}
          />
          <Text variant="bodySmall" color="fgFaint" align="center">
            {tr('ambient.meetupProposal.footer')}
          </Text>
        </>
      )}
    </BottomSheetModal>
  );
}

function CandidatePill({ initial, name }: { initial: string; name: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.sm,
        paddingLeft: t.spacing.xs,
        paddingRight: t.spacing.md,
        paddingVertical: t.spacing.xs,
        backgroundColor: t.colors.bgRaised,
        borderColor: t.colors.border,
        borderWidth: t.brand.border.hairline,
        borderRadius: t.radius.pill,
      }}
    >
      <Avatar size={24} variant="empty" initial={initial} />
      <Text variant="bodySmall" color="fg">
        {name}
      </Text>
    </View>
  );
}
