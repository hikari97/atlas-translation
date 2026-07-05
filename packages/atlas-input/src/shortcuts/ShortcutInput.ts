export interface Shortcut {
  readonly id: string;
  readonly keys: readonly string[];
  readonly action: string;
}

export interface ShortcutContext {
  readonly scope: string;
}

export class ShortcutRegistry {
  private readonly shortcuts = new Map<string, Shortcut>();

  public register(shortcut: Shortcut): void {
    this.shortcuts.set(shortcut.id, shortcut);
  }

  public list(): readonly Shortcut[] {
    return [...this.shortcuts.values()];
  }
}

export class ShortcutResolver {
  public resolve(shortcuts: readonly Shortcut[], keys: readonly string[]): Shortcut | undefined {
    const signature = keys.join('+');
    return shortcuts.find((shortcut) => shortcut.keys.join('+') === signature);
  }
}

export class ShortcutManager {
  public constructor(
    private readonly registry = new ShortcutRegistry(),
    private readonly resolver = new ShortcutResolver()
  ) {}

  public register(shortcut: Shortcut): void {
    this.registry.register(shortcut);
  }

  public resolve(keys: readonly string[]): Shortcut | undefined {
    return this.resolver.resolve(this.registry.list(), keys);
  }
}

export function detectShortcutConflicts(shortcuts: readonly Shortcut[]): readonly string[] {
  const seen = new Set<string>();
  const conflicts: string[] = [];
  for (const shortcut of shortcuts) {
    const signature = shortcut.keys.join('+');
    if (seen.has(signature)) {
      conflicts.push(signature);
    }
    seen.add(signature);
  }
  return conflicts;
}
