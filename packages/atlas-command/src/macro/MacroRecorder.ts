import type { Command } from '../command';
import type { CompositeCommandEntry } from '../composite';

/**
 * Records commands for later macro creation.
 */
export class MacroRecorder {
  private readonly entries: CompositeCommandEntry[] = [];

  public record(command: Command): void {
    this.entries.push({
      order: this.entries.length,
      command
    });
  }

  public replay(): readonly CompositeCommandEntry[] {
    return [...this.entries];
  }

  public clear(): void {
    this.entries.length = 0;
  }
}
