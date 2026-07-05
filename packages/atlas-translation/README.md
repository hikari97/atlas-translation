# @atlas/atlas-translation

Provider-independent translation engine for Atlas Studio.

The package models translation items, requests, results, pipelines, batches, provider contracts, quality tools, workflows, integration ports, diagnostics, and platform-level contracts. It does not ship built-in AI or OCR providers.

## Example

```ts
import { TranslationSourceKind, createTranslationItem } from '@atlas/atlas-translation';
import type { ID } from '@atlas/atlas-types';

const item = createTranslationItem('item:001' as ID<'translation-item'>, {
  id: 'source:001',
  kind: TranslationSourceKind.Image,
  locator: 'file://page-001.png',
  metadata: {}
});
```

All providers are registered through contracts. The engine never hardcodes OpenAI, Gemini, Claude, PaddleOCR, or any other provider.
