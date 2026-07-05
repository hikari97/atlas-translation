import type { ID, JsonObject, Nullable } from '../common';

/**
 * Entity or collection targeted by an export.
 */
export interface ExportTarget {
  readonly id: ID;
  readonly type: string;
  readonly name: Nullable<string>;
  readonly options?: JsonObject;
}
