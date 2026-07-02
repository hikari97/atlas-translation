---
id: TASK-0034

title: Implement ProviderConfiguration

status: Ready

priority: High

story_points: 8

sprint: SPRINT-004-provider-layer

epic: EPIC-014

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

updated_at: 2026-07-02
---

# TASK-0034 — Implement ProviderConfiguration

## Summary

Implement `ProviderConfiguration`.

ProviderConfiguration represents the immutable runtime configuration used by a TranslationProvider.

Configuration is provider-specific but exposed through a common contract.

The Translation Engine reads configuration but never modifies it.

---

# Capability

After this task is complete, Atlas Studio can configure multiple TranslationProviders independently without modifying provider implementations.

---

# Goal

Provide a standardized configuration model for Translation Providers.

---

# Business Value

Users can configure different providers independently.

Examples:

- OpenAI
- Gemini
- Claude
- Ollama
- OpenRouter

Each provider maintains its own configuration while sharing the same contract.

---

# Background

Every provider exposes different configuration.

Examples:

OpenAI

- API Key
- Base URL
- Model
- Temperature

Gemini

- API Key
- Model

Ollama

- Endpoint
- Model

The Translation Engine should not know provider-specific configuration details.

---

# Scope

## Included

- Provider configuration contract
- Immutable configuration
- Configuration validation contract
- Configuration metadata

## Excluded

- Configuration UI
- Secure credential storage
- API execution
- Provider registration
- Provider selection

---

# Deliverables

```text
packages/
└── atlas-translation/
    └── src/
        ├── ProviderConfiguration.ts
        ├── ProviderConfigurationSchema.ts
        └── index.ts
```

---

# Responsibilities

ProviderConfiguration is responsible for:

- exposing provider settings
- representing immutable configuration
- exposing configuration schema

ProviderConfiguration is NOT responsible for:

- storing secrets securely
- validating API connectivity
- executing providers
- selecting providers

---

# Architecture

```text
ProviderConfiguration

↓

TranslationProvider

↓

TranslationRequest

↓

TranslationResult
```

---

# Configuration Flow

```text
Load Configuration

↓

Validate Configuration

↓

Create Provider

↓

Translation Ready
```

---

# Public API

```ts
interface ProviderConfiguration {
  readonly providerId: string;

  readonly values: Readonly<Record<string, unknown>>;
}
```

```ts
interface ProviderConfigurationSchema {
  readonly providerId: string;

  readonly fields: readonly ConfigurationField[];
}
```

---

# Configuration Examples

OpenAI

```text
model
apiKey
baseUrl
temperature
maxTokens
```

Gemini

```text
model
apiKey
temperature
```

Ollama

```text
endpoint
model
keepAlive
```

---

# Dependency

Depends On

- TASK-0004 — TranslationProvider
- TASK-0026 — ProviderRegistry

---

# Risk

Medium

Poor configuration design may reduce extensibility for future providers.

---

# Files Allowed

```text
packages/atlas-translation/src/**
```

---

# Files Forbidden

```text
packages/atlas-editor/**
packages/atlas-renderer/**
packages/atlas-plugin/**
apps/**
```

---

# Acceptance Criteria

- [ ] ProviderConfiguration implemented.
- [ ] Immutable.
- [ ] Supports provider-specific fields.
- [ ] Provider independent.
- [ ] Public export available.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Every TranslationProvider can expose and consume configuration using a common ProviderConfiguration contract.

---

# AI Constraints

Before implementation:

- Do not implement configuration UI.
- Do not implement secure secret storage.
- Do not connect to external providers.
- Focus only on the configuration contract.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0004-translation-provider.md
- TASK-0026-provider-registry.md

---

# Sprint Completion

After Sprint 4 is completed, Atlas Studio is capable of:

✓ Registering Translation Providers

✓ Resolving Translation Providers

✓ Extending translation using Middleware

✓ Building provider-independent prompts

✓ Caching translation results

✓ Resolving translation context

✓ Automatically selecting fallback providers

✓ Collecting provider metrics

✓ Configuring providers through a unified contract

The Provider Layer is now complete.

---

# Next Task

TASK-0035-translation-memory.md
