import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * Tracks whether the software keyboard is open.
 * Uses `keyboardWillShow/Hide` on iOS for sync with the keyboard animation,
 * `keyboardDidShow/Hide` on Android where the `Will*` events are not emitted.
 */
export function useKeyboardOpen(): boolean {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvt, () => setOpen(true));
    const hideSub = Keyboard.addListener(hideEvt, () => setOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return open;
}
