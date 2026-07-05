export interface ModifierKeys {
  readonly alt: boolean;
  readonly control: boolean;
  readonly meta: boolean;
  readonly shift: boolean;
}

export interface KeyboardInteraction {
  readonly key: string;
  readonly code: string;
  readonly modifiers: ModifierKeys;
  readonly composing: boolean;
}

export interface KeySequence {
  readonly keys: readonly string[];
}

export type ShortcutHandler = (interaction: KeyboardInteraction) => void;

export class ShortcutDispatcher {
  private readonly handlers = new Map<string, ShortcutHandler>();

  public register(sequence: KeySequence, handler: ShortcutHandler): void {
    this.handlers.set(sequence.keys.join('+'), handler);
  }

  public dispatch(sequence: KeySequence, interaction: KeyboardInteraction): boolean {
    const handler = this.handlers.get(sequence.keys.join('+'));
    if (handler === undefined) {
      return false;
    }
    handler(interaction);
    return true;
  }
}

export function createKeySequence(keys: readonly string[]): KeySequence {
  return { keys: keys.slice() };
}
