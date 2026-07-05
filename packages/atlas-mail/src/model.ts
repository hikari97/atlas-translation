// Atlas Mail System - Provider-independent mail contracts.

export type MailDiagnosticSeverity = 'info' | 'warning' | 'error';
export type MailDeliveryStatus = 'queued' | 'sent' | 'failed' | 'bounced' | 'deferred';

export interface MailDiagnostic { readonly code: string; readonly message: string; readonly severity: MailDiagnosticSeverity; }

export interface MailAddress { readonly address: string; readonly name: string | undefined; }
export const createMailAddress = (address: string, name: string | undefined = undefined): MailAddress => ({ address, name });

export interface MailMessage {
  readonly id: string;
  readonly from: MailAddress;
  readonly to: readonly MailAddress[];
  readonly cc: readonly MailAddress[];
  readonly bcc: readonly MailAddress[];
  readonly replyTo: MailAddress | undefined;
  readonly subject: string;
  readonly textBody: string | undefined;
  readonly htmlBody: string | undefined;
  readonly attachments: readonly MailAttachment[];
  readonly headers: Readonly<Record<string, string>>;
  readonly createdAt: Date;
}
export interface MailAttachment { readonly filename: string; readonly contentType: string; readonly content: string; readonly inline: boolean; }
export const createMailMessage = (id: string, from: MailAddress, to: readonly MailAddress[], subject: string, options: { cc?: readonly MailAddress[]; bcc?: readonly MailAddress[]; replyTo?: MailAddress; textBody?: string; htmlBody?: string; attachments?: readonly MailAttachment[]; headers?: Readonly<Record<string, string>> } = {}): MailMessage => ({ id, from, to, cc: options.cc ?? [], bcc: options.bcc ?? [], replyTo: options.replyTo, subject, textBody: options.textBody, htmlBody: options.htmlBody, attachments: options.attachments ?? [], headers: options.headers ?? {}, createdAt: new Date() });

export interface MailTemplate { readonly id: string; readonly subject: string; readonly html: string; readonly text: string; readonly variables: readonly string[]; }
export const createMailTemplate = (id: string, subject: string, html: string, text: string, variables: readonly string[] = []): MailTemplate => ({ id, subject, html, text, variables });

export interface MailTransport { send(message: MailMessage): Promise<MailDeliveryResult>; }
export interface MailDeliveryResult { readonly messageId: string; readonly status: MailDeliveryStatus; readonly error: string | undefined; readonly sentAt: Date; }
export const createMailDeliveryResult = (messageId: string, status: MailDeliveryStatus, error: string | undefined = undefined, sentAt: Date = new Date()): MailDeliveryResult => ({ messageId, status, error, sentAt });

export class DevelopmentMailTransport implements MailTransport {
  private readonly sent: MailMessage[] = [];
  public async send(message: MailMessage): Promise<MailDeliveryResult> { this.sent.push(message); return createMailDeliveryResult(message.id, 'sent'); }
  public getOutbox(): readonly MailMessage[] { return this.sent; }
}
export const createDevelopmentMailTransport = (): DevelopmentMailTransport => new DevelopmentMailTransport();

export interface MailSendPipeline { send(message: MailMessage): Promise<MailDeliveryResult>; }
export const createMailSendPipeline = (transport: MailTransport): MailSendPipeline => ({ send: (message) => transport.send(message) });

export interface MailRetryBoundary { readonly maxAttempts: number; readonly backoff: 'fixed' | 'exponential'; readonly interval: number; }
export const createMailRetryBoundary = (maxAttempts = 3, backoff: 'fixed' | 'exponential' = 'exponential', interval = 5000): MailRetryBoundary => ({ maxAttempts, backoff, interval });

export interface MailRateLimit { readonly maxPerInterval: number; readonly intervalMs: number; }
export const createMailRateLimit = (maxPerInterval = 100, intervalMs = 60_000): MailRateLimit => ({ maxPerInterval, intervalMs });

export interface MailPreview { readonly message: MailMessage; readonly renderedSubject: string; readonly renderedHtml: string; }
export const createMailPreview = (message: MailMessage): MailPreview => ({ message, renderedSubject: message.subject, renderedHtml: message.htmlBody ?? message.textBody ?? '' });

export interface QueueIntegrationBinding { readonly queue: string; readonly autoEnqueue: boolean; }
export const createMailQueueIntegration = (queue: string, autoEnqueue = true): QueueIntegrationBinding => ({ queue, autoEnqueue });

export interface MailConfigBinding { readonly configKey: string; readonly required: boolean; }
export const createMailConfigBinding = (configKey: string, required = true): MailConfigBinding => ({ configKey, required });

export interface NotificationBoundary { readonly notificationId: string; readonly mailMessageId: string; }
export const createMailNotificationBoundary = (notificationId: string, mailMessageId: string): NotificationBoundary => ({ notificationId, mailMessageId });

export const createMailDiagnostic = (code: string, message: string, severity: MailDiagnosticSeverity = 'info'): MailDiagnostic => ({ code, message, severity });
