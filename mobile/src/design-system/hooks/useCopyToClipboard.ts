import { useCallback, useEffect, useRef, useState } from 'react';

const RESET_MS = 1800;

type ClipboardModule = {
  setStringAsync: (text: string) => Promise<boolean>;
};

function loadClipboard(): ClipboardModule | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- lazy load avoids crash if native module missing
    const mod = require('expo-clipboard') as ClipboardModule;
    return typeof mod.setStringAsync === 'function' ? mod : null;
  } catch {
    return null;
  }
}

export function useCopyToClipboard(value: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    const Clipboard = loadClipboard();
    if (Clipboard) {
      try {
        await Clipboard.setStringAsync(value);
      } catch {
        // no-op — UI still shows the optimistic "copied" state below
      }
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_MS);
  }, [value]);

  return { copied, copy };
}
