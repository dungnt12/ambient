import { useRef, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar, BottomSheetModal, CTAButton, Heading, Text, useTheme } from '../../design-system';
import type { MeetupProposal } from '../../mocks/ambient';

export type MeetupProposalSheetScreenProps = {
  proposal: MeetupProposal;
  onPropose?: () => void;
  onDismiss?: () => void;
};

const AUTO_DISMISS_MS = 1500;

export function MeetupProposalSheetScreen({
  proposal,
  onPropose,
  onDismiss,
}: MeetupProposalSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const [sent, setSent] = useState(proposal.status === 'proposed');
  const dismissedRef = useRef(false);
  const close = onDismiss ?? (() => {});

  return (
    <BottomSheetModal onDismiss={close}>
      {({ dismiss }) => {
        const handlePropose = () => {
          if (sent) return;
          setSent(true);
          onPropose?.();
          setTimeout(() => {
            if (dismissedRef.current) return;
            dismissedRef.current = true;
            dismiss();
          }, AUTO_DISMISS_MS);
        };

        return (
          <>
            <View style={{ gap: t.spacing.md }}>
              <Text variant="overline" color="fgFaint">
                {tr(sent ? 'ambient.meetupProposal.sentEyebrow' : 'ambient.meetupProposal.eyebrow')}
              </Text>
              <Heading variant="headingSubLarge">{proposal.headline}</Heading>
              <Text variant="bodyStandard" color="fgSubtle">
                {proposal.body}
              </Text>
            </View>

            <View style={{ gap: t.spacing.sm }}>
              <Text variant="overline" color="fgFaint">
                {tr('ambient.meetupProposal.freeEnergy')}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm }}>
                {proposal.candidates.map((c) => (
                  <CandidatePill key={c.id} initial={c.initial} name={c.name} />
                ))}
              </View>
            </View>

            <CTAButton
              variant="primary"
              label={tr(
                sent ? 'ambient.meetupProposal.sentCta' : 'ambient.meetupProposal.proposeCta',
              )}
              disabled={sent}
              onPress={handlePropose}
            />
            <Text variant="bodySmall" color="fgFaint" align="center">
              {tr('ambient.meetupProposal.footer')}
            </Text>
          </>
        );
      }}
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
