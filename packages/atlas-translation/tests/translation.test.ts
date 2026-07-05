import {
  PipelineState,
  ProviderRegistry,
  TranslationCache,
  TranslationItemState,
  TranslationMemory,
  TranslationProfiler,
  TranslationSourceKind,
  createPipeline,
  createTranslationBatch,
  createTranslationItem,
  createTranslationProgress,
  createTranslationRequest,
  type TranslationResult
} from '../src';
import type { ID } from '@atlas/atlas-types';

const item = createTranslationItem('item:test' as ID<'translation-item'>, {
  id: 'source:test',
  kind: TranslationSourceKind.Image,
  locator: 'memory://image',
  metadata: {}
});

item.state satisfies TranslationItemState;
item.progress satisfies ReturnType<typeof createTranslationProgress>;

const batch = createTranslationBatch('batch:test' as ID<'translation-batch'>, [item]);
batch.items.length satisfies number;

const request = createTranslationRequest(
  'request:test' as ID<'translation-request'>,
  item.id,
  'hello',
  {
    sourceLanguage: 'en',
    targetLanguage: 'id',
    domain: 'manga',
    preserveTone: true,
    metadata: {}
  }
);

const pipeline = createPipeline('pipeline:test' as ID<'translation-pipeline'>, []);
pipeline.stages.length satisfies number;

const registry = new ProviderRegistry();
registry.list().length satisfies number;

const memory = new TranslationMemory();
memory.add({ source: request.text, target: 'halo', metadata: {} });
memory.lookup('hello')?.target satisfies string | undefined;

const cache = new TranslationCache();
cache.get('missing') satisfies TranslationResult | null;

const profiler = new TranslationProfiler();
profiler.record({ token: 'translation.ms', value: 12, unit: 'ms' });
profiler.diagnostics([{ metricToken: 'translation.ms', threshold: 10 }]).issues.length satisfies number;

PipelineState.Completed satisfies PipelineState;
