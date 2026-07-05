import { useKeyboardShortcut } from '../src/hooks/useKeyboardShortcut';

// Type checks
const _testHook = () => {
  useKeyboardShortcut('k', () => {}, { metaKey: true });
};

console.log("Shortcut hook types validated");
