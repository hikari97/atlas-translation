import type {
  Deserializer,
  SerializationContext,
  SerializationResult,
  Serializer
} from '@atlas/atlas-document/serialization';
import type { ID, Timestamp } from '@atlas/atlas-types';

interface SourceDocument {
  readonly id: string;
}

const context: SerializationContext = {
  requestId: 'serialization' as ID<'serialization-request'>,
  createdAt: '2026-07-03T00:00:00.000Z' as Timestamp,
  options: {
    includeMetadata: true,
    includeDiagnostics: false
  }
};

const serializer: Serializer<SourceDocument, string> = {
  serialize: (document): SerializationResult<string> => ({
    success: true,
    value: document.id,
    errors: []
  })
};

const deserializer: Deserializer<string, SourceDocument> = {
  deserialize: (source): SerializationResult<SourceDocument> => ({
    success: true,
    value: { id: source },
    errors: []
  })
};

export const serializationResult = {
  serialized: serializer.serialize({ id: 'document' }, context),
  deserialized: deserializer.deserialize('document', context)
};
