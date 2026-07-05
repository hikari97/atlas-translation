import type { Command, CommandResult } from '@atlas/atlas-command';
import type { Environment, RuntimeContext, ServiceToken } from '@atlas/atlas-core';
import type { Event, EventPublicationResult } from '@atlas/atlas-events';
import type { JsonObject } from '@atlas/atlas-types';
import type { PluginConfiguration } from './PluginConfiguration';

export interface PluginContext {
  readonly runtime: RuntimeContext | null;
  readonly environment: Environment;
  readonly configuration: PluginConfiguration;
  readonly metadata?: JsonObject | undefined;
  resolve<TService>(token: ServiceToken<TService>): TService;
  hasService(token: ServiceToken): boolean;
  publish(event: Event): Promise<EventPublicationResult>;
  execute<TResult>(command: Command): Promise<CommandResult<TResult>>;
}
