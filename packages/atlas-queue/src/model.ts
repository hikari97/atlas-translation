// Atlas Queue System - Provider-independent message queue contracts.

export type QueueDiagnosticSeverity = 'info' | 'warning' | 'error';
export type QueueMessageStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'dead-lettered';
export type QueueDeliveryGuarantee = 'at-most-once' | 'at-least-once' | 'exactly-once';

export interface QueueDiagnostic { readonly code: string; readonly message: string; readonly severity: QueueDiagnosticSeverity; }

export interface QueueMessageEnvelope<TPayload = unknown> {
  readonly id: string;
  readonly queue: string;
  readonly payload: TPayload;
  readonly priority: number;
  readonly delay: number;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly idempotencyKey: string | undefined;
  readonly tags: readonly string[];
  readonly createdAt: Date;
  readonly availableAt: Date;
  readonly status: QueueMessageStatus;
}
export const createQueueMessage = <TPayload = unknown>(id: string, queue: string, payload: TPayload, options: { priority?: number; delay?: number; maxAttempts?: number; idempotencyKey?: string; tags?: readonly string[] } = {}): QueueMessageEnvelope<TPayload> => ({
  id, queue, payload, priority: options.priority ?? 0, delay: options.delay ?? 0, attempts: 0, maxAttempts: options.maxAttempts ?? 3, idempotencyKey: options.idempotencyKey, tags: options.tags ?? [], createdAt: new Date(), availableAt: new Date(Date.now() + (options.delay ?? 0)), status: 'pending',
});

export interface QueueAdapter {
  enqueue<TPayload = unknown>(message: QueueMessageEnvelope<TPayload>): Promise<void>;
  dequeue<TPayload = unknown>(queue: string, timeout?: number): Promise<QueueMessageEnvelope<TPayload> | undefined>;
  ack(messageId: string): Promise<void>;
  nack(messageId: string, reason?: string): Promise<void>;
  size(queue: string): Promise<number>;
}

export class InMemoryQueueAdapter implements QueueAdapter {
  private readonly messages: QueueMessageEnvelope[] = [];
  private readonly processing = new Map<string, QueueMessageEnvelope>();
  public async enqueue<TPayload = unknown>(message: QueueMessageEnvelope<TPayload>): Promise<void> { this.messages.push(message); }
  public async dequeue<TPayload = unknown>(queue: string): Promise<QueueMessageEnvelope<TPayload> | undefined> {
    const idx = this.messages.findIndex(m => m.queue === queue && m.availableAt <= new Date());
    if (idx === -1) return undefined;
    const [msg] = this.messages.splice(idx, 1);
    this.processing.set(msg.id, msg);
    return msg as QueueMessageEnvelope<TPayload>;
  }
  public async ack(messageId: string): Promise<void> { this.processing.delete(messageId); }
  public async nack(messageId: string): Promise<void> { const msg = this.processing.get(messageId); if (msg) { this.processing.delete(messageId); this.messages.push({ ...msg, attempts: msg.attempts + 1 }); } }
  public async size(queue: string): Promise<number> { return this.messages.filter(m => m.queue === queue).length; }
}
export const createQueueAdapter = (): QueueAdapter => new InMemoryQueueAdapter();

export interface QueueProducer { send<TPayload = unknown>(queue: string, payload: TPayload, options?: { priority?: number; delay?: number }): Promise<string>; }
export interface QueueConsumer { subscribe<TPayload = unknown>(queue: string, handler: (message: QueueMessageEnvelope<TPayload>) => Promise<void>): () => void; }

export interface QueueRetryPolicy { readonly maxAttempts: number; readonly backoff: 'fixed' | 'exponential'; readonly interval: number; }
export const createQueueRetryPolicy = (maxAttempts = 3, backoff: 'fixed' | 'exponential' = 'exponential', interval = 1000): QueueRetryPolicy => ({ maxAttempts, backoff, interval });

export interface QueueDeadLetterEntry { readonly message: QueueMessageEnvelope; readonly reason: string; readonly deadLetteredAt: Date; }

export interface QueueConcurrencyLimit { readonly queue: string; readonly maxConcurrent: number; }

export interface QueueConfigBinding { readonly configKey: string; readonly required: boolean; }
export const createQueueConfigBinding = (configKey: string, required = true): QueueConfigBinding => ({ configKey, required });

export interface QueueRuntimeBinding { readonly runtimeId: string; readonly autoStart: boolean; }
export const createQueueRuntimeBinding = (runtimeId: string, autoStart = false): QueueRuntimeBinding => ({ runtimeId, autoStart });

export const createQueueDiagnostic = (code: string, message: string, severity: QueueDiagnosticSeverity = 'info'): QueueDiagnostic => ({ code, message, severity });
