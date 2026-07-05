# Document Model

## AtlasDocument

Aggregate root for one Atlas Studio document. It owns a `WorkspaceDocument`, metadata, version, settings, and lifecycle state.

## WorkspaceDocument

Owns projects through `WorkspaceCollection`.

## ProjectDocument

Owns pages through `PageCollection`.

## PageDocument

Owns layers and references the original page image.

## LayerDocument

Owns editable bubble documents.

## BubbleDocument

Represents one editable text region. It owns geometry, content, OCR reference, translation reference, typography reference, and state.

## TranslationDocument

Represents editable translation data, review state, provider metadata, language metadata, and revision history.
