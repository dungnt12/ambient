import { Pressable, View } from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from './Text';
import { useTheme } from '../theme';
import type { TypographyVariant } from '../tokens/typography';

export type SheetHeaderProps = {
  /** Already-translated heading string. */
  title: string;
  /** Optional body string under title, `bodySmall` fgFaint. */
  subtitle?: string;
  /** When provided, renders an X close button on the right. */
  onDismiss?: () => void;
  /** Variant for the title. Default `'headingPulse'` — matches current sheets. */
  titleVariant?: TypographyVariant;
  accessibilityDismissLabel?: string;
};

/**
 * Bottom-sheet header primitive. Title + optional subtitle on the left, optional
 * close X on the right. Uses `rhythm.header.gap` between title/subtitle so the
 * rhythm stays consistent with screen headers.
 */
export function SheetHeader({
  title,
  subtitle,
  onDismiss,
  titleVariant,
  accessibilityDismissLabel,
}: SheetHeaderProps) {
  const t = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ gap: t.rhythm.header.gap, flex: 1 }}>
        <Text variant={titleVariant ?? 'headingPulse'} color="fg">
          {title}
        </Text>
        {subtitle !== undefined ? (
          <Text variant="bodySmall" color="fgFaint">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={accessibilityDismissLabel}
          onPress={onDismiss}
          hitSlop={t.spacing.sm}
          style={({ pressed }) => ({
            padding: t.spacing.xs,
            opacity: pressed ? t.opacity.pressedSubtle : t.opacity.full,
          })}
        >
          <X size={t.iconSize.md} strokeWidth={t.stroke.standard} color={t.colors.fgFaint} />
        </Pressable>
      ) : null}
    </View>
  );
}
