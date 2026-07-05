export type RuntimeServiceKind = 'core' | 'infrastructure' | 'application' | 'external' | 'custom';

export interface RuntimeServiceMetadata {
  readonly kind: RuntimeServiceKind;
  readonly version: string;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeServiceMetadata = (
  kind: RuntimeServiceKind,
  version: string,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeServiceMetadata => ({ kind, version, attributes });
