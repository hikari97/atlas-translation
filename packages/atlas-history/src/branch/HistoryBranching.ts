import type { HistoryBranch, HistoryBranchId, HistoryEntry } from '../model';

export function createHistoryBranch(id: string, name: string, entries: readonly HistoryEntry[] = []): HistoryBranch {
  return { id: id as HistoryBranchId, name, entries: entries.slice() };
}

export interface HistoryNode {
  readonly id: string;
  readonly entry: HistoryEntry;
  readonly parentId: string | null;
}

export interface HistoryGraph {
  readonly nodes: readonly HistoryNode[];
}

export function createHistoryTimeline(branches: readonly HistoryBranch[]): readonly HistoryEntry[] {
  return branches.flatMap((branch) => branch.entries);
}

export function navigateBranch(branches: readonly HistoryBranch[], branchId: HistoryBranchId): HistoryBranch | undefined {
  return branches.find((branch) => branch.id === branchId);
}
