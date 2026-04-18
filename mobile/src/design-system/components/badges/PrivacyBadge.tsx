import { View } from 'react-native';
import { Lock, Sparkles, Eye } from 'lucide-react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type PrivacyBadgeKind = 'lock' | 'sparkles' | 'eye';

export type PrivacyBadgeProps = {
  kind: PrivacyBadgeKind;
  label: string;
};

const ICONS = {
  lock: Lock,
  sparkles: Sparkles,
  eye: Eye,
} as const;

export function PrivacyBadge({ kind, label }: PrivacyBadgeProps) {
  const theme = useTheme();
  const Icon = ICONS[kind];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xxs,
        backgroundColor: theme.colors.bgCard,
        borderColor: theme.colors.borderSoft,
        borderWidth: theme.brand.border.hairline,
        borderRadius: theme.radius.pill,
      }}
    >
      <Icon
        size={theme.iconSize.xs}
        strokeWidth={theme.stroke.standard}
        color={theme.colors.fgMuted}
      />
      <Text variant="overline" color="fgMuted">
        {label}
      </Text>
    </View>
  );
}
