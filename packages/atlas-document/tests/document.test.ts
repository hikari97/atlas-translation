import {
  AtlasDocument,
  BubbleDocument,
  LayerDocument,
  PageDocument,
  ProjectDocument,
  TranslationDocument,
  WorkspaceDocument
} from '@atlas/atlas-document';
import {
  BubbleType,
  LanguageDirection,
  LayerType,
  ProjectStatus,
  TranslationStatus,
  WorkflowState
} from '@atlas/atlas-types';
import type { ID, Timestamp } from '@atlas/atlas-types';

const timestamp = '2026-07-03T00:00:00.000Z' as Timestamp;
const userId = 'user-1' as ID<'user'>;
const workspaceId = 'workspace-1' as ID<'workspace'>;
const projectId = 'project-1' as ID<'project'>;
const pageId = 'page-1' as ID<'page'>;
const layerId = 'layer-1' as ID<'layer'>;
const bubbleId = 'bubble-1' as ID<'bubble'>;
const translationId = 'translation-1' as ID<'translation'>;

const translation = new TranslationDocument(
  translationId,
  bubbleId,
  { originalText: 'Hello', translatedText: 'Halo' },
  {
    sourceLanguage: 'en',
    targetLanguage: 'id',
    direction: LanguageDirection.LeftToRight
  },
  { providerType: null, providerId: null, model: null },
  { reviewed: false, reviewedBy: null, reviewedAt: null, note: null },
  { status: TranslationStatus.Draft, revision: 1 },
  { createdBy: userId, createdAt: timestamp, updatedAt: timestamp }
);

const bubble = new BubbleDocument(
  bubbleId,
  layerId,
  { bounds: { minX: 0, minY: 0, maxX: 100, maxY: 40 }, outline: null },
  { text: 'Hello', normalizedText: 'hello' },
  { typography: null },
  { ocrId: null, confidence: null },
  { translationId },
  { type: BubbleType.Speech, locked: false, visible: true },
  { createdBy: userId, createdAt: timestamp, updatedAt: timestamp }
);

const layer = new LayerDocument(
  layerId,
  pageId,
  'Text',
  { createdBy: userId, createdAt: timestamp, updatedAt: timestamp },
  { opacity: 1, blendMode: 'normal' },
  { type: LayerType.Bubble, visible: true, locked: false },
  [bubble]
);

const page = new PageDocument(
  pageId,
  projectId,
  0,
  'Page 1',
  { image: null },
  { createdBy: userId, createdAt: timestamp, updatedAt: timestamp },
  { readingOrder: 0, locked: false },
  { workflowState: WorkflowState.Pending, processed: false },
  [layer]
);

const project = new ProjectDocument(
  projectId,
  workspaceId,
  'Project',
  { createdBy: userId, createdAt: timestamp, updatedAt: timestamp },
  { sourceLanguage: 'en', targetLanguage: 'id' },
  { status: ProjectStatus.Active, archived: false },
  [page]
);

const workspace = new WorkspaceDocument(
  workspaceId,
  'Workspace',
  { createdBy: userId, createdAt: timestamp, updatedAt: timestamp },
  [project]
);

const document = new AtlasDocument(
  'document-1' as ID<'atlas-document'>,
  workspace,
  { createdBy: userId, createdAt: timestamp, updatedAt: timestamp },
  { schemaVersion: '1.0.0', documentVersion: '0.1.0', revision: 1 },
  { locale: 'en', timezone: 'UTC' },
  { workflowState: WorkflowState.Pending, readonly: false }
);

bubble.setContent({ text: 'Updated', normalizedText: 'updated' });
translation.setTranslatedText('Halo');

export const documentConstructionResult = {
  document,
  projectCount: document.projectCount,
  pageCount: project.pageCount,
  layerCount: page.layerCount,
  bubbleCount: layer.bubbleCount,
  hasTranslation: bubble.hasTranslation(),
  translatedText: translation.translatedText
};
