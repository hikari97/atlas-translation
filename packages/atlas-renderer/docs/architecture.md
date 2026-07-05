# Renderer Architecture

Rendering flow:

1. `AtlasDocument`
2. `DocumentRenderEngine`
3. `RenderTree`
4. `RenderDiffEngine`
5. `RenderPatchEngine`

The render tree is derived data and can be discarded or recreated.
