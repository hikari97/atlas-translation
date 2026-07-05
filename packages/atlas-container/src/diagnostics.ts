import type { AtlasContainer } from './container';
import type { ContainerDiagnostic } from './types';

export const inspectContainer = (container: AtlasContainer) => container.snapshot();

export const formatContainerDiagnostic = (diagnostic: ContainerDiagnostic): string => {
  const token = diagnostic.token ?? '<unknown>';
  const path = diagnostic.path.length === 0 ? '<root>' : diagnostic.path.join(' -> ');
  return `${diagnostic.severity.toUpperCase()} ${diagnostic.code} ${token} at ${path}: ${diagnostic.message}`;
};
