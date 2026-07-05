# @atlas/atlas-database

Provider-independent database contracts for Atlas Studio.

## Overview

The `atlas-database` package provides database abstraction contracts including connection management, transactions, query results, repositories, migrations, health checks, and error handling.

## Public API

```ts
import { createDatabaseClient, createDatabaseConnectionConfig, createDatabaseTransactionRunner } from '@atlas/atlas-database';
```

## Design Principles

- Provider-independent (no MongoDB, PostgreSQL, or MySQL coupling).
- Framework-independent.
- Immutable contracts.
- TypeScript strict mode.
