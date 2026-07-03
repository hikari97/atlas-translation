    ---

id: TASK-0254

title: Implement AtlasCloud

status: Ready

priority: Critical

story_points: 55

sprint: SPRINT-026-atlas-platform

epic: EPIC-020

package: atlas-translation

owner: H.Makki

reviewer:

created_at: 2026-07-02

## updated_at: 2026-07-02

# TASK-0254 — Implement AtlasCloud

## Summary

Implement `AtlasCloud`.

AtlasCloud provides the provider-independent abstraction for managing Atlas Platform deployments in cloud environments.

AtlasCloud coordinates projects, environments, deployments, infrastructure providers, and cloud capabilities while remaining independent from any specific cloud vendor.

---

# Capability

After this task is complete, Atlas Translation Platform supports cloud-native deployment through a unified cloud abstraction.

---

# Goal

Provide managed Atlas cloud platform.

---

# Business Value

Supports

- Managed deployments
- Multi-cloud
- Enterprise hosting
- Elastic scaling
- Managed infrastructure
- Future Atlas Cloud Platform

without coupling Atlas to a specific cloud provider.

---

# Background

Atlas Platform can run anywhere.

AtlasCloud provides the managed operational layer responsible for provisioning and operating Atlas deployments.

---

# Scope

## Included

- Cloud abstraction
- Project management
- Environment management
- Deployment management
- Cloud capability discovery

## Excluded

- Vendor SDKs
- Infrastructure provisioning
- Billing
- UI

---

# Deliverables

```text
atlas-translation/

AtlasCloud.ts

AtlasCloudProject.ts

AtlasCloudEnvironment.ts

AtlasDeployment.ts

AtlasCloudMetadata.ts

index.ts
```

---

# Responsibilities

AtlasCloud is responsible for

- managing cloud projects
- managing deployment environments
- exposing cloud capabilities
- coordinating deployments
- remaining provider independent

AtlasCloud is NOT responsible for

- provisioning infrastructure
- vendor SDK integration
- billing
- UI

---

# Architecture

```text
Developer

↓

Atlas Cloud

↓

Atlas SDK

↓

Atlas Platform

↓

Cloud Provider
```

---

# Public API

```ts
interface AtlasCloud {
  projects(): Promise<readonly AtlasCloudProject[]>;

  deploy(deployment: AtlasDeployment): Promise<void>;
}
```

---

# Supported Cloud Services

Projects

- Project Management
- Environment Management
- Deployment History

Deployment

- Deploy
- Rollback
- Version Tracking

Cloud

- Multi-cloud
- Region Awareness
- Environment Isolation

Future

- Serverless Deployment
- Managed Kubernetes
- Auto Scaling
- Cloud Marketplace

---

# Dependency

Depends On

- TASK-0251 — AtlasPlatform
- TASK-0253 — AtlasCLI

---

# Risk

Critical

AtlasCloud becomes the managed cloud abstraction for Atlas Platform deployments.

---

# Files Allowed

```text
atlas-translation/**
```

---

# Files Forbidden

```text
None
```

---

# Acceptance Criteria

- [ ] AtlasCloud implemented.
- [ ] Supports cloud project management.
- [ ] Supports deployment abstraction.
- [ ] Provider independent.
- [ ] TypeScript strict mode passes.

---

# Definition of Done

Atlas Translation Platform supports managed cloud deployments through reusable AtlasCloud abstractions.

---

# AI Constraints

Before implementation

- Do not implement vendor SDKs.
- Do not implement infrastructure provisioning.
- Do not implement billing.
- Do not implement UI.
- Focus only on AtlasCloud abstraction.

---

# References

- README.md
- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md
- TASK_INDEX.md
- TASK-0251-atlas-platform.md
- TASK-0253-atlas-cli.md

---

# Next Task

TASK-0255-atlas-distribution.md
