---
id: TASK-0005

title: Implement TranslationOptions

status: Completed

priority: Medium

story_points: 5

sprint: SPRINT-001-foundation

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0005 — Implement TranslationOptions

## Summary

Implement `TranslationOptions`, the immutable configuration object controlling how a Translation Provider executes a translation request.

TranslationOptions defines translation behavior without exposing provider-specific parameters.

---

# Capability

After this task is complete, users and future workflows can customize translation behavior while remaining independent from any specific AI provider.

---

# Goal

Provide a provider-independent configuration model.

---

# Business Value

Different workflows may require different translation behaviors without changing the Translation Engine.

---

# Background

Every AI provider exposes different parameters.

Examples:

- temperature
- reasoning
- glossary
- streaming
- json mode

The Translation Engine should expose only generic options.

Provider-specific mapping is the provider's responsibility.

---

# Scope

## Included

- Translation mode
- Context options
- Glossary options
- Style options
- Quality options

## Excluded

- Prompt Builder
- Provider configuration
- API keys
- Runtime configuration

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── TranslationOptions.ts
        └── index.ts
```

---

# Responsibilities

TranslationOptions is responsible for:

- translation preferences
- quality preferences
- context preferences
- remaining immutable

TranslationOptions is NOT responsible for:

- prompt generation
- provider execution
- workflow
- pipeline

---

# Public API

```ts
interface TranslationOptions {
  readonly sourceLanguage?: string;

  readonly targetLanguage: string;

  readonly preserveFormatting: boolean;

  readonly useGlossary: boolean;

  readonly useTranslationMemory: boolean;
}
```

---

# Dependency

Depends On

- TASK-0002 — TranslationRequest

---

# Risk

Low.

Configuration contract only.

---

# Acceptance Criteria

- [ ] TranslationOptions implemented.
- [ ] Immutable.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Translation Pipeline can configure provider behavior without exposing provider-specific settings.

---

# Next Task

TASK-0006 — TranslationCapabilities
