# Infrastructure

## Collection

`DocumentCollection<T>` stores documents by identifier, preserves insertion order, and exposes read-only enumeration.

## Serialization

`Serializer` and `Deserializer` define format-independent contracts. No concrete JSON, YAML, binary, or file serializer is implemented here.

## Traversal

`DocumentTraverser` supports depth-first and breadth-first traversal over nodes implementing the traversable node contract.

## Snapshot

`SnapshotFactory` creates immutable snapshot objects from JSON-compatible data.

## Diff

`DocumentDiffer` compares snapshots and returns a deterministic `DocumentDiff`.

## Mutation

`MutationPipeline` runs `DocumentMutation` contracts sequentially without implementing commands or undo/redo.
