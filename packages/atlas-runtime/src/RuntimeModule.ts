import type { RuntimeModuleDependency } from './RuntimeModuleDependency';
import type { RuntimeModuleExtension } from './RuntimeModuleExtension';
import { createRuntimeModuleLifecycle, type RuntimeModuleLifecycle } from './RuntimeModuleLifecycle';
import { createRuntimeModuleMetadata, type RuntimeModuleMetadata } from './RuntimeModuleMetadata';
import type { RuntimeService } from './RuntimeService';

export interface RuntimeModule {
  readonly id: string;
  readonly name: string;
  readonly dependencies: readonly RuntimeModuleDependency[];
  readonly metadata: RuntimeModuleMetadata;
  readonly services: readonly RuntimeService[];
  readonly extensions: readonly RuntimeModuleExtension[];
  readonly lifecycle: RuntimeModuleLifecycle;
}

export const createRuntimeModule = (
  id: string,
  name: string,
  dependencies: readonly RuntimeModuleDependency[] = [],
  metadata: RuntimeModuleMetadata | undefined = undefined,
  services: readonly RuntimeService[] = [],
  extensions: readonly RuntimeModuleExtension[] = [],
  lifecycle: RuntimeModuleLifecycle | undefined = undefined,
): RuntimeModule => ({
  id,
  name,
  dependencies,
  metadata: metadata ?? createRuntimeModuleMetadata('0.1.0'),
  services,
  extensions,
  lifecycle: lifecycle ?? createRuntimeModuleLifecycle(),
});
