import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Heading, Screen, Text, useTheme } from '../../design-system';

export function GroupPulseScreen() {
  const t = useTheme();
  const { t: tr } = useTranslation();

  return (
    <Screen edges={['top']} background="bg">
      <View
        style={{
          flex: 1,
          paddingHorizontal: t.layout.screenPaddingX,
          paddingTop: t.spacing.lg,
          gap: t.spacing.sm,
        }}
      >
        <Heading variant="headingSection">{tr('group.placeholder.title')}</Heading>
        <Text variant="bodyLarge" color="fgSubtle">
          {tr('group.placeholder.body')}
        </Text>
      </View>
    </Screen>
  );
}
