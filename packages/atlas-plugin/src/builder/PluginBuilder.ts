import type { JsonObject } from '@atlas/atlas-types';
import {
  createPluginIdentifier,
  type PluginCapability,
  type PluginConfigurationSchema,
  type PluginDefinition,
  type PluginDependency,
  type PluginIdentifier,
  type PluginLifecycle
} from '../contracts';

interface PluginBuilderState extends PluginLifecycle {
  readonly id: PluginIdentifier;
  readonly name?: string;
  readonly version?: string;
  readonly description?: string;
  readonly author?: string;
  readonly license?: string;
  readonly homepage?: string;
  readonly repository?: string;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly capabilities: readonly PluginCapability[];
  readonly dependencies: readonly PluginDependency[];
  readonly configuration?: PluginConfigurationSchema;
}

export class PluginBuilder {
  private constructor(private readonly state: PluginBuilderState) {}

  public static create(id: string): PluginBuilder {
    return new PluginBuilder({
      id: createPluginIdentifier(id),
      keywords: [],
      tags: [],
      capabilities: [],
      dependencies: []
    });
  }

  public name(name: string): PluginBuilder {
    return this.withState({ name });
  }

  public version(version: string): PluginBuilder {
    return this.withState({ version });
  }

  public description(description: string): PluginBuilder {
    return this.withState({ description });
  }

  public author(author: string): PluginBuilder {
    return this.withState({ author });
  }

  public license(license: string): PluginBuilder {
    return this.withState({ license });
  }

  public homepage(homepage: string): PluginBuilder {
    return this.withState({ homepage });
  }

  public repository(repository: string): PluginBuilder {
    return this.withState({ repository });
  }

  public keywords(keywords: readonly string[]): PluginBuilder {
    return this.withState({ keywords: keywords.slice() });
  }

  public tags(tags: readonly string[]): PluginBuilder {
    return this.withState({ tags: tags.slice() });
  }

  public capabilities(capabilities: readonly PluginCapability[]): PluginBuilder {
    return this.withState({ capabilities: capabilities.slice() });
  }

  public dependency(dependency: PluginDependency): PluginBuilder {
    return this.withState({ dependencies: [...this.state.dependencies, dependency] });
  }

  public configuration(defaults: JsonObject, requiredKeys: readonly string[] = []): PluginBuilder {
    return this.withState({ configuration: { defaults, requiredKeys } });
  }

  public lifecycle(lifecycle: PluginLifecycle): PluginBuilder {
    return this.withState(lifecycle);
  }

  public build(): PluginDefinition {
    if (this.state.name === undefined || this.state.name.trim().length === 0) {
      throw new Error('Plugin name is required.');
    }
    if (this.state.version === undefined || this.state.version.trim().length === 0) {
      throw new Error('Plugin version is required.');
    }

    return Object.freeze({
      descriptor: Object.freeze({
        id: this.state.id,
        name: this.state.name,
        metadata: Object.freeze({
          displayName: this.state.name,
          description: this.state.description,
          version: this.state.version,
          author: this.state.author,
          license: this.state.license,
          homepage: this.state.homepage,
          repository: this.state.repository,
          keywords: this.state.keywords
        }),
        dependencies: this.state.dependencies,
        capabilities: this.state.capabilities,
        tags: this.state.tags
      }),
      configuration: this.state.configuration,
      install: this.state.install,
      initialize: this.state.initialize,
      activate: this.state.activate,
      deactivate: this.state.deactivate,
      dispose: this.state.dispose
    });
  }

  private withState(update: Partial<PluginBuilderState>): PluginBuilder {
    return new PluginBuilder({ ...this.state, ...update });
  }
}
