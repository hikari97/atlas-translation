import type { RuntimeRegistryEntry } from './RuntimeRegistryEntry';
import type { RuntimeRegistryMetadata } from './RuntimeRegistryMetadata';

export interface RuntimeRegistrySnapshot<TValue> {
  readonly metadata: RuntimeRegistryMetadata;
  readonly entries: readonly RuntimeRegistryEntry<TValue>[];
  readonly capturedAt: Date;
}
