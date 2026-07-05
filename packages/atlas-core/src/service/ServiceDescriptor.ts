import type { ServiceLifetime } from './ServiceLifetime';
import type { ServiceToken } from './ServiceToken';

export interface ServiceDescriptor<TService = unknown> {
  readonly token: ServiceToken<TService>;
  readonly lifetime: ServiceLifetime;
  readonly factory: (provider: ServiceProvider) => TService;
}

export interface ServiceProvider {
  resolve<TService>(token: ServiceToken<TService>): TService;
  has(token: ServiceToken): boolean;
}
