import { createTranslationBatch, createTranslationItem, TranslationSourceKind } from '../src';
import type { ID } from '@atlas/atlas-types';

const items = Array.from({ length: 1_000 }, (_, index) =>
  createTranslationItem(`item:${index}` as ID<'translation-item'>, {
    id: `source:${index}`,
    kind: TranslationSourceKind.Image,
    locator: `memory://${index}`,
    metadata: {}
  })
);

export const benchmarkBatch = createTranslationBatch('batch:benchmark' as ID<'translation-batch'>, items);
