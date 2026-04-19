import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomSheetModal, CTAButton, Text, useTheme } from '../../design-system';

export type LeaveGroupSheetScreenProps = {
  groupName: string;
  onLeave?: () => void;
  onStay?: () => void;
  onDismiss?: () => void;
};

export function LeaveGroupSheetScreen({
  groupName,
  onLeave,
  onStay,
  onDismiss,
}: LeaveGroupSheetScreenProps) {
  const t = useTheme();
  const { t: tr } = useTranslation();
  const close = onDismiss ?? onStay ?? (() => {});

  return (
    <BottomSheetModal onDismiss={close}>
      {({ dismiss }) => (
        <>
          <View style={{ gap: t.spacing.md }}>
            <Text variant="metaLabel" color="fgFaint">
              {tr('group.leave.eyebrow', { group: groupName.toUpperCase() })}
            </Text>
            <Text variant="headingPulse" color="fg">
              {tr('group.leave.title')}
            </Text>
            <Text variant="bodyStandard" color="fgSubtle">
              {tr('group.leave.body')}
            </Text>
          </View>
          <CTAButton
            variant="primary"
            label={tr('group.leave.cta')}
            onPress={() => dismiss(onLeave)}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => dismiss(onStay ?? onDismiss)}
            style={{ paddingVertical: t.spacing.md }}
          >
            <Text variant="buttonLabelSocial" color="fgFaint" align="center">
              {tr('group.leave.stay')}
            </Text>
          </Pressable>
        </>
      )}
    </BottomSheetModal>
  );
}
