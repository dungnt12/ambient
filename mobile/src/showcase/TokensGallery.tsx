import { View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Text, useTheme } from '../design-system';
import { palette } from '../design-system/tokens/colors';

type Section = { title: string; node: React.ReactNode };

export function TokensGallery() {
  const t = useTheme();
  const sections: Section[] = [
    { title: 'Colors', node: <ColorsBlock /> },
    { title: 'Typography', node: <TypographyBlock /> },
    { title: 'Spacing', node: <SpacingBlock /> },
    { title: 'Radius', node: <RadiusBlock /> },
    { title: 'Shadow', node: <ShadowBlock /> },
    { title: 'Opacity', node: <OpacityBlock /> },
    { title: 'Stroke', node: <StrokeBlock /> },
    { title: 'Icon size', node: <IconSizeBlock /> },
  ];

  return (
    <View style={{ gap: t.spacing.xxl }}>
      {sections.map((s) => (
        <View key={s.title} style={{ gap: t.spacing.base }}>
          <Text variant="headingSub">{s.title}</Text>
          {s.node}
        </View>
      ))}
    </View>
  );
}

function ColorsBlock() {
  const t = useTheme();
  const entries = flattenPalette();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm }}>
      {entries.map(({ name, value }) => (
        <View key={name} style={{ width: '47%', gap: t.spacing.xxs }}>
          <View
            style={{
              height: 56,
              borderRadius: t.radius.base,
              backgroundColor: value,
              borderWidth: t.brand.border.hairline,
              borderColor: t.colors.borderSoft,
            }}
          />
          <Text variant="overline" color="fgFaint">
            {name}
          </Text>
          <Text variant="bodySmall" color="fgMuted">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function flattenPalette() {
  const entries: { name: string; value: string }[] = [];
  (Object.entries(palette) as [string, Record<string, string>][]).forEach(([group, tokens]) => {
    Object.entries(tokens).forEach(([key, value]) => {
      entries.push({ name: `${group}.${key}`, value });
    });
  });
  return entries;
}

function TypographyBlock() {
  const t = useTheme();
  const variants = Object.keys(t.typography) as (keyof typeof t.typography)[];
  return (
    <View style={{ gap: t.spacing.base }}>
      {variants.map((v) => (
        <View key={v} style={{ gap: t.spacing.xxs }}>
          <Text variant="overline" color="fgFaint">
            {v}
          </Text>
          <Text variant={v}>The quick brown fox</Text>
        </View>
      ))}
    </View>
  );
}

function SpacingBlock() {
  const t = useTheme();
  const entries = Object.entries(t.spacing) as [string, number][];
  return (
    <View style={{ gap: t.spacing.sm }}>
      {entries.map(([name, value]) => (
        <View key={name} style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
          <Text variant="overline" color="fgFaint" style={{ width: 48 }}>
            {name}
          </Text>
          <View
            style={{ height: 12, width: value, backgroundColor: t.colors.brand, borderRadius: 2 }}
          />
          <Text variant="bodySmall" color="fgMuted">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function RadiusBlock() {
  const t = useTheme();
  const entries = Object.entries(t.radius) as [string, number][];
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.base }}>
      {entries.map(([name, value]) => (
        <View key={name} style={{ alignItems: 'center', gap: t.spacing.xxs, width: 80 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: value,
              backgroundColor: t.colors.bgMuted,
              borderWidth: t.brand.border.hairline,
              borderColor: t.colors.border,
            }}
          />
          <Text variant="overline" color="fgFaint">
            {name}
          </Text>
          <Text variant="bodySmall" color="fgMuted">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function ShadowBlock() {
  const t = useTheme();
  const entries = Object.entries(t.shadow);
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.lg }}>
      {entries.map(([name, value]) => (
        <View key={name} style={{ alignItems: 'center', gap: t.spacing.xs, width: 96 }}>
          <View
            style={[
              {
                width: 72,
                height: 72,
                borderRadius: t.radius.base,
                backgroundColor: t.colors.bgCard,
              },
              value,
            ]}
          />
          <Text variant="overline" color="fgFaint">
            {name}
          </Text>
        </View>
      ))}
    </View>
  );
}

function OpacityBlock() {
  const t = useTheme();
  const entries = Object.entries(t.opacity) as [string, number][];
  return (
    <View style={{ flexDirection: 'row', gap: t.spacing.base, flexWrap: 'wrap' }}>
      {entries.map(([name, value]) => (
        <View key={name} style={{ alignItems: 'center', gap: t.spacing.xxs, width: 64 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: t.radius.base,
              backgroundColor: t.colors.brand,
              opacity: value,
            }}
          />
          <Text variant="overline" color="fgFaint">
            {name}
          </Text>
          <Text variant="bodySmall" color="fgMuted">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function StrokeBlock() {
  const t = useTheme();
  const entries = Object.entries(t.stroke) as [string, number][];
  return (
    <View style={{ gap: t.spacing.sm }}>
      {entries.map(([name, value]) => (
        <View key={name} style={{ flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }}>
          <Text variant="overline" color="fgFaint" style={{ width: 72 }}>
            {name}
          </Text>
          <View
            style={{
              flexGrow: 1,
              height: value,
              backgroundColor: t.colors.fg,
              borderRadius: 2,
            }}
          />
          <Text variant="bodySmall" color="fgMuted">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

function IconSizeBlock() {
  const t = useTheme();
  const entries = Object.entries(t.iconSize) as [string, number][];
  return (
    <View style={{ flexDirection: 'row', gap: t.spacing.base, flexWrap: 'wrap' }}>
      {entries.map(([name, value]) => (
        <View key={name} style={{ alignItems: 'center', gap: t.spacing.xxs, width: 64 }}>
          <Heart color={t.colors.fg} size={value} strokeWidth={t.stroke.standard} />
          <Text variant="overline" color="fgFaint">
            {name}
          </Text>
          <Text variant="bodySmall" color="fgMuted">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}
