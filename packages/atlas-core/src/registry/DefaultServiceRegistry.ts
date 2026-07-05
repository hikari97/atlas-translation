import type { ServiceDescriptor, ServiceToken } from '../service';
import type { ServiceRegistry } from './ServiceRegistry';

export class DefaultServiceRegistry implements ServiceRegistry {
  private readonly descriptors = new Map<ServiceToken, ServiceDescriptor>();

  public register<TService>(descriptor: ServiceDescriptor<TService>): void {
    this.descriptors.set(descriptor.token, descriptor);
  }

  public get<TService>(token: ServiceToken<TService>): ServiceDescriptor<TService> | undefined {
    return this.descriptors.get(token) as ServiceDescriptor<TService> | undefined;
  }

  public list(): readonly ServiceDescriptor[] {
    return [...this.descriptors.values()];
  }
}
