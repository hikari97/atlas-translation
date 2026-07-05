import {
  AtlasDocument,
  BubbleDocument,
  LayerDocument,
  PageDocument,
  ProjectDocument,
  WorkspaceDocument,
  type AtlasDocumentMetadata,
  type AtlasDocumentSettings,
  type AtlasDocumentState,
  type AtlasDocumentVersion,
  type BubbleContent,
  type BubbleGeometry,
  type BubbleMetadata,
  type BubbleOCRReference,
  type BubbleState,
  type BubbleTranslationReference,
  type BubbleTypographyReference,
  type LayerMetadata,
  type LayerSettings,
  type LayerState,
  type PageImageReference,
  type PageMetadata,
  type PageSettings,
  type PageState,
  type ProjectMetadata,
  type ProjectSettings,
  type ProjectState,
  type WorkspaceMetadata
} from '@atlas/atlas-document';
import type { ID } from '@atlas/atlas-types';

export function createTestDocument(): AtlasDocument {
  const bubble = new BubbleDocument(
    'bubble-1' as ID<'bubble'>,
    'layer-1' as ID<'layer'>,
    {} as BubbleGeometry,
    {} as BubbleContent,
    {} as BubbleTypographyReference,
    { ocrId: null } as BubbleOCRReference,
    { translationId: null } as BubbleTranslationReference,
    {} as BubbleState,
    {} as BubbleMetadata
  );
  const layer = new LayerDocument(
    'layer-1' as ID<'layer'>,
    'page-1' as ID<'page'>,
    'Layer 1',
    {} as LayerMetadata,
    {} as LayerSettings,
    {} as LayerState,
    [bubble]
  );
  const page = new PageDocument(
    'page-1' as ID<'page'>,
    'project-1' as ID<'project'>,
    0,
    'Page 1',
    {} as PageImageReference,
    {} as PageMetadata,
    {} as PageSettings,
    {} as PageState,
    [layer]
  );
  const project = new ProjectDocument(
    'project-1' as ID<'project'>,
    'workspace-1' as ID<'workspace'>,
    'Project 1',
    {} as ProjectMetadata,
    {} as ProjectSettings,
    {} as ProjectState,
    [page]
  );
  const workspace = new WorkspaceDocument(
    'workspace-1' as ID<'workspace'>,
    'Workspace 1',
    {} as WorkspaceMetadata,
    [project]
  );
  return new AtlasDocument(
    'document-1' as ID<'atlas-document'>,
    workspace,
    {} as AtlasDocumentMetadata,
    {} as AtlasDocumentVersion,
    {} as AtlasDocumentSettings,
    {} as AtlasDocumentState
  );
}
