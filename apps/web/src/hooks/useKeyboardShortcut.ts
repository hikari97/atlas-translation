import { useEffect } from 'react';

interface ShortcutOptions {
  readonly ctrlKey?: boolean;
  readonly metaKey?: boolean;
  readonly altKey?: boolean;
  readonly shiftKey?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: ShortcutOptions = {}
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchKey = event.key.toLowerCase() === key.toLowerCase();
      const matchCtrl = options.ctrlKey ? event.ctrlKey : true;
      const matchMeta = options.metaKey ? event.metaKey : true;
      const matchAlt = options.altKey ? event.altKey : true;
      const matchShift = options.shiftKey ? event.shiftKey : true;

      // Special handling if options are explicitly set to false
      const ctrlActive = options.ctrlKey !== undefined ? event.ctrlKey === options.ctrlKey : true;
      const metaActive = options.metaKey !== undefined ? event.metaKey === options.metaKey : true;
      const altActive = options.altKey !== undefined ? event.altKey === options.altKey : true;
      const shiftActive = options.shiftKey !== undefined ? event.shiftKey === options.shiftKey : true;

      if (matchKey && ctrlActive && metaActive && altActive && shiftActive) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback, options]);
}
