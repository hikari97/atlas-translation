import type { ControllerContext } from './context';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerMutableRegistry } from './shared';
import { InMemoryControllerRegistry } from './shared';

export interface ControllerCoreRegistry extends ControllerMutableRegistry<unknown> {}

export interface ControllerCore {
  readonly context: ControllerContext;
  readonly lifecycle: ControllerLifecycle;
  readonly metadata: ControllerMetadata;
  readonly registry: ControllerCoreRegistry;
}

export const createControllerCore = (
  context: ControllerContext,
  lifecycle: ControllerLifecycle,
  metadata: ControllerMetadata,
  registry: ControllerCoreRegistry = new InMemoryControllerRegistry<unknown>(),
): ControllerCore => ({ context, lifecycle, metadata, registry });
