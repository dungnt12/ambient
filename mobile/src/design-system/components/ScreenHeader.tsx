import { View } from 'react-native';
import { BackButton } from './buttons';
import { Heading } from './Heading';
import { Text } from './Text';
import { useTheme } from '../theme';

export type ScreenHeaderProps = {
  /**
   * `false` / undefined: no back row. `true`: render a filled BackButton with
   * no onPress (parent navigation handles it via accessibility). Object form:
   * render BackButton with the given onPress.
   */
  back?: boolean | { onPress?: () => void };
  /** Already-translated overline string (UPPERCASE convention). */
  overline?: string;
  /** Already-translated heading string. */
  title?: string;
  /** Already-translated supporting body string. */
  body?: string;
};

/**
 * Standard screen header: optional back button row + editorial stack of
 * overline / title / body. Matches spacing used across auth + settings
 * screens so migrations are a drop-in replacement.
 *
 * Caller is responsible for translation — this component never calls `t()`.
 */
export function ScreenHeader({ back, overline, title, body }: ScreenHeaderProps) {
  const t = useTheme();
  const backPress = typeof back === 'object' ? back.onPress : undefined;
  const showBack = back === true || typeof back === 'object';
  const hasBlock = overline !== undefined || title !== undefined || body !== undefined;

  return (
    <View>
      {showBack ? (
        <View style={{ paddingHorizontal: t.spacing.sm, paddingTop: t.spacing.sm }}>
          <BackButton variant="filled" onPress={backPress} />
        </View>
      ) : null}

      {hasBlock ? (
        <View
          style={{
            paddingHorizontal: t.layout.screenPaddingX,
            paddingTop: showBack ? t.spacing.base : t.spacing.sm,
          }}
        >
          {overline !== undefined ? (
            <Text variant="overline" color="fgFaint">
              {overline}
            </Text>
          ) : null}

          {title !== undefined || body !== undefined ? (
            <View style={{ marginTop: t.spacing.sm, gap: t.spacing.base }}>
              {title !== undefined ? <Heading variant="headingSection">{title}</Heading> : null}
              {body !== undefined ? (
                <Text variant="bodyLarge" color="fgMuted">
                  {body}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
