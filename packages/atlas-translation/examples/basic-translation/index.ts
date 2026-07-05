import { TranslationSourceKind, createTranslationItem } from '../../src';
import type { ID } from '@atlas/atlas-types';

export const item = createTranslationItem('item:example' as ID<'translation-item'>, {
  id: 'source:example',
  kind: TranslationSourceKind.Image,
  locator: 'file://chapter/page-001.png',
  metadata: {}
});
