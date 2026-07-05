// Atlas Notification System - Provider-independent notification contracts.

export type NotificationDiagnosticSeverity = 'info' | 'warning' | 'error';
export type NotificationChannelType = 'in-app' | 'email' | 'sms' | 'push' | 'webhook' | 'custom';
export type NotificationDeliveryStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'suppressed';
export type NotificationState = 'draft' | 'queued' | 'delivering' | 'delivered' | 'failed' | 'cancelled';

export interface NotificationDiagnostic { readonly code: string; readonly message: string; readonly severity: NotificationDiagnosticSeverity; }

export interface NotificationChannel { readonly id: string; readonly type: NotificationChannelType; readonly name: string; readonly enabled: boolean; readonly attributes: Readonly<Record<string, string>>; }
export const createNotificationChannel = (id: string, type: NotificationChannelType, name: string, options: { enabled?: boolean; attributes?: Readonly<Record<string, string>> } = {}): NotificationChannel => ({ id, type, name, enabled: options.enabled ?? true, attributes: options.attributes ?? {} });

export interface NotificationRecipient { readonly id: string; readonly userId: string; readonly channels: readonly NotificationChannelType[]; readonly metadata: Readonly<Record<string, string>>; }
export const createNotificationRecipient = (id: string, userId: string, channels: readonly NotificationChannelType[], metadata: Readonly<Record<string, string>> = {}): NotificationRecipient => ({ id, userId, channels, metadata });

export interface NotificationPreference { readonly userId: string; readonly channelPreferences: Readonly<Record<NotificationChannelType, boolean>>; readonly quietHours: { readonly start: string; readonly end: string } | undefined; }
export const createNotificationPreference = (userId: string, channelPreferences: Readonly<Record<NotificationChannelType, boolean>>, quietHours?: { start: string; end: string }): NotificationPreference => ({ userId, channelPreferences, quietHours });

export interface NotificationTemplate { readonly id: string; readonly channel: NotificationChannelType; readonly subject: string; readonly body: string; readonly variables: readonly string[]; }
export const createNotificationTemplate = (id: string, channel: NotificationChannelType, subject: string, body: string, variables: readonly string[] = []): NotificationTemplate => ({ id, channel, subject, body, variables });

export interface NotificationEvent { readonly id: string; readonly type: string; readonly payload: unknown; readonly recipients: readonly NotificationRecipient[]; readonly channel: NotificationChannelType; readonly createdAt: Date; }
export const createNotificationEvent = (id: string, type: string, payload: unknown, recipients: readonly NotificationRecipient[], channel: NotificationChannelType): NotificationEvent => ({ id, type, payload, recipients, channel, createdAt: new Date() });

export interface NotificationDeliveryResult { readonly eventId: string; readonly recipientId: string; readonly status: NotificationDeliveryStatus; readonly channel: NotificationChannelType; readonly error: string | undefined; readonly deliveredAt: Date | undefined; }
export const createNotificationDeliveryResult = (eventId: string, recipientId: string, status: NotificationDeliveryStatus, channel: NotificationChannelType, error: string | undefined = undefined, deliveredAt: Date | undefined = undefined): NotificationDeliveryResult => ({ eventId, recipientId, status, channel, error, deliveredAt });

type NotificationChannelHandler = (event: NotificationEvent) => Promise<NotificationDeliveryResult>;
type NotificationChannelMap = Readonly<Record<NotificationChannelType, NotificationChannelHandler>>;
export interface DeliveryPipeline { deliver(event: NotificationEvent): Promise<readonly NotificationDeliveryResult[]>; }
export const createDeliveryPipeline = (channelMap: NotificationChannelMap): DeliveryPipeline => ({
  async deliver(event: NotificationEvent): Promise<readonly NotificationDeliveryResult[]> {
    const handler = channelMap[event.channel];
    if (!handler) return event.recipients.map(_r => createNotificationDeliveryResult(event.id, _r.id, 'failed', event.channel, `Channel "${event.channel}" not configured.`));
    return Promise.all(event.recipients.map(_r => handler(event)));
  },
});

export interface InAppChannelStore { store(event: NotificationEvent): Promise<void>; list(userId: string): Promise<readonly NotificationEvent[]>; }
export class InMemoryInAppChannel implements InAppChannelStore {
  private readonly events = new Map<string, NotificationEvent[]>();
  public async store(event: NotificationEvent): Promise<void> { const key = event.recipients[0]?.userId ?? 'unknown'; const list = this.events.get(key) ?? []; list.push(event); this.events.set(key, list); }
  public async list(userId: string): Promise<readonly NotificationEvent[]> { return this.events.get(userId) ?? []; }
}
export const createInAppChannel = (): InAppChannelStore => new InMemoryInAppChannel();

export interface EmailChannelBinding { readonly notificationId: string; readonly mailMessageId: string; }
export const createEmailChannelBinding = (notificationId: string, mailMessageId: string): EmailChannelBinding => ({ notificationId, mailMessageId });

export interface QueueIntegrationBinding { readonly queue: string; readonly autoEnqueue: boolean; }
export const createNotificationQueueIntegration = (queue: string, autoEnqueue = true): QueueIntegrationBinding => ({ queue, autoEnqueue });

export interface SchedulerIntegrationBinding { readonly scheduleId: string; readonly eventId: string; }
export const createNotificationSchedulerIntegration = (scheduleId: string, eventId: string): SchedulerIntegrationBinding => ({ scheduleId, eventId });

export interface NotificationStateModel { readonly eventId: string; readonly state: NotificationState; readonly updatedAt: Date; }
export const createNotificationState = (eventId: string, state: NotificationState, updatedAt: Date = new Date()): NotificationStateModel => ({ eventId, state, updatedAt });

export interface DeduplicationRule { readonly key: string; readonly windowMs: number; readonly maxPerWindow: number; }
export const createDeduplicationRule = (key: string, windowMs = 60_000, maxPerWindow = 1): DeduplicationRule => ({ key, windowMs, maxPerWindow });

export const createNotificationDiagnostic = (code: string, message: string, severity: NotificationDiagnosticSeverity = 'info'): NotificationDiagnostic => ({ code, message, severity });
