import type { Brand } from '@atlas/atlas-types';

export type UIComponentIdentifier = Brand<string, 'UIComponentIdentifier'>;

export function createUIComponentIdentifier(value: string): UIComponentIdentifier {
  if (value.trim().length === 0) {
    throw new Error('UI component identifier must not be empty.');
  }
  return value as UIComponentIdentifier;
}
