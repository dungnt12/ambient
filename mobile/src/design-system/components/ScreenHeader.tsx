import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../theme';
import type { TypographyVariant } from '../tokens/typography';

export type ScreenHeaderProps = {
  /** Title text (string → default variant) or fully custom node. */
  title: string | ReactNode;
  /** Rendered as `bodySmall` fgFaint below the title row. */
  subtitle?: string;
  /** Rendered as `overline` fgFaint above the title row. */
  eyebrow?: string;
  /** Variant for the title when `title` is a string. Default `'headingScreen'`. */
  titleVariant?: TypographyVariant;
  /** Slot on the right side of the title row (chevron, badge, icon...). */
  titleAccessory?: ReactNode;
  /** When set, title + accessory become Pressable that opens this action. */
  onPressTitle?: () => void;
  accessibilityLabel?: string;
};

/**
 * Pinned screen header primitive. Bakes `rhythm.header.padTop` and
 * `rhythm.header.gap` so screens don't re-specify top padding and inter-row
 * spacing. Zero i18n — caller passes already-translated strings.
 */
export function ScreenHeader({
  title,
  subtitle,
  eyebrow,
  titleVariant,
  titleAccessory,
  onPressTitle,
  accessibilityLabel,
}: ScreenHeaderProps) {
  const t = useTheme();

  const titleNode =
    typeof title === 'string' ? (
      <Text variant={titleVariant ?? 'headingScreen'} color="fg">
        {title}
      </Text>
    ) : (
      title
    );

  const titleRowChildren = (
    <>
      {titleNode}
      {titleAccessory ?? null}
    </>
  );

  const titleRow = onPressTitle ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPressTitle}
      hitSlop={t.spacing.sm}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.sm,
        opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
      })}
    >
      {titleRowChildren}
    </Pressable>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing.sm,
      }}
    >
      {titleRowChildren}
    </View>
  );

  return (
    <View style={{ paddingTop: t.rhythm.header.padTop, gap: t.rhythm.header.gap }}>
      {eyebrow !== undefined ? (
        <Text variant="overline" color="fgFaint">
          {eyebrow}
        </Text>
      ) : null}
      {titleRow}
      {subtitle !== undefined ? (
        <Text variant="bodySmall" color="fgFaint">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
