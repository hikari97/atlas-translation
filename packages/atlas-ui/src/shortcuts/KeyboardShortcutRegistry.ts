import type { KeyboardShortcut } from './KeyboardShortcut';

export class KeyboardShortcutRegistry {
  private readonly shortcuts = new Map<string, KeyboardShortcut>();

  public register(shortcut: KeyboardShortcut): void {
    this.shortcuts.set(shortcut.id, shortcut);
  }

  public get(id: string): KeyboardShortcut | undefined {
    return this.shortcuts.get(id);
  }

  public list(): readonly KeyboardShortcut[] {
    return [...this.shortcuts.values()];
  }
}
