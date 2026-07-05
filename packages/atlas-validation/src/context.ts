import type { ControllerContext } from '@atlas/atlas-controller';
import type { RequestContext } from '@atlas/atlas-request';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationMutableRegistry, ValidationRegistryEntry } from './shared';
import { InMemoryValidationRegistry } from './shared';

export interface ValidationContextState {
  readonly validationId: string | undefined;
  readonly inputPath: string | undefined;
  readonly attributes: readonly ValidationRegistryEntry<unknown>[];
}

export interface ValidationContextMetadata extends ValidationMetadata {}

export interface ValidationContextStorage extends ValidationMutableRegistry<unknown> {}

export interface ValidationContextServices {
  readonly storage: ValidationContextStorage;
  get<TValue = unknown>(key: string): TValue | undefined;
  set<TValue>(key: string, name: string, value: TValue): void;
}

export interface ValidationContext<TInput = unknown> {
  readonly input: TInput;
  readonly request: RequestContext | undefined;
  readonly controller: ControllerContext | undefined;
  readonly metadata: ValidationContextMetadata;
  readonly lifecycle: ValidationLifecycle;
  readonly state: ValidationContextState;
  readonly services: ValidationContextServices;
}

export const createValidationContextServices = (
  storage: ValidationContextStorage = new InMemoryValidationRegistry<unknown>(),
): ValidationContextServices => ({
  storage,
  get: <TValue = unknown>(key: string): TValue | undefined => storage.get(key)?.value as TValue | undefined,
  set: <TValue>(key: string, name: string, value: TValue): void => {
    storage.register({ id: key, name, value, attributes: {} });
  },
});

export const createValidationContext = <TInput>(
  input: TInput,
  request: RequestContext | undefined,
  controller: ControllerContext | undefined,
  metadata: ValidationContextMetadata,
  lifecycle: ValidationLifecycle,
  state: ValidationContextState,
  services: ValidationContextServices = createValidationContextServices(),
): ValidationContext<TInput> => ({ input, request, controller, metadata, lifecycle, state, services });
