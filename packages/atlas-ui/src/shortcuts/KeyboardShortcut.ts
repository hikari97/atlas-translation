export interface KeyboardShortcut {
  readonly id: string;
  readonly label: string;
  readonly keys: readonly string[];
}

export function formatKeyboardShortcut(shortcut: KeyboardShortcut): string {
  return shortcut.keys.join('+');
}
