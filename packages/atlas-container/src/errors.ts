import type { ContainerDiagnostic, ContainerDiagnosticCode, ContainerToken } from './types';
import { tokenLabel } from './token';

export class ContainerError extends Error {
  public readonly code: ContainerDiagnosticCode;
  public readonly diagnostic: ContainerDiagnostic;

  public constructor(diagnostic: ContainerDiagnostic) {
    super(diagnostic.message);
    this.name = 'ContainerError';
    this.code = diagnostic.code;
    this.diagnostic = diagnostic;
  }
}

export class ContainerMissingBindingError extends ContainerError {
  public constructor(token: ContainerToken<unknown>, path: readonly string[] = []) {
    super({
      code: 'container.registration.missing',
      severity: 'error',
      token: tokenLabel(token),
      message: `No container registration found for "${tokenLabel(token)}".`,
      path,
    });
    this.name = 'ContainerMissingBindingError';
  }
}

export class ContainerDuplicateRegistrationError extends ContainerError {
  public constructor(token: ContainerToken<unknown>) {
    super({
      code: 'container.registration.duplicate',
      severity: 'error',
      token: tokenLabel(token),
      message: `Container registration for "${tokenLabel(token)}" already exists.`,
      path: [tokenLabel(token)],
    });
    this.name = 'ContainerDuplicateRegistrationError';
  }
}

export class ContainerAsyncProviderError extends ContainerError {
  public constructor(token: ContainerToken<unknown>, path: readonly string[]) {
    super({
      code: 'container.resolution.async-provider',
      severity: 'error',
      token: tokenLabel(token),
      message: `Service "${tokenLabel(token)}" uses an async provider and must be resolved with resolveAsync.`,
      path,
    });
    this.name = 'ContainerAsyncProviderError';
  }
}

export class ContainerCycleError extends ContainerError {
  public constructor(token: ContainerToken<unknown>, path: readonly string[]) {
    super({
      code: 'container.resolution.cycle',
      severity: 'error',
      token: tokenLabel(token),
      message: `Circular dependency detected while resolving "${tokenLabel(token)}".`,
      path,
    });
    this.name = 'ContainerCycleError';
  }
}
