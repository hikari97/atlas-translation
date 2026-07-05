import type { Brand } from '@atlas/atlas-types';

export type PluginIdentifier = Brand<string, 'PluginIdentifier'>;

export function createPluginIdentifier(value: string): PluginIdentifier {
  if (value.trim().length === 0) {
    throw new Error('Plugin identifier must not be empty.');
  }
  return value as PluginIdentifier;
}
