import type { RuntimeCoreConfiguration } from './RuntimeCoreConfiguration';
import type { RuntimeCoreExtension } from './RuntimeCoreExtension';
import type { RuntimeCoreLifecycle } from './RuntimeCoreLifecycle';
import type { RuntimeCoreMetadata } from './RuntimeCoreMetadata';

export interface RuntimeCore {
  readonly configuration: RuntimeCoreConfiguration;
  readonly metadata: RuntimeCoreMetadata;
  readonly lifecycle: RuntimeCoreLifecycle;
  readonly extensions: readonly RuntimeCoreExtension[];
}

export const createRuntimeCore = (
  configuration: RuntimeCoreConfiguration,
  metadata: RuntimeCoreMetadata,
  lifecycle: RuntimeCoreLifecycle,
  extensions: readonly RuntimeCoreExtension[] = [],
): RuntimeCore => ({
  configuration,
  metadata,
  lifecycle,
  extensions,
});
