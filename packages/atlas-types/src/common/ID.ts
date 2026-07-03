import type { Brand } from './Brand';

/**
 * Branded string identifier scoped to a specific Atlas domain.
 */
export type ID<TScope extends string = string> = Brand<string, `ID:${TScope}`>;
