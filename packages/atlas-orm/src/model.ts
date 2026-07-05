// Atlas ORM System - Provider-independent entity contracts.

export type OrmFieldType = 'string' | 'number' | 'boolean' | 'date' | 'uuid' | 'binary' | 'json' | 'virtual';
export type OrmRelationType = 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
export type OrmCascade = 'none' | 'soft' | 'hard';
export type OrmQueryOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like' | 'isNull' | 'isNotNull';
export type OrmSortDirection = 'asc' | 'desc';
export type OrmDiagnosticSeverity = 'info' | 'warning' | 'error';

export interface OrmDiagnostic { readonly code: string; readonly message: string; readonly severity: OrmDiagnosticSeverity; }

export interface OrmFieldDefinition {
  readonly name: string;
  readonly type: OrmFieldType;
  readonly nullable: boolean;
  readonly unique: boolean;
  readonly defaultValue: unknown;
  readonly columnName: string | undefined;
}
export const createOrmField = (name: string, type: OrmFieldType, options: { nullable?: boolean; unique?: boolean; defaultValue?: unknown; columnName?: string } = {}): OrmFieldDefinition => ({ name, type, nullable: options.nullable ?? false, unique: options.unique ?? false, defaultValue: options.defaultValue, columnName: options.columnName });

export interface OrmRelationDefinition {
  readonly name: string;
  readonly type: OrmRelationType;
  readonly target: string;
  readonly cascade: OrmCascade;
  readonly nullable: boolean;
}
export const createOrmRelation = (name: string, type: OrmRelationType, target: string, cascade: OrmCascade = 'none', nullable = false): OrmRelationDefinition => ({ name, type, target, cascade, nullable });

export interface OrmEntityMetadata {
  readonly name: string;
  readonly tableName: string;
  readonly fields: readonly OrmFieldDefinition[];
  readonly relations: readonly OrmRelationDefinition[];
}
export const createOrmEntityMetadata = (name: string, tableName: string, fields: readonly OrmFieldDefinition[], relations: readonly OrmRelationDefinition[] = []): OrmEntityMetadata => ({ name, tableName, fields, relations });

export interface OrmModelSchema {
  readonly entities: readonly OrmEntityMetadata[];
  readonly version: string;
}
export const createOrmModelSchema = (entities: readonly OrmEntityMetadata[], version = '0.1.0'): OrmModelSchema => ({ entities, version });

export interface OrmFilterCondition { readonly field: string; readonly operator: OrmQueryOperator; readonly value: unknown; }
export const createOrmFilter = (field: string, operator: OrmQueryOperator, value: unknown): OrmFilterCondition => ({ field, operator, value });

export interface OrmProjection { readonly fields: readonly string[]; readonly exclude: readonly string[]; }
export interface OrmSorting { readonly field: string; readonly direction: OrmSortDirection; }
export interface OrmPagination { readonly limit: number; readonly offset: number; }

export interface OrmQueryDescriptor {
  readonly entity: string;
  readonly filters: readonly OrmFilterCondition[];
  readonly sorting: readonly OrmSorting[];
  readonly pagination: OrmPagination | undefined;
  readonly projection: OrmProjection | undefined;
}
export const createOrmQueryDescriptor = (entity: string, options: { filters?: readonly OrmFilterCondition[]; sorting?: readonly OrmSorting[]; pagination?: OrmPagination; projection?: OrmProjection } = {}): OrmQueryDescriptor => ({ entity, filters: options.filters ?? [], sorting: options.sorting ?? [], pagination: options.pagination, projection: options.projection });

export interface OrmQueryResult<TRecord = unknown> { readonly records: readonly TRecord[]; readonly total: number; }
export interface OrmRepository<TRecord> {
  readonly entity: string;
  find(query: OrmQueryDescriptor): Promise<OrmQueryResult<TRecord>>;
  findOne(query: OrmQueryDescriptor): Promise<TRecord | undefined>;
  insert(record: TRecord): Promise<TRecord>;
  update(id: string, patch: Partial<TRecord>): Promise<TRecord>;
  delete(id: string): Promise<void>;
}

export interface OrmUnitOfWork {
  readonly pending: readonly { readonly operation: 'insert' | 'update' | 'delete'; readonly entity: string; readonly record: unknown }[];
  insert<TRecord>(entity: string, record: TRecord): void;
  update<TRecord>(entity: string, id: string, patch: Partial<TRecord>): void;
  delete(entity: string, id: string): void;
  commit(): Promise<readonly OrmDiagnostic[]>;
  rollback(): void;
}
export class InMemoryOrmUnitOfWork implements OrmUnitOfWork {
  private readonly pendingValue: { operation: 'insert' | 'update' | 'delete'; entity: string; record: unknown; id?: string }[] = [];
  public get pending(): readonly { readonly operation: 'insert' | 'update' | 'delete'; readonly entity: string; readonly record: unknown }[] { return this.pendingValue; }
  public insert<TRecord>(entity: string, record: TRecord): void { this.pendingValue.push({ operation: 'insert', entity, record }); }
  public update<TRecord>(entity: string, id: string, patch: Partial<TRecord>): void { this.pendingValue.push({ operation: 'update', entity, record: patch, id }); }
  public delete(entity: string, id: string): void { this.pendingValue.push({ operation: 'delete', entity, record: undefined, id }); }
  public async commit(): Promise<readonly OrmDiagnostic[]> { this.pendingValue.length = 0; return []; }
  public rollback(): void { this.pendingValue.length = 0; }
}
export const createOrmUnitOfWork = (): OrmUnitOfWork => new InMemoryOrmUnitOfWork();

export interface OrmEntityMapper<TRecord> { toRecord(row: unknown): TRecord; toRow(record: TRecord): unknown; }

export interface OrmSerializationResult { readonly data: string; readonly format: 'json' | 'yaml'; }
export const serializeOrmSchema = (schema: OrmModelSchema): OrmSerializationResult => ({ data: JSON.stringify(schema), format: 'json' });

export interface OrmDatabaseBinding { readonly entity: string; readonly configId: string; }
export const createOrmDatabaseBinding = (entity: string, configId: string): OrmDatabaseBinding => ({ entity, configId });

export const createOrmDiagnostic = (code: string, message: string, severity: OrmDiagnosticSeverity = 'info'): OrmDiagnostic => ({ code, message, severity });

export const createMockOrmRepository = <TRecord extends { id: string }>(entity: string, store = new Map<string, TRecord>()): OrmRepository<TRecord> => ({
  entity,
  async find(_query: OrmQueryDescriptor) { return { records: Array.from(store.values()), total: store.size }; },
  async findOne() { return Array.from(store.values())[0]; },
  async insert(record: TRecord) { store.set(record.id, record); return record; },
  async update(id: string, patch: Partial<TRecord>) { const r = store.get(id); if (!r) throw new Error('not found'); const updated = { ...r, ...patch } as TRecord; store.set(id, updated); return updated; },
  async delete(id: string) { store.delete(id); },
});
