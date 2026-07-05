export interface ModifierKeys {
  readonly alt: boolean;
  readonly control: boolean;
  readonly meta: boolean;
  readonly shift: boolean;
}

export interface KeyboardEventModel {
  readonly key: string;
  readonly code: string;
  readonly modifiers: ModifierKeys;
}

export class KeyboardManager {
  private readonly pressed = new Set<string>();

  public keyDown(key: string): void {
    this.pressed.add(key);
  }

  public keyUp(key: string): void {
    this.pressed.delete(key);
  }

  public state(): readonly string[] {
    return [...this.pressed.values()];
  }
}

export class KeyMapping {
  private readonly mappings = new Map<string, string>();

  public map(key: string, action: string): void {
    this.mappings.set(key, action);
  }

  public resolve(key: string): string | undefined {
    return this.mappings.get(key);
  }
}
