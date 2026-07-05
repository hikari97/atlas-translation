import type { ServiceDescriptor } from '../service';
import type { ServiceToken } from '../service';

export interface ServiceRegistry {
  register<TService>(descriptor: ServiceDescriptor<TService>): void;
  get<TService>(token: ServiceToken<TService>): ServiceDescriptor<TService> | undefined;
  list(): readonly ServiceDescriptor[];
}
