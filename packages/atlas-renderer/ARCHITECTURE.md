# Architecture

Atlas Renderer is a pure rendering package.

The engine reads `AtlasDocument` and creates a separate `RenderTree`. Diff and patch operations compare and update render trees only. The document model remains the source of truth.

The package intentionally excludes UI, workspace, app, and CLI dependencies.
