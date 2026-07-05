import type { RuntimeServiceCapability } from './RuntimeServiceCapability';
import type { RuntimeServiceExtension } from './RuntimeServiceExtension';
import { createRuntimeServiceLifecycle, type RuntimeServiceLifecycle } from './RuntimeServiceLifecycle';
import type { RuntimeServiceMetadata } from './RuntimeServiceMetadata';

export interface RuntimeService {
  readonly id: string;
  readonly name: string;
  readonly metadata: RuntimeServiceMetadata;
  readonly capabilities: readonly RuntimeServiceCapability[];
  readonly extensions: readonly RuntimeServiceExtension[];
  readonly lifecycle: RuntimeServiceLifecycle;
}

export const createRuntimeService = (
  id: string,
  name: string,
  metadata: RuntimeServiceMetadata,
  capabilities: readonly RuntimeServiceCapability[] = [],
  extensions: readonly RuntimeServiceExtension[] = [],
  lifecycle: RuntimeServiceLifecycle | undefined = undefined,
): RuntimeService => ({
  id,
  name,
  metadata,
  capabilities,
  extensions,
  lifecycle: lifecycle ?? createRuntimeServiceLifecycle(),
});
