import type { RuntimeConfiguration } from './RuntimeConfiguration';
import type { RuntimeContextAttributes } from './RuntimeContextAttributes';
import type { RuntimeContextExtension } from './RuntimeContextExtension';
import { createRuntimeContextLifecycle, type RuntimeContextLifecycle } from './RuntimeContextLifecycle';
import type { RuntimeContextMetadata } from './RuntimeContextMetadata';
import type { RuntimeEnvironment } from './RuntimeEnvironment';
import type { RuntimeLifecycle } from './RuntimeLifecycle';
import type { RuntimeState } from './RuntimeState';

export interface RuntimeContext {
  readonly environment: RuntimeEnvironment;
  readonly configuration: RuntimeConfiguration;
  readonly lifecycle: RuntimeLifecycle;
  readonly state: RuntimeState;
  readonly metadata: RuntimeContextMetadata;
  readonly attributes: RuntimeContextAttributes;
  readonly extensions: readonly RuntimeContextExtension[];
  readonly contextLifecycle: RuntimeContextLifecycle;
}

export const createRuntimeContext = (
  environment: RuntimeEnvironment,
  configuration: RuntimeConfiguration,
  lifecycle: RuntimeLifecycle,
  state: RuntimeState,
  metadata: RuntimeContextMetadata,
  attributes: RuntimeContextAttributes,
  extensions: readonly RuntimeContextExtension[] = [],
  contextLifecycle: RuntimeContextLifecycle | undefined = undefined,
): RuntimeContext => ({
  environment,
  configuration,
  lifecycle,
  state,
  metadata,
  attributes,
  extensions,
  contextLifecycle: contextLifecycle ?? createRuntimeContextLifecycle(),
});
