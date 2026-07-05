# atlas-document Architecture

`atlas-document` is the Document Object Model foundation for Atlas Studio. It depends only on `@atlas/atlas-types`.

## Hierarchy

```text
AtlasDocument
└── WorkspaceDocument
    └── ProjectDocument
        └── PageDocument
            └── LayerDocument
                └── BubbleDocument
                    └── TranslationDocument reference
```

## Principles

- `AtlasDocument` is the aggregate root.
- Child documents are owned through encapsulated collections.
- Public arrays are read-only snapshots of internal collections.
- Documents do not render, persist, dispatch events, or execute commands.
- Infrastructure frameworks are generic and reusable.

## Infrastructure

- Collection: ordered lookup and read-only enumeration.
- Serialization: format-agnostic serializer/deserializer contracts.
- Traversal: depth-first and breadth-first tree traversal.
- Snapshot: immutable JSON-compatible state capture.
- Diff: deterministic snapshot comparison.
- Mutation: standardized mutation contracts and pipeline execution.

## Boundaries

The package must not depend on `atlas-command`, `atlas-events`, `atlas-core`, apps, or plugins.
