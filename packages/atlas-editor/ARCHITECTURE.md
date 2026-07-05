# Architecture

`@atlas/atlas-editor` follows the Atlas package-first and contract-first architecture.

The editor package is an orchestration boundary:

- It does not render graphics.
- It does not store documents.
- It does not normalize input.
- It does not implement undo or redo.
- It does not load plugins directly.

All state-changing operations are represented as `EditorCommand` instances and applied by `Editor.dispatch`.

```text
Application
  -> Editor
    -> Workspace Manager
    -> Document Manager
    -> Tool Manager
    -> Mode Manager
    -> Session Manager
    -> Integration Context
      -> History
      -> Commands
      -> Input
      -> Plugins
      -> Renderer
      -> Selection
```
