import type { HttpHandler } from './handler';
import type { HttpMethod } from './method';
import type { HttpMetadata } from './metadata';
import type { HttpRequestTarget } from './request-line';
import type { HttpAttributes, HttpLifecycleRecord } from './shared';

export interface HttpEndpointExecutionPolicy {
  readonly name: string;
  readonly attributes: HttpAttributes;
}

export interface HttpEndpointConfiguration {
  readonly id: string;
  readonly method: HttpMethod;
  readonly target: HttpRequestTarget;
  readonly attributes: HttpAttributes;
  readonly policies: readonly HttpEndpointExecutionPolicy[];
}

export interface HttpEndpointMetadata extends HttpMetadata {}

export type HttpEndpointLifecycleState = 'initialized' | 'active' | 'disabled' | 'removed';

export interface HttpEndpointLifecycle extends HttpLifecycleRecord<HttpEndpointLifecycleState> {}

export interface HttpEndpointHandler extends HttpHandler {}

export interface HttpEndpoint {
  readonly method: HttpMethod;
  readonly target: HttpRequestTarget;
  readonly handler: HttpEndpointHandler;
  readonly metadata: HttpEndpointMetadata;
  readonly lifecycle: HttpEndpointLifecycle;
  readonly configuration: HttpEndpointConfiguration;
  readonly policies: readonly HttpEndpointExecutionPolicy[];
}

export const createHttpEndpoint = (
  configuration: HttpEndpointConfiguration,
  handler: HttpEndpointHandler,
  metadata: HttpEndpointMetadata,
  now: Date = new Date(),
): HttpEndpoint => ({
  method: configuration.method,
  target: configuration.target,
  handler,
  metadata,
  configuration,
  policies: configuration.policies,
  lifecycle: {
    state: 'active',
    transitions: ['initialized', 'active'],
    createdAt: now,
    updatedAt: now,
  },
});
