import type { ID } from '@atlas/atlas-types';
import type { TranslationContent } from './TranslationContent';
import type { TranslationLanguage } from './TranslationLanguage';
import type { TranslationMetadata } from './TranslationMetadata';
import type { TranslationProvider } from './TranslationProvider';
import type { TranslationReview } from './TranslationReview';
import type { TranslationRevision } from './TranslationRevision';
import type { TranslationState } from './TranslationState';

/**
 * Editable translation document associated with a bubble.
 */
export class TranslationDocument {
  private currentContent: TranslationContent;
  private currentReview: TranslationReview;
  private currentState: TranslationState;
  private readonly revisionEntries: TranslationRevision[];

  public constructor(
    public readonly id: ID<'translation'>,
    public readonly bubbleId: ID<'bubble'>,
    content: TranslationContent,
    public readonly language: TranslationLanguage,
    public readonly provider: TranslationProvider,
    review: TranslationReview,
    state: TranslationState,
    public readonly metadata: TranslationMetadata,
    revisions: readonly TranslationRevision[] = []
  ) {
    this.currentContent = content;
    this.currentReview = review;
    this.currentState = state;
    this.revisionEntries = [...revisions];
  }

  public get content(): TranslationContent {
    return this.currentContent;
  }

  public get originalText(): string {
    return this.currentContent.originalText;
  }

  public get translatedText(): string {
    return this.currentContent.translatedText;
  }

  public get sourceLanguage(): string {
    return this.language.sourceLanguage;
  }

  public get targetLanguage(): string {
    return this.language.targetLanguage;
  }

  public get review(): TranslationReview {
    return this.currentReview;
  }

  public get state(): TranslationState {
    return this.currentState;
  }

  public get revisions(): readonly TranslationRevision[] {
    return [...this.revisionEntries];
  }

  public setTranslatedText(text: string): void {
    this.currentContent = {
      ...this.currentContent,
      translatedText: text
    };
  }

  public markReviewed(review: TranslationReview): void {
    this.currentReview = review;
  }

  public resetReview(review: TranslationReview): void {
    this.currentReview = review;
  }

  public setState(state: TranslationState): void {
    this.currentState = state;
  }

  public addRevision(revision: TranslationRevision): void {
    this.revisionEntries.push(revision);
  }
}
