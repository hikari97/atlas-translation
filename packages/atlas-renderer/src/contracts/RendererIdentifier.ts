import type { Brand } from '@atlas/atlas-types';

export type RendererIdentifier = Brand<string, 'RendererIdentifier'>;

export function createRendererIdentifier(value: string): RendererIdentifier {
  if (value.trim().length === 0) {
    throw new Error('Renderer identifier must not be empty.');
  }
  return value as RendererIdentifier;
}
