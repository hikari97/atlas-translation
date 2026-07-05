import type { DocumentDiff } from './DocumentDiff';

/**
 * Result returned by diff generation.
 */
export interface DiffResult {
  readonly success: boolean;
  readonly diff: DocumentDiff | null;
  readonly errors: readonly string[];
}
