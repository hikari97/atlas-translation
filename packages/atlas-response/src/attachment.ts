import type { ResponseAttributes, ResponseLifecycleRecord } from './shared';

export type ResponseAttachmentDisposition = 'attachment' | 'inline';

export type ResponseAttachmentReferenceKind = 'local-file' | 'virtual-file' | 'stream-reference' | 'custom';

export interface ResponseAttachmentReference {
  readonly kind: ResponseAttachmentReferenceKind;
  readonly value: string;
}

export interface ResponseAttachmentMetadata {
  readonly filename: string;
  readonly mimeType: string;
  readonly size: number | undefined;
  readonly lastModified: Date | undefined;
  readonly attributes: ResponseAttributes;
}

export interface ResponseAttachmentLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface ResponseAttachment {
  readonly reference: ResponseAttachmentReference;
  readonly disposition: ResponseAttachmentDisposition;
  readonly metadata: ResponseAttachmentMetadata;
  readonly lifecycle: ResponseAttachmentLifecycle;
}

export const createResponseAttachment = (
  reference: ResponseAttachmentReference,
  disposition: ResponseAttachmentDisposition,
  metadata: ResponseAttachmentMetadata,
  now: Date = new Date(),
): ResponseAttachment => ({
  reference,
  disposition,
  metadata,
  lifecycle: {
    state: 'active',
    transitions: ['created', 'active'],
    createdAt: now,
    updatedAt: now,
  },
});
