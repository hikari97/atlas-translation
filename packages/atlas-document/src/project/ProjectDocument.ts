import type { ID } from '@atlas/atlas-types';
import type { PageDocument } from '../page';
import { PageCollection } from './PageCollection';
import type { ProjectMetadata } from './ProjectMetadata';
import type { ProjectSettings } from './ProjectSettings';
import type { ProjectState } from './ProjectState';

/**
 * Translation project document that owns pages.
 */
export class ProjectDocument {
  private readonly pageCollection: PageCollection;

  public constructor(
    public readonly id: ID<'project'>,
    public readonly workspaceId: ID<'workspace'>,
    public readonly name: string,
    public readonly metadata: ProjectMetadata,
    public readonly settings: ProjectSettings,
    public readonly state: ProjectState,
    pages: readonly PageDocument[] = []
  ) {
    this.pageCollection = new PageCollection(pages);
  }

  public get pages(): readonly PageDocument[] {
    return this.pageCollection.values();
  }

  public get pageCount(): number {
    return this.pageCollection.size;
  }

  public getPage(id: ID<'page'>): PageDocument | undefined {
    return this.pageCollection.get(id);
  }

  public hasPage(id: ID<'page'>): boolean {
    return this.pageCollection.has(id);
  }

  public addPage(page: PageDocument): void {
    this.pageCollection.add(page);
  }

  public removePage(id: ID<'page'>): boolean {
    return this.pageCollection.remove(id);
  }

  public clearPages(): void {
    this.pageCollection.clear();
  }
}
