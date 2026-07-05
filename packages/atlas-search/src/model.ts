// Atlas Search System - Provider-independent search contracts.

export type SearchDiagnosticSeverity = 'info' | 'warning' | 'error';
export type SearchFieldType = 'text' | 'keyword' | 'number' | 'boolean' | 'date' | 'geo' | 'nested';
export type SearchQueryOperator = 'match' | 'term' | 'prefix' | 'wildcard' | 'range' | 'exists' | 'fuzzy';
export type SearchSortDirection = 'asc' | 'desc';

export interface SearchDiagnostic { readonly code: string; readonly message: string; readonly severity: SearchDiagnosticSeverity; }

export interface SearchIndexField { readonly name: string; readonly type: SearchFieldType; readonly searchable: boolean; readonly filterable: boolean; readonly sortable: boolean; }
export const createSearchIndexField = (name: string, type: SearchFieldType, options: { searchable?: boolean; filterable?: boolean; sortable?: boolean } = {}): SearchIndexField => ({ name, type, searchable: options.searchable ?? false, filterable: options.filterable ?? false, sortable: options.sortable ?? false });

export interface SearchIndexSchema { readonly name: string; readonly fields: readonly SearchIndexField[]; readonly version: string; }
export const createSearchIndexSchema = (name: string, fields: readonly SearchIndexField[], version = '0.1.0'): SearchIndexSchema => ({ name, fields, version });

export interface SearchDocument { readonly id: string; readonly index: string; readonly fields: Readonly<Record<string, unknown>>; }
export const createSearchDocument = (id: string, index: string, fields: Readonly<Record<string, unknown>>): SearchDocument => ({ id, index, fields });

export interface SearchAnalyzer { tokenize(text: string): readonly string[]; }
export const standardSearchAnalyzer: SearchAnalyzer = { tokenize: (text) => text.toLowerCase().split(/\s+/).filter(t => t.length > 0) };

export interface SearchQueryClause { readonly field: string; readonly operator: SearchQueryOperator; readonly value: unknown; }
export const createSearchQueryClause = (field: string, operator: SearchQueryOperator, value: unknown): SearchQueryClause => ({ field, operator, value });

export interface SearchFilter { readonly clauses: readonly SearchQueryClause[]; readonly combinator: 'and' | 'or'; }
export const createSearchFilter = (clauses: readonly SearchQueryClause[], combinator: 'and' | 'or' = 'and'): SearchFilter => ({ clauses, combinator });

export interface SearchSorting { readonly field: string; readonly direction: SearchSortDirection; }
export interface SearchPagination { readonly limit: number; readonly offset: number; }

export interface SearchQuery {
  readonly index: string;
  readonly text: string | undefined;
  readonly filter: SearchFilter | undefined;
  readonly sorting: readonly SearchSorting[];
  readonly pagination: SearchPagination;
}
export const createSearchQuery = (index: string, options: { text?: string; filter?: SearchFilter; sorting?: readonly SearchSorting[]; limit?: number; offset?: number } = {}): SearchQuery => ({ index, text: options.text, filter: options.filter, sorting: options.sorting ?? [], pagination: { limit: options.limit ?? 20, offset: options.offset ?? 0 } });

export interface SearchFacet { readonly field: string; readonly values: readonly { readonly value: string; readonly count: number }[]; }
export interface SearchRanking { readonly field: string; readonly weight: number; }

export interface SearchResult { readonly documents: readonly SearchDocument[]; readonly total: number; readonly facets: readonly SearchFacet[]; readonly duration: number; }
export const createSearchResult = (documents: readonly SearchDocument[], total: number, facets: readonly SearchFacet[] = [], duration = 0): SearchResult => ({ documents, total, facets, duration });

export interface SearchAdapter { index(document: SearchDocument): Promise<void>; search(query: SearchQuery): Promise<SearchResult>; delete(documentId: string): Promise<void>; }
export class InMemorySearchAdapter implements SearchAdapter {
  private readonly docs = new Map<string, SearchDocument>();
  public async index(document: SearchDocument): Promise<void> { this.docs.set(document.id, document); }
  public async search(query: SearchQuery): Promise<SearchResult> {
    let results = Array.from(this.docs.values()).filter(d => d.index === query.index);
    if (query.text) {
      const tokens = standardSearchAnalyzer.tokenize(query.text);
      results = results.filter(d => tokens.some(t => JSON.stringify(d.fields).toLowerCase().includes(t)));
    }
    const offset = query.pagination.offset;
    const limited = results.slice(offset, offset + query.pagination.limit);
    return createSearchResult(limited, results.length);
  }
  public async delete(documentId: string): Promise<void> { this.docs.delete(documentId); }
}
export const createSearchAdapter = (): SearchAdapter => new InMemorySearchAdapter();

export interface IndexingService { indexOne(document: SearchDocument): Promise<void>; indexBatch(documents: readonly SearchDocument[]): Promise<void>; }
export const createIndexingService = (adapter: SearchAdapter): IndexingService => ({
  indexOne: (doc) => adapter.index(doc),
  indexBatch: async (docs) => { await Promise.all(docs.map(d => adapter.index(d))); },
});

export interface ReindexPlan { readonly sourceIndex: string; readonly targetIndex: string; readonly batchSize: number; readonly status: 'pending' | 'running' | 'completed' | 'failed'; }
export const createReindexPlan = (sourceIndex: string, targetIndex: string, batchSize = 100): ReindexPlan => ({ sourceIndex, targetIndex, batchSize, status: 'pending' });

export interface DatabaseStorageBoundary { readonly index: string; readonly configId: string; }
export const createSearchDatabaseBoundary = (index: string, configId: string): DatabaseStorageBoundary => ({ index, configId });

export interface SearchConfigBinding { readonly configKey: string; readonly required: boolean; }
export const createSearchConfigBinding = (configKey: string, required = true): SearchConfigBinding => ({ configKey, required });

export const createSearchDiagnostic = (code: string, message: string, severity: SearchDiagnosticSeverity = 'info'): SearchDiagnostic => ({ code, message, severity });
