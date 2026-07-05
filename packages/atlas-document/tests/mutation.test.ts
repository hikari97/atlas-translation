import { MutationPipeline } from '@atlas/atlas-document/mutation';
import type { DocumentMutation } from '@atlas/atlas-document/mutation';
import type { ID } from '@atlas/atlas-types';

interface MutableTestDocument {
  readonly id: ID<'test-document'>;
  readonly value: string;
}

const mutation: DocumentMutation<MutableTestDocument> = {
  id: 'set-value',
  target: {
    id: 'test' as ID<'test-document'>,
    type: 'test',
    path: '/'
  },
  apply: (document) => ({
    success: true,
    document: { ...document, value: 'next' },
    changedIds: [document.id],
    errors: []
  })
};

const pipeline = new MutationPipeline<MutableTestDocument>([mutation]);

export const mutationResult = pipeline.run(
  { id: 'test' as ID<'test-document'>, value: 'initial' },
  {
    requestId: 'mutation-request' as ID<'mutation-request'>,
    options: { dryRun: false, collectDiagnostics: true }
  }
);
