import type { Command, CommandContext, CommandContextId, CommandResult } from '@atlas/atlas-command';
import { CommandResultStatus } from '@atlas/atlas-command';
import { Environment, type RuntimeContext, type ServiceToken } from '@atlas/atlas-core';
import type { Event, EventContext, EventPublicationResult } from '@atlas/atlas-events';
import { EventPublicationStatus } from '@atlas/atlas-events';
import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { PluginConfiguration, PluginContext } from '../contracts';
import { DefaultPluginConfiguration } from '../configuration';
import type { PluginCommandIntegration } from './PluginCommandIntegration';
import type { PluginEventIntegration } from './PluginEventIntegration';

export interface DefaultPluginContextOptions {
  readonly runtime?: RuntimeContext | null;
  readonly environment?: Environment;
  readonly configuration?: PluginConfiguration;
  readonly commandIntegration?: PluginCommandIntegration;
  readonly eventIntegration?: PluginEventIntegration;
  readonly metadata?: JsonObject | undefined;
}

export class DefaultPluginContext implements PluginContext {
  public readonly runtime: RuntimeContext | null;
  public readonly environment: Environment;
  public readonly configuration: PluginConfiguration;
  public readonly metadata?: JsonObject | undefined;

  public constructor(private readonly options: DefaultPluginContextOptions = {}) {
    this.runtime = options.runtime ?? null;
    this.environment = options.environment ?? Environment.Development;
    this.configuration = options.configuration ?? new DefaultPluginConfiguration();
    this.metadata = options.metadata;
  }

  public resolve<TService>(token: ServiceToken<TService>): TService {
    if (this.runtime === null) {
      throw new Error(`Runtime context is unavailable for service ${String(token)}.`);
    }
    return this.runtime.services.resolve(token);
  }

  public hasService(token: ServiceToken): boolean {
    return this.runtime?.services.has(token) ?? false;
  }

  public async publish(event: Event): Promise<EventPublicationResult> {
    if (this.options.eventIntegration === undefined) {
      return {
        status: EventPublicationStatus.Skipped,
        deliveredCount: 0,
        errors: []
      };
    }
    return this.options.eventIntegration.publish(event, this.createEventContext());
  }

  public async execute<TResult>(command: Command): Promise<CommandResult<TResult>> {
    if (this.options.commandIntegration === undefined) {
      return {
        status: CommandResultStatus.Skipped,
        value: null,
        errors: [{ code: 'PLUGIN_COMMAND_INTEGRATION_UNAVAILABLE', message: 'Command integration unavailable.', cause: null }]
      };
    }
    return this.options.commandIntegration.execute<TResult>(command, this.createCommandContext());
  }

  private createEventContext(): EventContext {
    return {
      id: 'plugin-event-context' as ID<'event-context'>,
      document: null,
      publishedAt: new Date().toISOString() as Timestamp
    };
  }

  private createCommandContext(): CommandContext {
    return {
      id: 'plugin-command-context' as CommandContextId,
      document: null,
      userId: null,
      correlationId: null,
      startedAt: new Date().toISOString() as Timestamp,
      options: {
        dryRun: false,
        collectDiagnostics: false
      }
    };
  }
}
