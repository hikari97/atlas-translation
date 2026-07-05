import type { Command, CommandResult } from '@atlas/atlas-command';
import type { RuntimeContext } from '@atlas/atlas-core';
import type { Event, EventPublicationResult } from '@atlas/atlas-events';
import type { RenderTree } from '@atlas/atlas-renderer';
import type { JsonObject } from '@atlas/atlas-types';
import type { UITheme } from '../theme';

export interface UIContext {
  readonly runtime: RuntimeContext | null;
  readonly theme: UITheme;
  readonly renderTree: RenderTree | null;
  readonly metadata?: JsonObject | undefined;
  publish(event: Event): Promise<EventPublicationResult>;
  execute<TResult>(command: Command): Promise<CommandResult<TResult>>;
}
