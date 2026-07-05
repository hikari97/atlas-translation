import type { JsonObject } from '@atlas/atlas-types';
import type { TranslationOptions, TranslationProvider, TranslationProviderId, TranslationRequest, TranslationResult } from './foundation';

export interface ProviderConfiguration {
  readonly providerId: TranslationProviderId;
  readonly enabled: boolean;
  readonly priority: number;
  readonly metadata: JsonObject;
}

export interface ProviderMetric {
  readonly providerId: TranslationProviderId;
  readonly totalRequests: number;
  readonly failures: number;
  readonly averageLatencyMs: number;
}

export interface ProviderMetrics {
  readonly metrics: readonly ProviderMetric[];
}

export type TranslationMiddleware = (request: TranslationRequest) => TranslationRequest | Promise<TranslationRequest>;

export class ProviderRegistry {
  private readonly providers = new Map<TranslationProviderId, TranslationProvider>();

  public register(provider: TranslationProvider): void {
    this.providers.set(provider.id, provider);
  }

  public get(id: TranslationProviderId): TranslationProvider | null {
    return this.providers.get(id) ?? null;
  }

  public list(): readonly TranslationProvider[] {
    return [...this.providers.values()];
  }
}

export class ProviderResolver {
  public constructor(private readonly registry: ProviderRegistry) {}

  public resolve(options: TranslationOptions): TranslationProvider | null {
    return this.registry.list().find((provider) => provider.capabilities.languages.includes(options.targetLanguage)) ?? null;
  }
}

export class ProviderFallback {
  public constructor(private readonly providers: readonly TranslationProvider[]) {}

  public async translate(request: TranslationRequest): Promise<TranslationResult> {
    let lastError: unknown = null;
    for (const provider of this.providers) {
      try {
        return await provider.translate(request);
      } catch (error: unknown) {
        lastError = error;
      }
    }
    throw lastError instanceof Error ? lastError : new Error('All translation providers failed.');
  }
}

export class TranslationCache {
  private readonly values = new Map<string, TranslationResult>();

  public get(key: string): TranslationResult | null {
    return this.values.get(key) ?? null;
  }

  public set(key: string, result: TranslationResult): void {
    this.values.set(key, result);
  }
}

export class PromptBuilder {
  public build(request: TranslationRequest, context: JsonObject = {}): string {
    return JSON.stringify({ text: request.text, options: request.options, context });
  }
}

export class ContextResolver {
  public resolve(request: TranslationRequest, additions: JsonObject = {}): JsonObject {
    return { ...request.context, ...additions };
  }
}
