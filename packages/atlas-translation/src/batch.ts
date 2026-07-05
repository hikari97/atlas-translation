import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import { createTranslationProgress, TranslationItemState, type TranslationBatchId, type TranslationItem, type TranslationProgress, type TranslationSessionId } from './foundation';
import type { TranslationJob } from './pipeline';

export enum TranslationRuntimeState {
  Idle = 'idle',
  Running = 'running',
  Paused = 'paused',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled'
}

export interface TranslationBatch {
  readonly id: TranslationBatchId;
  readonly items: readonly TranslationItem[];
  readonly state: TranslationRuntimeState;
  readonly progress: TranslationProgress;
  readonly metadata: JsonObject;
}

export interface TranslationSession {
  readonly id: TranslationSessionId;
  readonly name: string;
  readonly batches: readonly TranslationBatch[];
  readonly state: TranslationRuntimeState;
  readonly progress: TranslationProgress;
  readonly metadata: JsonObject;
}

export interface BatchSnapshot {
  readonly batch: TranslationBatch;
  readonly capturedAt: Timestamp;
}

export interface RecoveryPoint {
  readonly id: ID<'translation-recovery'>;
  readonly snapshot: BatchSnapshot;
  readonly metadata: JsonObject;
}

export class TranslationQueue {
  private readonly jobs: TranslationJob[] = [];

  public enqueue(job: TranslationJob): void {
    this.jobs.push(job);
    this.jobs.sort((left, right) => right.priority - left.priority);
  }

  public dequeue(): TranslationJob | null {
    return this.jobs.shift() ?? null;
  }

  public snapshot(): readonly TranslationJob[] {
    return [...this.jobs];
  }
}

export class TranslationWorker {
  public constructor(public readonly id: ID<'translation-worker'>) {}

  public claim(queue: TranslationQueue): TranslationJob | null {
    return queue.dequeue();
  }
}

export class WorkerPool {
  public constructor(public readonly size: number) {}

  public capacity(): number {
    return this.size;
  }
}

export class WorkerScheduler {
  public next(queue: TranslationQueue): TranslationJob | null {
    return queue.dequeue();
  }
}

export class TranslationScheduler extends WorkerScheduler {}

export class TranslationRuntime {
  public constructor(
    public readonly queue = new TranslationQueue(),
    public readonly scheduler = new TranslationScheduler()
  ) {}

  public schedule(job: TranslationJob): void {
    this.queue.enqueue(job);
  }

  public next(): TranslationJob | null {
    return this.scheduler.next(this.queue);
  }
}

export function createTranslationBatch(id: TranslationBatchId, items: readonly TranslationItem[], metadata: JsonObject = {}): TranslationBatch {
  return {
    id,
    items: [...items],
    state: TranslationRuntimeState.Idle,
    progress: summarizeProgress(items),
    metadata
  };
}

export function createTranslationSession(id: TranslationSessionId, name: string, batches: readonly TranslationBatch[], metadata: JsonObject = {}): TranslationSession {
  const items = batches.flatMap((batch) => batch.items);
  return { id, name, batches: [...batches], state: TranslationRuntimeState.Idle, progress: summarizeProgress(items), metadata };
}

export function updateBatchState(batch: TranslationBatch, state: TranslationRuntimeState): TranslationBatch {
  return { ...batch, state };
}

export function pauseBatch(batch: TranslationBatch): TranslationBatch {
  return updateBatchState(batch, TranslationRuntimeState.Paused);
}

export function resumeBatch(batch: TranslationBatch): TranslationBatch {
  return updateBatchState(batch, TranslationRuntimeState.Running);
}

export function cancelBatch(batch: TranslationBatch): TranslationBatch {
  return updateBatchState(batch, TranslationRuntimeState.Cancelled);
}

export function retryFailedItems(batch: TranslationBatch): TranslationBatch {
  return { ...batch, items: batch.items.map((item) => (item.state === TranslationItemState.Failed ? { ...item, state: TranslationItemState.Queued } : item)) };
}

export function createBatchSnapshot(batch: TranslationBatch): BatchSnapshot {
  return { batch, capturedAt: new Date().toISOString() as Timestamp };
}

function summarizeProgress(items: readonly TranslationItem[]): TranslationProgress {
  const completed = items.filter((item) => item.state === TranslationItemState.Completed).length;
  const failed = items.filter((item) => item.state === TranslationItemState.Failed).length;
  const running = items.filter((item) => item.state === TranslationItemState.Running).length;
  return createTranslationProgress(items.length, completed, failed, running);
}
