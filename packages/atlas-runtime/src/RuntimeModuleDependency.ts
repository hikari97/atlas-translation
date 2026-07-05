export type RuntimeModuleDependencyKind = 'required' | 'optional' | 'peer';

export interface RuntimeModuleDependency {
  readonly moduleId: string;
  readonly kind: RuntimeModuleDependencyKind;
  readonly version: string | undefined;
}

export const createRuntimeModuleDependency = (
  moduleId: string,
  kind: RuntimeModuleDependencyKind = 'required',
  version: string | undefined = undefined,
): RuntimeModuleDependency => ({ moduleId, kind, version });
