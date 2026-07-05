import type { Command } from '../command';

/**
 * Ordered child command entry.
 */
export interface CompositeCommandEntry {
  readonly order: number;
  readonly command: Command;
}
