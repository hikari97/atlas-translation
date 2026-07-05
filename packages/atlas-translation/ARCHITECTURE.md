# Architecture

`@atlas/atlas-translation` is a headless translation engine.

Rules:

- Translation starts from `TranslationItem`.
- Pipeline only knows `PipelineStage`.
- Providers only receive `TranslationRequest` and return `TranslationResult`.
- No AI or OCR provider is hardcoded.
- Batch and scheduler only know translation items and jobs.
- State is represented through immutable objects and snapshots.

```text
Translation Session
  -> Translation Batch
    -> Translation Item
      -> Translation Pipeline
        -> Pipeline Stage
  -> Provider Registry
  -> Workflow
  -> Diagnostics
```
