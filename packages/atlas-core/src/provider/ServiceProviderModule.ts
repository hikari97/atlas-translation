import type { ServiceRegistry } from '../registry';

export interface ServiceProviderModule {
  registerServices(registry: ServiceRegistry): void;
}
