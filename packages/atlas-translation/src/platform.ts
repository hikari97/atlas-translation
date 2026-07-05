import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

export enum PlatformComponentState {
  Registered = 'registered',
  Active = 'active',
  Suspended = 'suspended',
  Retired = 'retired'
}

export interface PlatformComponent {
  readonly id: string;
  readonly kind: string;
  readonly state: PlatformComponentState;
  readonly metadata: JsonObject;
}

export class PlatformRegistry<TComponent extends PlatformComponent = PlatformComponent> {
  private readonly components = new Map<string, TComponent>();

  public register(component: TComponent): void {
    this.components.set(component.id, component);
  }

  public get(id: string): TComponent | null {
    return this.components.get(id) ?? null;
  }

  public list(): readonly TComponent[] {
    return [...this.components.values()];
  }
}

export interface ProviderContract {
  readonly id: string;
  readonly capability: string;
  readonly metadata: JsonObject;
}

export interface ManagedSession {
  readonly id: string;
  readonly ownerId: string;
  readonly metadata: JsonObject;
  readonly createdAt: Timestamp;
}

export interface RuntimeSnapshot {
  readonly id: ID<'atlas-runtime-snapshot'>;
  readonly components: readonly PlatformComponent[];
  readonly capturedAt: Timestamp;
}

export class AtlasKernel {
  public constructor(private readonly registry = new PlatformRegistry()) {}

  public register(component: PlatformComponent): void {
    this.registry.register(component);
  }

  public snapshot(id: ID<'atlas-runtime-snapshot'>): RuntimeSnapshot {
    return { id, components: this.registry.list(), capturedAt: new Date().toISOString() as Timestamp };
  }
}

export class AtlasOperatingSystem {
  public constructor(public readonly kernel = new AtlasKernel()) {}

  public boot(component: PlatformComponent): RuntimeSnapshot {
    this.kernel.register(component);
    return this.kernel.snapshot(`snapshot:${component.id}` as ID<'atlas-runtime-snapshot'>);
  }
}
