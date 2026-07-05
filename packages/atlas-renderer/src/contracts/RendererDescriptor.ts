import type { RendererBackend } from './RendererBackend';
import type { RendererIdentifier } from './RendererIdentifier';
import type { RendererMetadata } from './RendererMetadata';

export interface RendererDescriptor {
  readonly id: RendererIdentifier;
  readonly name: string;
  readonly backend: RendererBackend;
  readonly metadata: RendererMetadata;
  readonly tags?: readonly string[] | undefined;
}
