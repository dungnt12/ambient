import { Pressable, View, type ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Text } from '../Text';
import { BackButton } from '../buttons';
import { useTheme } from '../../theme';

export type AppHeaderVariant = 'plain' | 'with-back' | 'with-action';

export type AppHeaderProps = {
  title: string;
  variant?: AppHeaderVariant;
  onBack?: () => void;
  rightIcon?: LucideIcon;
  onRightAction?: () => void;
  style?: ViewStyle;
};

const SLOT_SIZE = 40;

/**
 * AppHeader — 56px-tall row header used at the top of app screens.
 * Variants: plain | with-back | with-action. Uses BackButton for back
 * variant; right action is a tappable Lucide icon slot.
 */
export function AppHeader({
  title,
  variant = 'plain',
  onBack,
  rightIcon: RightIcon,
  onRightAction,
  style,
}: AppHeaderProps) {
  const t = useTheme();
  const showBack = variant === 'with-back';
  const showAction = variant === 'with-action';

  return (
    <View
      style={[
        {
          height: t.layout.headerHeight,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: t.spacing.screen,
        },
        style,
      ]}
    >
      <View style={{ width: SLOT_SIZE, height: SLOT_SIZE, justifyContent: 'center' }}>
        {showBack ? (
          <BackButton
            onPress={onBack}
            style={{
              width: SLOT_SIZE,
              height: SLOT_SIZE,
              marginLeft: -((56 - SLOT_SIZE) / 2),
            }}
          />
        ) : null}
      </View>

      <Text
        variant="headingSub"
        color="fg"
        numberOfLines={1}
        style={{ flex: 1, textAlign: showBack || showAction ? 'left' : 'center' }}
      >
        {title}
      </Text>

      <View
        style={{
          width: SLOT_SIZE,
          height: SLOT_SIZE,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {showAction && RightIcon ? (
          <Pressable
            accessibilityRole="button"
            onPress={onRightAction}
            hitSlop={8}
            style={({ pressed }) => ({
              width: SLOT_SIZE,
              height: SLOT_SIZE,
              borderRadius: SLOT_SIZE / 2,
              backgroundColor: t.colors.bgCard,
              borderWidth: t.brand.border.hairline,
              borderColor: t.colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? t.opacity.pressedGhost : t.opacity.full,
            })}
          >
            <RightIcon color={t.colors.fg} size={t.iconSize.lg} strokeWidth={t.stroke.standard} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
