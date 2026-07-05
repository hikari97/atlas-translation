// Atlas Database System - Provider-independent database contracts.

// ── TASK-002 Database Core Types ──

export type DatabaseProvider = 'mongodb' | 'postgresql' | 'mysql' | 'sqlite' | 'redis' | 'custom';

export type DatabaseConnectionState = 'disconnected' | 'connecting' | 'connected' | 'disconnecting' | 'error';

export type DatabaseTransactionIsolation = 'read-uncommitted' | 'read-committed' | 'repeatable-read' | 'serializable';

export type DatabaseQueryStatus = 'success' | 'error' | 'timeout';

export type DatabaseMigrationDirection = 'up' | 'down';

export type DatabaseHealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

export type DatabaseErrorCategory = 'connection' | 'query' | 'transaction' | 'migration' | 'configuration' | 'timeout' | 'unknown';

export type DatabaseDiagnosticSeverity = 'info' | 'warning' | 'error';

export interface DatabaseDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly severity: DatabaseDiagnosticSeverity;
  readonly timestamp: Date;
}

// ── TASK-003 Database Connection Config ──

export interface DatabaseConnectionConfig {
  readonly id: string;
  readonly provider: DatabaseProvider;
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string | undefined;
  readonly password: string | undefined;
  readonly maxPoolSize: number;
  readonly connectionTimeout: number;
  readonly idleTimeout: number;
  readonly ssl: boolean;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createDatabaseConnectionConfig = (
  id: string,
  provider: DatabaseProvider,
  host: string,
  port: number,
  database: string,
  options: {
    readonly username?: string;
    readonly password?: string;
    readonly maxPoolSize?: number;
    readonly connectionTimeout?: number;
    readonly idleTimeout?: number;
    readonly ssl?: boolean;
    readonly attributes?: Readonly<Record<string, string>>;
  } = {},
): DatabaseConnectionConfig => ({
  id,
  provider,
  host,
  port,
  database,
  username: options.username,
  password: options.password,
  maxPoolSize: options.maxPoolSize ?? 10,
  connectionTimeout: options.connectionTimeout ?? 30_000,
  idleTimeout: options.idleTimeout ?? 10_000,
  ssl: options.ssl ?? false,
  attributes: options.attributes ?? {},
});

// ── TASK-013 Database Error Model ──

export interface DatabaseError {
  readonly code: string;
  readonly message: string;
  readonly category: DatabaseErrorCategory;
  readonly configId: string | undefined;
  readonly cause: unknown;
}

export const createDatabaseError = (
  code: string,
  message: string,
  category: DatabaseErrorCategory = 'unknown',
  configId: string | undefined = undefined,
  cause: unknown = undefined,
): DatabaseError => ({ code, message, category, configId, cause });

// ── TASK-008 Database Query Result ──

export interface DatabaseQueryResult<TRecord = unknown> {
  readonly status: DatabaseQueryStatus;
  readonly records: readonly TRecord[];
  readonly affectedCount: number;
  readonly duration: number;
  readonly error: DatabaseError | undefined;
}

export const createDatabaseQueryResult = <TRecord = unknown>(
  status: DatabaseQueryStatus,
  records: readonly TRecord[] = [],
  affectedCount = 0,
  duration = 0,
  error: DatabaseError | undefined = undefined,
): DatabaseQueryResult<TRecord> => ({ status, records, affectedCount, duration, error });

// ── TASK-004 Database Client Contract ──

export interface DatabaseClient {
  readonly configId: string;
  readonly state: DatabaseConnectionState;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<TRecord = unknown>(statement: string, parameters?: readonly unknown[]): Promise<DatabaseQueryResult<TRecord>>;
}

export interface DatabaseClientFactory {
  create(config: DatabaseConnectionConfig): DatabaseClient;
}

// ── TASK-005 Database Connection Manager ──

export interface DatabaseConnectionManager {
  register(config: DatabaseConnectionConfig): void;
  unregister(configId: string): void;
  getClient(configId: string): DatabaseClient | undefined;
  connectAll(): Promise<readonly DatabaseError[]>;
  disconnectAll(): Promise<readonly DatabaseError[]>;
  size(): number;
}

export class InMemoryDatabaseConnectionManager implements DatabaseConnectionManager {
  private readonly configs = new Map<string, DatabaseConnectionConfig>();
  private readonly clients = new Map<string, DatabaseClient>();

  public constructor(private readonly factory: DatabaseClientFactory) {}

  public register(config: DatabaseConnectionConfig): void {
    this.configs.set(config.id, config);
    this.clients.set(config.id, this.factory.create(config));
  }

  public unregister(configId: string): void {
    this.configs.delete(configId);
    this.clients.delete(configId);
  }

  public getClient(configId: string): DatabaseClient | undefined {
    return this.clients.get(configId);
  }

  public async connectAll(): Promise<readonly DatabaseError[]> {
    const errors: DatabaseError[] = [];
    for (const [id, client] of this.clients) {
      try {
        await client.connect();
      } catch (cause) {
        errors.push(createDatabaseError('connection.failed', `Failed to connect "${id}".`, 'connection', id, cause));
      }
    }
    return errors;
  }

  public async disconnectAll(): Promise<readonly DatabaseError[]> {
    const errors: DatabaseError[] = [];
    for (const [id, client] of this.clients) {
      try {
        await client.disconnect();
      } catch (cause) {
        errors.push(createDatabaseError('connection.disconnect-failed', `Failed to disconnect "${id}".`, 'connection', id, cause));
      }
    }
    return errors;
  }

  public size(): number {
    return this.clients.size;
  }
}

export const createDatabaseConnectionManager = (factory: DatabaseClientFactory): DatabaseConnectionManager =>
  new InMemoryDatabaseConnectionManager(factory);

// ── TASK-006 Database Transaction Contract ──

export interface DatabaseTransaction {
  readonly configId: string;
  readonly isolation: DatabaseTransactionIsolation;
  readonly active: boolean;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

// ── TASK-007 Database Transaction Runner ──

export interface DatabaseTransactionRunner {
  run<T>(work: (transaction: DatabaseTransaction) => Promise<T>): Promise<DatabaseTransactionResult<T>>;
}

export interface DatabaseTransactionResult<T> {
  readonly committed: boolean;
  readonly value: T | undefined;
  readonly error: DatabaseError | undefined;
}

export const createDatabaseTransactionRunner = (
  createTransaction: () => DatabaseTransaction,
): DatabaseTransactionRunner => ({
  async run<T>(work: (transaction: DatabaseTransaction) => Promise<T>): Promise<DatabaseTransactionResult<T>> {
    const transaction = createTransaction();
    try {
      await transaction.begin();
      const value = await work(transaction);
      await transaction.commit();
      return { committed: true, value, error: undefined };
    } catch (cause) {
      await transaction.rollback();
      return { committed: false, value: undefined, error: createDatabaseError('transaction.failed', 'Transaction failed.', 'transaction', transaction.configId, cause) };
    }
  },
});

// ── TASK-009 Database Repository Primitive ──

export interface DatabaseRepository<TRecord> {
  readonly configId: string;
  readonly collection: string;
  find(filter: unknown): Promise<readonly TRecord[]>;
  findOne(filter: unknown): Promise<TRecord | undefined>;
  insert(record: TRecord): Promise<DatabaseQueryResult<TRecord>>;
  update(filter: unknown, record: Partial<TRecord>): Promise<DatabaseQueryResult<TRecord>>;
  delete(filter: unknown): Promise<DatabaseQueryResult<TRecord>>;
}

// ── TASK-010 Database Migration Model ──

export interface DatabaseMigration {
  readonly id: string;
  readonly version: number;
  readonly description: string;
  readonly direction: DatabaseMigrationDirection;
  readonly statement: string;
}

export const createDatabaseMigration = (
  id: string,
  version: number,
  description: string,
  direction: DatabaseMigrationDirection,
  statement: string,
): DatabaseMigration => ({ id, version, description, direction, statement });

// ── TASK-011 Database Migration Runner ──

export interface DatabaseMigrationResult {
  readonly applied: readonly string[];
  readonly skipped: readonly string[];
  readonly errors: readonly DatabaseError[];
}

export interface DatabaseMigrationRunner {
  run(migrations: readonly DatabaseMigration[]): Promise<DatabaseMigrationResult>;
}

export const createDatabaseMigrationRunner = (
  execute: (migration: DatabaseMigration) => Promise<void>,
): DatabaseMigrationRunner => ({
  async run(migrations: readonly DatabaseMigration[]): Promise<DatabaseMigrationResult> {
    const applied: string[] = [];
    const skipped: string[] = [];
    const errors: DatabaseError[] = [];
    for (const migration of migrations) {
      try {
        await execute(migration);
        applied.push(migration.id);
      } catch (cause) {
        errors.push(createDatabaseError('migration.failed', `Migration "${migration.id}" failed.`, 'migration', undefined, cause));
        skipped.push(migration.id);
      }
    }
    return { applied, skipped, errors };
  },
});

// ── TASK-012 Database Health Check ──

export interface DatabaseHealthCheck {
  readonly configId: string;
  readonly status: DatabaseHealthStatus;
  readonly latency: number;
  readonly message: string | undefined;
  readonly checkedAt: Date;
}

export const createDatabaseHealthCheck = (
  configId: string,
  status: DatabaseHealthStatus,
  latency = 0,
  message: string | undefined = undefined,
  checkedAt: Date = new Date(),
): DatabaseHealthCheck => ({ configId, status, latency, message, checkedAt });

// ── TASK-014 Database Diagnostics ──

export const createDatabaseDiagnostic = (
  code: string,
  message: string,
  severity: DatabaseDiagnosticSeverity = 'info',
  timestamp: Date = new Date(),
): DatabaseDiagnostic => ({ code, message, severity, timestamp });

// ── TASK-015 Database Config Integration ──

export interface DatabaseConfigBinding {
  readonly configId: string;
  readonly configKey: string;
  readonly required: boolean;
}

export const createDatabaseConfigBinding = (
  configId: string,
  configKey: string,
  required = true,
): DatabaseConfigBinding => ({ configId, configKey, required });

// ── TASK-016 Database Runtime Integration ──

export interface DatabaseRuntimeBinding {
  readonly configId: string;
  readonly runtimeId: string;
  readonly autoConnect: boolean;
}

export const createDatabaseRuntimeBinding = (
  configId: string,
  runtimeId: string,
  autoConnect = false,
): DatabaseRuntimeBinding => ({ configId, runtimeId, autoConnect });

// ── TASK-017 Database Test Utilities ──

export const createMockDatabaseClient = (configId: string): DatabaseClient => {
  let state: DatabaseConnectionState = 'disconnected';
  return {
    get configId() { return configId; },
    get state() { return state; },
    async connect() { state = 'connecting'; state = 'connected'; },
    async disconnect() { state = 'disconnecting'; state = 'disconnected'; },
    async query<TRecord = unknown>(): Promise<DatabaseQueryResult<TRecord>> {
      return createDatabaseQueryResult<TRecord>('success');
    },
  };
};
