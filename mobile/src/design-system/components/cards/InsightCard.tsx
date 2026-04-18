import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';
import { CTAButton } from '../buttons';
import { AILabelRow, SuggestionDateChip } from '../badges';

export type InsightCardType = 'meetup' | 'support' | 'weekly';

export type InsightCardProps = {
  type: InsightCardType;
  title: string;
  body: string;
  suggestedDate?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  style?: ViewStyle;
};

export function InsightCard({
  type,
  title,
  body,
  suggestedDate,
  primaryLabel,
  onPrimary,
  style,
}: InsightCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          backgroundColor: theme.colors.bgCard,
          borderRadius: theme.radius.card,
          borderWidth: theme.brand.border.hairline,
          borderColor: theme.colors.borderSoft,
          padding: theme.spacing.lg,
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      {type === 'support' ? <AILabelRow label="AI GENTLE NOTE" /> : null}

      <Text variant="headingFeature" color="fg">
        {title}
      </Text>

      <Text variant="bodySerif" color="fgMuted">
        {body}
      </Text>

      {type === 'meetup' && suggestedDate ? <SuggestionDateChip label={suggestedDate} /> : null}

      {type === 'meetup' && primaryLabel ? (
        <CTAButton variant="primary" label={primaryLabel} onPress={onPrimary} />
      ) : null}

      {type === 'weekly' && primaryLabel ? (
        <CTAButton variant="secondary" label={primaryLabel} onPress={onPrimary} />
      ) : null}

      {type === 'support' && primaryLabel ? (
        <CTAButton variant="primary" label={primaryLabel} onPress={onPrimary} />
      ) : null}
    </View>
  );
}
