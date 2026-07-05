# atlas-types Architecture

`atlas-types` defines shared contracts for Atlas Studio. It is intentionally passive: the package describes data shapes and shared enum values, but never owns business logic, state transitions, rendering, persistence, command execution, or AI provider implementation.

## Position

`atlas-types` sits below all other Atlas packages. Downstream packages consume these contracts to keep documents, commands, APIs, editor state, plugins, and AI workflows aligned.

## Layers

- Foundation: branded identifiers, JSON-safe values, result types, geometry, and shared enums.
- Workspace: workspace, project, and page contracts.
- Editor: editor state, layers, bubbles, typography, fonts, selections, and canvas metadata.
- Translation: translation content, reviews, providers, history, and references.
- Resource: assets and images.
- Platform: plugins, workflows, history, and exports.

## Boundaries

Domain files use `interface` and `type` declarations only. Runtime behavior belongs in higher-level packages. If a future model needs behavior, the behavior should be implemented outside `atlas-types` and depend on these contracts.

## Public API

The root entry point exports all public contracts. Grouped subpaths are provided for clearer dependency boundaries:

- `@atlas/atlas-types/foundation`
- `@atlas/atlas-types/workspace`
- `@atlas/atlas-types/editor`
- `@atlas/atlas-types/translation`
- `@atlas/atlas-types/resource`
- `@atlas/atlas-types/platform`

Subpaths resolve to the generated package declaration bundle and maintain stable import paths for consumers.
