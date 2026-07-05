import type { AtlasContainer } from './container';
import { valueProvider } from './provider';
import type { ContainerRegisterOptions, ContainerToken } from './types';

export interface ContainerConfigValue<TValue> {
  readonly value: TValue;
  validate?(value: TValue): readonly string[];
}

export const registerConfigValue = <TValue>(
  container: AtlasContainer,
  token: ContainerToken<TValue>,
  config: ContainerConfigValue<TValue>,
  options: ContainerRegisterOptions = {},
): readonly string[] => {
  const diagnostics = config.validate?.(config.value) ?? [];
  if (diagnostics.length === 0) {
    container.register(token, valueProvider(config.value), { ...options, source: options.source ?? 'config' });
  }
  return diagnostics;
};
