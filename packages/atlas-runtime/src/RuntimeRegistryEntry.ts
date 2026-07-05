import type { RuntimeEventPayload } from './RuntimeEventPayload';
import type { RuntimeRegistryKey } from './RuntimeRegistryKey';

export interface RuntimeRegistryEntry<TValue> {
  readonly key: RuntimeRegistryKey;
  readonly value: TValue;
  readonly metadata: RuntimeEventPayload;
}
