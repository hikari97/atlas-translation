import { ServiceLifetime, type ServiceProvider, type ServiceToken } from '../service';
import type { ServiceRegistry } from '../registry';

export class DependencyResolver implements ServiceProvider {
  private readonly singletons = new Map<ServiceToken, unknown>();

  public constructor(private readonly registry: ServiceRegistry) {}

  public has(token: ServiceToken): boolean {
    return this.registry.get(token) !== undefined;
  }

  public resolve<TService>(token: ServiceToken<TService>): TService {
    const descriptor = this.registry.get(token);
    if (descriptor === undefined) {
      throw new Error(`Service is not registered: ${String(token)}`);
    }
    if (descriptor.lifetime === ServiceLifetime.Singleton) {
      if (!this.singletons.has(token)) {
        this.singletons.set(token, descriptor.factory(this));
      }
      return this.singletons.get(token) as TService;
    }
    return descriptor.factory(this);
  }
}
