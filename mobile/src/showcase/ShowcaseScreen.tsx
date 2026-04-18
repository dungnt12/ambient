import { View } from 'react-native';
import { Screen, Text, useTheme } from '../design-system';
import { TokensGallery } from './TokensGallery';
import { ComponentsGallery } from './ComponentsGallery';

export function ShowcaseScreen() {
  const t = useTheme();

  return (
    <Screen
      scroll
      edges={['top', 'bottom']}
      contentContainerStyle={{
        paddingHorizontal: t.layout.screenPaddingX,
        paddingTop: t.spacing.xxl,
        paddingBottom: t.spacing['5xl'],
        gap: t.spacing['4xl'],
      }}
    >
      <View style={{ gap: t.spacing.sm }}>
        <Text variant="overline" color="fgSubtle">
          Ambient DS
        </Text>
        <Text variant="displayHero">Showcase</Text>
        <Text variant="bodySerif" color="fgMuted">
          Design tokens and components built from Figma.
        </Text>
      </View>

      <GalleryHeader eyebrow="01" title="Tokens" />
      <TokensGallery />

      <GalleryHeader eyebrow="02" title="Components" />
      <ComponentsGallery />
    </Screen>
  );
}

function GalleryHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        gap: t.spacing.xs,
        paddingTop: t.spacing.xl,
        borderTopWidth: t.brand.border.hairline,
        borderTopColor: t.colors.borderSoft,
      }}
    >
      <Text variant="overline" color="fgFaint">
        {eyebrow}
      </Text>
      <Text variant="headingSection">{title}</Text>
    </View>
  );
}
