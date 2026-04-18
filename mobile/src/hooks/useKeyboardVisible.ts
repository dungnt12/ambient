import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * Returns `true` while the software keyboard is visible.
 *
 * On iOS subscribes to `keyboardWillShow` / `keyboardWillHide` for animation
 * sync, falling back to `keyboardDidShow` / `keyboardDidHide` on Android where
 * the `Will*` events are not emitted.
 *
 * Prefer this over `useKeyboardOpen` in new code — same semantics, clearer name.
 */
export function useKeyboardVisible(): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvt, () => setVisible(true));
    const hideSub = Keyboard.addListener(hideEvt, () => setVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return visible;
}
