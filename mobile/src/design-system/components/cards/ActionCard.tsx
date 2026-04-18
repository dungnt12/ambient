import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type ActionCardProps = {
  title: string;
  body?: string;
  action?: ReactNode;
  style?: ViewStyle;
};

export function ActionCard({ title, body, action, style }: ActionCardProps) {
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
          padding: theme.spacing.base,
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      <Text variant="headingFeature" color="fg">
        {title}
      </Text>
      {body ? (
        <Text variant="bodyStandard" color="fgMuted">
          {body}
        </Text>
      ) : null}
      {action ? <View style={{ marginTop: theme.spacing.xs }}>{action}</View> : null}
    </View>
  );
}
