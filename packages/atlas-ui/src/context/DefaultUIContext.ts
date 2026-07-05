import type { Command, CommandResult } from '@atlas/atlas-command';
import { CommandResultStatus } from '@atlas/atlas-command';
import type { RuntimeContext } from '@atlas/atlas-core';
import type { Event, EventPublicationResult } from '@atlas/atlas-events';
import { EventPublicationStatus } from '@atlas/atlas-events';
import type { RenderTree } from '@atlas/atlas-renderer';
import type { JsonObject } from '@atlas/atlas-types';
import type { UIContext } from '../contracts';
import { DEFAULT_UI_TOKENS, type UITheme } from '../theme';

export interface DefaultUIContextOptions {
  readonly runtime?: RuntimeContext | null;
  readonly theme?: UITheme | undefined;
  readonly renderTree?: RenderTree | null;
  readonly metadata?: JsonObject | undefined;
}

export class DefaultUIContext implements UIContext {
  public readonly runtime: RuntimeContext | null;
  public readonly theme: UITheme;
  public readonly renderTree: RenderTree | null;
  public readonly metadata?: JsonObject | undefined;

  public constructor(options: DefaultUIContextOptions = {}) {
    this.runtime = options.runtime ?? null;
    this.theme = options.theme ?? { id: 'atlas.default', name: 'Atlas Default', tokens: DEFAULT_UI_TOKENS };
    this.renderTree = options.renderTree ?? null;
    this.metadata = options.metadata;
  }

  public async publish(_event: Event): Promise<EventPublicationResult> {
    return {
      status: EventPublicationStatus.Skipped,
      deliveredCount: 0,
      errors: []
    };
  }

  public async execute<TResult>(_command: Command): Promise<CommandResult<TResult>> {
    return {
      status: CommandResultStatus.Skipped,
      value: null,
      errors: [{ code: 'ATLAS_UI_COMMAND_UNAVAILABLE', message: 'Command integration unavailable.', cause: null }]
    };
  }
}
