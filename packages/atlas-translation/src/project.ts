import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { TranslationSession } from './batch';

export interface ProjectSettings {
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly metadata: JsonObject;
}

export interface ProjectResource {
  readonly id: ID<'translation-project-resource'>;
  readonly kind: string;
  readonly locator: string;
  readonly metadata: JsonObject;
}

export interface ProjectAssets {
  readonly resources: readonly ProjectResource[];
}

export enum ProjectLifecycle {
  Created = 'created',
  Active = 'active',
  Archived = 'archived'
}

export interface TranslationProject {
  readonly id: ID<'translation-project'>;
  readonly name: string;
  readonly settings: ProjectSettings;
  readonly assets: ProjectAssets;
  readonly sessions: readonly TranslationSession[];
  readonly lifecycle: ProjectLifecycle;
  readonly metadata: JsonObject;
}

export interface ProjectSession {
  readonly projectId: ID<'translation-project'>;
  readonly session: TranslationSession;
}

export interface ProjectHistory {
  readonly projectId: ID<'translation-project'>;
  readonly entries: readonly JsonObject[];
}

export interface ProjectTemplate {
  readonly id: ID<'translation-project-template'>;
  readonly settings: ProjectSettings;
  readonly resources: readonly ProjectResource[];
}

export interface ProjectEvent {
  readonly type: string;
  readonly projectId: ID<'translation-project'>;
  readonly metadata: JsonObject;
  readonly occurredAt: Timestamp;
}

export class ProjectValidator {
  public validate(project: TranslationProject): readonly string[] {
    return project.name.trim().length === 0 ? ['Project name is required.'] : [];
  }
}
