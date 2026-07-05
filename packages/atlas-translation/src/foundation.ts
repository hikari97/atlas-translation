import type { ID, JsonObject, Nullable, Timestamp } from '@atlas/atlas-types';

export type TranslationItemId = ID<'translation-item'>;
export type TranslationRequestId = ID<'translation-request'>;
export type TranslationResultId = ID<'translation-result'>;
export type TranslationProviderId = ID<'translation-provider'>;
export type TranslationSessionId = ID<'translation-session'>;
export type TranslationBatchId = ID<'translation-batch'>;
export type TranslationWorkflowId = ID<'translation-workflow'>;

export enum TranslationItemState {
  Created = 'created',
  Queued = 'queued',
  Running = 'running',
  Paused = 'paused',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled'
}

export enum TranslationSourceKind {
  Image = 'image',
  Clipboard = 'clipboard',
  PdfPage = 'pdf-page',
  ArchiveEntry = 'archive-entry',
  Remote = 'remote',
  Virtual = 'virtual'
}

export interface TranslationSource {
  readonly id: string;
  readonly kind: TranslationSourceKind;
  readonly locator: string;
  readonly metadata: JsonObject;
}

export interface TranslationProgress {
  readonly total: number;
  readonly completed: number;
  readonly failed: number;
  readonly running: number;
  readonly percent: number;
}

export interface TranslationItem {
  readonly id: TranslationItemId;
  readonly source: TranslationSource;
  readonly state: TranslationItemState;
  readonly progress: TranslationProgress;
  readonly pipelineId: Nullable<ID<'translation-pipeline'>>;
  readonly resultId: Nullable<TranslationResultId>;
  readonly metadata: JsonObject;
}

export interface TranslationOptions {
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly domain: string;
  readonly preserveTone: boolean;
  readonly metadata: JsonObject;
}

export interface TranslationRequest {
  readonly id: TranslationRequestId;
  readonly itemId: TranslationItemId;
  readonly text: string;
  readonly context: JsonObject;
  readonly options: TranslationOptions;
  readonly createdAt: Timestamp;
}

export interface TranslationResult {
  readonly id: TranslationResultId;
  readonly requestId: TranslationRequestId;
  readonly providerId: TranslationProviderId;
  readonly text: string;
  readonly confidence: number;
  readonly metadata: JsonObject;
  readonly createdAt: Timestamp;
}

export enum TranslationErrorCode {
  ProviderUnavailable = 'provider-unavailable',
  ProviderFailed = 'provider-failed',
  PipelineFailed = 'pipeline-failed',
  ValidationFailed = 'validation-failed',
  Cancelled = 'cancelled'
}

export interface TranslationError {
  readonly code: TranslationErrorCode;
  readonly message: string;
  readonly recoverable: boolean;
  readonly metadata: JsonObject;
}

export interface TranslationCapabilities {
  readonly languages: readonly string[];
  readonly features: readonly string[];
  readonly maxBatchSize: number;
  readonly metadata: JsonObject;
}

export interface TranslationProvider {
  readonly id: TranslationProviderId;
  readonly name: string;
  readonly capabilities: TranslationCapabilities;
  translate(request: TranslationRequest): Promise<TranslationResult>;
}

export function createTranslationProgress(total: number, completed = 0, failed = 0, running = 0): TranslationProgress {
  const percent = total <= 0 ? 0 : Math.round(((completed + failed) / total) * 100);
  return { total, completed, failed, running, percent };
}

export function createTranslationItem(id: TranslationItemId, source: TranslationSource, metadata: JsonObject = {}): TranslationItem {
  return {
    id,
    source,
    state: TranslationItemState.Created,
    progress: createTranslationProgress(1),
    pipelineId: null,
    resultId: null,
    metadata
  };
}

export function createTranslationRequest(
  id: TranslationRequestId,
  itemId: TranslationItemId,
  text: string,
  options: TranslationOptions,
  context: JsonObject = {}
): TranslationRequest {
  return { id, itemId, text, context, options, createdAt: new Date().toISOString() as Timestamp };
}
