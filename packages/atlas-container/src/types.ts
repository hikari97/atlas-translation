export type ContainerLifetime = 'singleton' | 'transient' | 'scoped';
export type ContainerProviderKind = 'value' | 'class' | 'factory' | 'asyncFactory';
export type ContainerDiagnosticSeverity = 'info' | 'warning' | 'error';
export type ContainerDiagnosticCode =
  | 'container.registration.duplicate'
  | 'container.registration.missing'
  | 'container.resolution.async-provider'
  | 'container.resolution.cycle'
  | 'container.resolution.failed';

export interface ContainerToken<TService> {
  readonly id: symbol;
  readonly name: string;
  readonly description: string | undefined;
  readonly type?: TService;
}

export type ContainerDependencyList = readonly ContainerToken<unknown>[];

export interface ContainerValueProvider<TService> {
  readonly kind: 'value';
  readonly value: TService;
}

export interface ContainerClassProvider<TService> {
  readonly kind: 'class';
  readonly useClass: new (...dependencies: readonly unknown[]) => TService;
  readonly dependencies: ContainerDependencyList;
}

export interface ContainerFactoryProvider<TService> {
  readonly kind: 'factory';
  readonly factory: (...dependencies: readonly unknown[]) => TService;
  readonly dependencies: ContainerDependencyList;
}

export interface ContainerAsyncFactoryProvider<TService> {
  readonly kind: 'asyncFactory';
  readonly factory: (...dependencies: readonly unknown[]) => Promise<TService>;
  readonly dependencies: ContainerDependencyList;
}

export type ContainerProvider<TService> =
  | ContainerValueProvider<TService>
  | ContainerClassProvider<TService>
  | ContainerFactoryProvider<TService>
  | ContainerAsyncFactoryProvider<TService>;

export interface ContainerRegistration<TService> {
  readonly token: ContainerToken<TService>;
  readonly provider: ContainerProvider<TService>;
  readonly lifetime: ContainerLifetime;
  readonly metadata: ContainerRegistrationMetadata;
}

export interface ContainerRegistrationMetadata {
  readonly label: string | undefined;
  readonly source: string | undefined;
  readonly tags: readonly string[];
}

export interface ContainerRegisterOptions {
  readonly lifetime?: ContainerLifetime;
  readonly label?: string;
  readonly source?: string;
  readonly tags?: readonly string[];
  readonly override?: boolean;
}

export interface ContainerResolveOptions {
  readonly optional?: boolean;
}

export interface ContainerDiagnostic {
  readonly code: ContainerDiagnosticCode;
  readonly severity: ContainerDiagnosticSeverity;
  readonly token: string | undefined;
  readonly message: string;
  readonly path: readonly string[];
}

export interface ContainerDebugRegistration {
  readonly token: string;
  readonly provider: ContainerProviderKind;
  readonly lifetime: ContainerLifetime;
  readonly source: string | undefined;
  readonly tags: readonly string[];
}

export interface ContainerSnapshot {
  readonly scopeId: string;
  readonly registrations: readonly ContainerDebugRegistration[];
  readonly diagnostics: readonly ContainerDiagnostic[];
}
