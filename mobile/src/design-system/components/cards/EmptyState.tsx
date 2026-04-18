import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../../theme';

export type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  style?: ViewStyle;
};

const ICON_SLOT_SIZE = 120;
const ICON_SLOT_RADIUS = 60;

export function EmptyState({ title, description, action, icon, children, style }: EmptyStateProps) {
  const theme = useTheme();
  const illustration = icon ?? children;

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: theme.layout.maxContentWidth,
          paddingHorizontal: theme.spacing.base,
          paddingVertical: theme.spacing.xxl,
          alignItems: 'center',
          gap: theme.spacing.lg,
        },
        style,
      ]}
    >
      {illustration ? (
        <View
          style={{
            width: ICON_SLOT_SIZE,
            height: ICON_SLOT_SIZE,
            borderRadius: ICON_SLOT_RADIUS,
            backgroundColor: theme.colors.bgMuted,
            borderWidth: theme.brand.border.hairline,
            borderColor: theme.colors.borderSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {illustration}
        </View>
      ) : null}

      <Text variant="headingSub" color="fg" align="center">
        {title}
      </Text>
      <Text variant="bodySerif" color="fgMuted" align="center">
        {description}
      </Text>
      {action ? <View style={{ alignSelf: 'stretch' }}>{action}</View> : null}
    </View>
  );
}
