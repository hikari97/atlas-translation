import type { AtlasDocument } from '@atlas/atlas-document';
import type { AsyncCommandBus, Command, CommandContext, CommandResult } from '@atlas/atlas-command';
import { createHistoryEntry, type HistoryEntry, type HistoryManager } from '@atlas/atlas-history';
import { type InputEventModel, type InputManager } from '@atlas/atlas-input';
import { type DefaultPluginManager, type PluginDefinition } from '@atlas/atlas-plugin';
import { type RendererRuntime, type RenderResult } from '@atlas/atlas-renderer';
import { type SelectionManager } from '@atlas/atlas-selection';
import type { JsonObject } from '@atlas/atlas-types';
import type { EditorRuntimeState, EditorServices } from './types';

export interface IntegrationServices extends EditorServices {
  readonly capabilities: readonly string[];
}

export class IntegrationContext {
  public constructor(public readonly services: IntegrationServices) {}

  public inspect(): readonly string[] {
    return ['history', 'input', 'plugins', 'renderer', 'selection', ...this.services.capabilities];
  }
}

export class HistoryIntegration {
  public constructor(private readonly manager: HistoryManager) {}

  public recordState(id: string, label: string, state: EditorRuntimeState): HistoryEntry {
    const entry = createHistoryEntry(id, label, state as unknown as JsonObject);
    this.manager.push(entry);
    return entry;
  }
}

export class CommandIntegration {
  public constructor(private readonly bus: AsyncCommandBus) {}

  public execute<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>> {
    return this.bus.execute<TResult>(command, context);
  }
}

export class RendererIntegration {
  public constructor(private readonly renderer: RendererRuntime) {}

  public render(document: AtlasDocument): RenderResult {
    return this.renderer.render(document);
  }
}

export class InputIntegration {
  public constructor(private readonly manager: InputManager) {}

  public record(event: InputEventModel): void {
    this.manager.record(event);
  }
}

export class SelectionIntegration {
  public constructor(public readonly manager: SelectionManager) {}
}

export class PluginIntegration {
  private readonly plugins = new Map<string, PluginDefinition>();

  public constructor(private readonly manager: DefaultPluginManager) {}

  public register(plugin: PluginDefinition): void {
    this.plugins.set(plugin.descriptor.id, plugin);
    this.manager.register(plugin);
  }

  public list(): readonly PluginDefinition[] {
    return [...this.plugins.values()];
  }

  public runtime(): DefaultPluginManager {
    return this.manager;
  }
}
