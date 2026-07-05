import {
  createRendererIdentifier,
  RendererBackend,
  type RenderContext,
  type RendererDefinition,
  type RenderResult
} from '../contracts';

interface RendererBuilderState {
  readonly id: string;
  readonly name?: string;
  readonly version?: string;
  readonly backend: RendererBackend;
  readonly description?: string;
  readonly author?: string;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly render?: (context: RenderContext) => RenderResult | Promise<RenderResult>;
}

export class RendererBuilder {
  private constructor(private readonly state: RendererBuilderState) {}

  public static create(id: string): RendererBuilder {
    return new RendererBuilder({
      id,
      backend: RendererBackend.Memory,
      keywords: [],
      tags: []
    });
  }

  public name(name: string): RendererBuilder {
    return this.withState({ name });
  }

  public version(version: string): RendererBuilder {
    return this.withState({ version });
  }

  public backend(backend: RendererBackend): RendererBuilder {
    return this.withState({ backend });
  }

  public description(description: string): RendererBuilder {
    return this.withState({ description });
  }

  public author(author: string): RendererBuilder {
    return this.withState({ author });
  }

  public keywords(keywords: readonly string[]): RendererBuilder {
    return this.withState({ keywords: keywords.slice() });
  }

  public tags(tags: readonly string[]): RendererBuilder {
    return this.withState({ tags: tags.slice() });
  }

  public renderer(render: (context: RenderContext) => RenderResult | Promise<RenderResult>): RendererBuilder {
    return this.withState({ render });
  }

  public build(): RendererDefinition {
    if (this.state.name === undefined || this.state.name.trim().length === 0) {
      throw new Error('Renderer name is required.');
    }
    if (this.state.version === undefined || this.state.version.trim().length === 0) {
      throw new Error('Renderer version is required.');
    }
    if (this.state.render === undefined) {
      throw new Error('Renderer function is required.');
    }

    return Object.freeze({
      descriptor: Object.freeze({
        id: createRendererIdentifier(this.state.id),
        name: this.state.name,
        backend: this.state.backend,
        metadata: Object.freeze({
          displayName: this.state.name,
          version: this.state.version,
          description: this.state.description,
          author: this.state.author,
          keywords: this.state.keywords
        }),
        tags: this.state.tags
      }),
      render: this.state.render
    });
  }

  private withState(update: Partial<RendererBuilderState>): RendererBuilder {
    return new RendererBuilder({ ...this.state, ...update });
  }
}
