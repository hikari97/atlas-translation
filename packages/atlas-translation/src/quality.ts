import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { TranslationRequest, TranslationResult } from './foundation';

export interface GlossaryTerm {
  readonly source: string;
  readonly target: string;
  readonly notes: string | null;
}

export interface Glossary {
  readonly id: ID<'translation-glossary'>;
  readonly terms: readonly GlossaryTerm[];
}

export interface Terminology {
  readonly id: ID<'translation-terminology'>;
  readonly terms: readonly GlossaryTerm[];
  readonly metadata: JsonObject;
}

export interface StyleGuide {
  readonly id: ID<'translation-style-guide'>;
  readonly tone: string;
  readonly rules: readonly string[];
  readonly metadata: JsonObject;
}

export interface TranslationMemoryEntry {
  readonly source: string;
  readonly target: string;
  readonly metadata: JsonObject;
}

export class TranslationMemory {
  private readonly entries = new Map<string, TranslationMemoryEntry>();

  public add(entry: TranslationMemoryEntry): void {
    this.entries.set(entry.source, entry);
  }

  public lookup(source: string): TranslationMemoryEntry | null {
    return this.entries.get(source) ?? null;
  }
}

export interface QualityIssue {
  readonly code: string;
  readonly message: string;
  readonly severity: 'info' | 'warning' | 'error';
}

export interface QualityReport {
  readonly resultId: string;
  readonly confidence: number;
  readonly issues: readonly QualityIssue[];
  readonly checkedAt: Timestamp;
}

export interface TranslationQuality {
  readonly resultId: string;
  readonly report: QualityReport;
  readonly metadata: JsonObject;
}

export class ConsistencyChecker {
  public check(result: TranslationResult, glossary: Glossary | null = null): QualityReport {
    const issues = glossary === null ? [] : glossary.terms
      .filter((term) => result.text.includes(term.source))
      .map((term) => ({ code: 'glossary-source-leak', message: `Source term remains: ${term.source}`, severity: 'warning' as const }));
    return { resultId: result.id, confidence: result.confidence, issues, checkedAt: new Date().toISOString() as Timestamp };
  }
}

export class TranslationValidator {
  public validate(request: TranslationRequest, result: TranslationResult): QualityReport {
    const issues = result.text.trim().length === 0 ? [{ code: 'empty-result', message: 'Translation result is empty.', severity: 'error' as const }] : [];
    const confidence = request.text.trim().length === 0 ? 0 : result.confidence;
    return { resultId: result.id, confidence, issues, checkedAt: new Date().toISOString() as Timestamp };
  }
}

export class TranslationQualityEvaluator {
  public evaluate(report: QualityReport): TranslationQuality {
    return { resultId: report.resultId, report, metadata: {} };
  }
}

export enum ReviewState {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

export interface TranslationReview {
  readonly id: ID<'translation-review'>;
  readonly resultId: string;
  readonly state: ReviewState;
  readonly comments: readonly string[];
}

export interface TranslationApproval {
  readonly id: ID<'translation-approval'>;
  readonly reviewId: ID<'translation-review'>;
  readonly approved: boolean;
  readonly approvedAt: Timestamp | null;
  readonly metadata: JsonObject;
}
