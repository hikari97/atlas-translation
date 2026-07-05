import type { RouteLifecycle } from './lifecycle';
import type { RouteMetadata } from './metadata';
import type { RouterAttributes, RouterMutableRegistry } from './shared';
import { InMemoryRouterRegistry } from './shared';

export interface RouteProviderCapabilities {
  readonly routeRegistration: boolean;
  readonly routeResolution: boolean;
  readonly dynamicRoutes: boolean;
  readonly groupedRoutes: boolean;
}

export interface RouteProviderMetadata extends RouteMetadata {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly attributes: RouterAttributes;
}

export interface RouteProviderLifecycle extends RouteLifecycle {}

export interface RouteProviderHealth {
  readonly healthy: boolean;
  readonly checkedAt: Date;
  readonly message: string | undefined;
}

export interface RouteProvider {
  readonly metadata: RouteProviderMetadata;
  readonly lifecycle: RouteProviderLifecycle;
  readonly capabilities: RouteProviderCapabilities;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<RouteProviderHealth>;
}

export interface RouteProviderRegistry extends RouterMutableRegistry<RouteProvider> {}

export const createRouteProviderRegistry = (): RouteProviderRegistry =>
  new InMemoryRouterRegistry<RouteProvider>();

export const createRouteProviderMetadata = (
  metadata: RouteMetadata,
  id: string,
  name: string,
  version: string,
  attributes: RouterAttributes = {},
): RouteProviderMetadata => Object.assign(metadata, {
  id,
  name,
  version,
  attributes,
});

export const createRouteProvider = (
  metadata: RouteProviderMetadata,
  lifecycle: RouteProviderLifecycle,
  capabilities: RouteProviderCapabilities,
): RouteProvider => ({
  metadata,
  lifecycle,
  capabilities,
  async initialize(): Promise<void> {},
  async shutdown(): Promise<void> {},
  async healthCheck(): Promise<RouteProviderHealth> {
    return {
      healthy: true,
      checkedAt: new Date(),
      message: undefined,
    };
  },
});
