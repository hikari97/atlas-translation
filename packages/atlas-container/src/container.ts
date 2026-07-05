import { ContainerAsyncProviderError, ContainerMissingBindingError } from './errors';
import { ResolutionGraph } from './graph';
import { asyncFactoryProvider, classProvider, factoryProvider, providerDependencies, valueProvider } from './provider';
import { ContainerRegistry, createRegistrationMetadata } from './registry';
import { createContainerToken, tokenLabel } from './token';
import type {
  ContainerProvider,
  ContainerRegisterOptions,
  ContainerRegistration,
  ContainerResolveOptions,
  ContainerSnapshot,
  ContainerToken,
} from './types';

interface RegistrationOwner {
  readonly container: AtlasContainer;
  readonly registration: ContainerRegistration<unknown>;
}

export class AtlasContainer {
  private readonly registry: ContainerRegistry;
  private readonly singletonInstances = new Map<symbol, unknown>();
  private readonly scopedInstances = new Map<symbol, unknown>();
  private readonly parent: AtlasContainer | undefined;
  public readonly scopeId: string;

  public constructor(parent: AtlasContainer | undefined = undefined, scopeId: string = 'scope') {
    this.parent = parent;
    this.registry = new ContainerRegistry();
    this.scopeId = scopeId;
  }

  public register<TService>(
    token: ContainerToken<TService>,
    provider: ContainerProvider<TService>,
    options: ContainerRegisterOptions = {},
  ): this {
    this.registry.register(token, {
      provider,
      lifetime: options.lifetime ?? 'transient',
      metadata: createRegistrationMetadata(options),
    }, options);
    return this;
  }

  public registerValue<TService>(token: ContainerToken<TService>, value: TService, options: ContainerRegisterOptions = {}): this {
    return this.register(token, valueProvider(value), options);
  }

  public registerClass<TService>(
    token: ContainerToken<TService>,
    useClass: new (...dependencies: readonly unknown[]) => TService,
    dependencies: readonly ContainerToken<unknown>[] = [],
    options: ContainerRegisterOptions = {},
  ): this {
    return this.register(token, classProvider(useClass, dependencies), options);
  }

  public registerFactory<TService>(
    token: ContainerToken<TService>,
    factory: (...dependencies: readonly unknown[]) => TService,
    dependencies: readonly ContainerToken<unknown>[] = [],
    options: ContainerRegisterOptions = {},
  ): this {
    return this.register(token, factoryProvider(factory, dependencies), options);
  }

  public registerAsyncFactory<TService>(
    token: ContainerToken<TService>,
    factory: (...dependencies: readonly unknown[]) => Promise<TService>,
    dependencies: readonly ContainerToken<unknown>[] = [],
    options: ContainerRegisterOptions = {},
  ): this {
    return this.register(token, asyncFactoryProvider(factory, dependencies), options);
  }

  public has(token: ContainerToken<unknown>): boolean {
    return this.findRegistration(token) !== undefined;
  }

  public resolve<TService>(token: ContainerToken<TService>, options: ContainerResolveOptions = {}): TService {
    const result = this.resolveInternal(token, new ResolutionGraph(), options);
    return result as TService;
  }

  public async resolveAsync<TService>(token: ContainerToken<TService>, options: ContainerResolveOptions = {}): Promise<TService> {
    const result = await this.resolveAsyncInternal(token, new ResolutionGraph(), options);
    return result as TService;
  }

  public createScope(scopeId: string = `${this.scopeId}:child`): AtlasContainer {
    return new AtlasContainer(this, scopeId);
  }

  public snapshot(): ContainerSnapshot {
    const registrations = this.visibleRegistrations().map((registration) => ({
      token: tokenLabel(registration.token),
      provider: registration.provider.kind,
      lifetime: registration.lifetime,
      source: registration.metadata.source,
      tags: registration.metadata.tags,
    }));
    return { scopeId: this.scopeId, registrations, diagnostics: [] };
  }

  public registrations(): readonly ContainerRegistration<unknown>[] {
    return this.visibleRegistrations();
  }

  private resolveInternal(token: ContainerToken<unknown>, graph: ResolutionGraph, options: ContainerResolveOptions): unknown {
    const owner = this.findRegistration(token);
    if (owner === undefined) {
      if (options.optional === true) {
        return undefined;
      }
      throw new ContainerMissingBindingError(token, graph.labels());
    }
    if (owner.registration.provider.kind === 'asyncFactory') {
      throw new ContainerAsyncProviderError(token, graph.labels());
    }
    return this.resolveWithLifetime(owner, graph.enter(token), false);
  }

  private async resolveAsyncInternal(
    token: ContainerToken<unknown>,
    graph: ResolutionGraph,
    options: ContainerResolveOptions,
  ): Promise<unknown> {
    const owner = this.findRegistration(token);
    if (owner === undefined) {
      if (options.optional === true) {
        return undefined;
      }
      throw new ContainerMissingBindingError(token, graph.labels());
    }
    return this.resolveWithLifetime(owner, graph.enter(token), true);
  }

  private resolveWithLifetime(owner: RegistrationOwner, graph: ResolutionGraph, asyncMode: boolean): unknown | Promise<unknown> {
    const key = owner.registration.token.id;
    if (owner.registration.lifetime === 'singleton' && owner.container.singletonInstances.has(key)) {
      return owner.container.singletonInstances.get(key);
    }
    if (owner.registration.lifetime === 'scoped' && this.scopedInstances.has(key)) {
      return this.scopedInstances.get(key);
    }
    const created = asyncMode ? this.createInstanceAsync(owner.registration, graph) : this.createInstance(owner.registration, graph);
    if (created instanceof Promise) {
      return created.then((value) => this.cacheResolved(owner, value));
    }
    return this.cacheResolved(owner, created);
  }

  private cacheResolved(owner: RegistrationOwner, value: unknown): unknown {
    const key = owner.registration.token.id;
    if (owner.registration.lifetime === 'singleton') {
      owner.container.singletonInstances.set(key, value);
    }
    if (owner.registration.lifetime === 'scoped') {
      this.scopedInstances.set(key, value);
    }
    return value;
  }

  private createInstance(registration: ContainerRegistration<unknown>, graph: ResolutionGraph): unknown {
    const dependencies = providerDependencies(registration.provider).map((dependency) => this.resolveInternal(dependency, graph, {}));
    if (registration.provider.kind === 'value') {
      return registration.provider.value;
    }
    if (registration.provider.kind === 'class') {
      return new registration.provider.useClass(...dependencies);
    }
    if (registration.provider.kind === 'factory') {
      return registration.provider.factory(...dependencies);
    }
    throw new ContainerAsyncProviderError(registration.token, graph.labels());
  }

  private async createInstanceAsync(registration: ContainerRegistration<unknown>, graph: ResolutionGraph): Promise<unknown> {
    const dependencies = await Promise.all(
      providerDependencies(registration.provider).map((dependency) => this.resolveAsyncInternal(dependency, graph, {})),
    );
    if (registration.provider.kind === 'value') {
      return registration.provider.value;
    }
    if (registration.provider.kind === 'class') {
      return new registration.provider.useClass(...dependencies);
    }
    if (registration.provider.kind === 'factory') {
      return registration.provider.factory(...dependencies);
    }
    return registration.provider.factory(...dependencies);
  }

  private findRegistration(token: ContainerToken<unknown>): RegistrationOwner | undefined {
    const local = this.registry.get(token);
    if (local !== undefined) {
      return { container: this, registration: local };
    }
    return this.parent?.findRegistration(token);
  }

  private visibleRegistrations(): readonly ContainerRegistration<unknown>[] {
    const parentRegistrations = this.parent?.visibleRegistrations() ?? [];
    const local = this.registry.list();
    const localIds = new Set(local.map((registration) => registration.token.id));
    return [...parentRegistrations.filter((registration) => !localIds.has(registration.token.id)), ...local];
  }
}

export const createContainer = (): AtlasContainer => new AtlasContainer(undefined, 'root');
export const createToken = createContainerToken;
