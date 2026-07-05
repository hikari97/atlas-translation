import type { ID } from '@atlas/atlas-types';
import type { ProjectDocument } from '../project';
import { WorkspaceCollection } from './WorkspaceCollection';
import type { WorkspaceMetadata } from './WorkspaceMetadata';

/**
 * Workspace document that owns projects.
 */
export class WorkspaceDocument {
  private readonly projectCollection: WorkspaceCollection;

  public constructor(
    public readonly id: ID<'workspace'>,
    public readonly name: string,
    public readonly metadata: WorkspaceMetadata,
    projects: readonly ProjectDocument[] = []
  ) {
    this.projectCollection = new WorkspaceCollection(projects);
  }

  public get projects(): readonly ProjectDocument[] {
    return this.projectCollection.values();
  }

  public get projectCount(): number {
    return this.projectCollection.size;
  }

  public getProject(id: ID<'project'>): ProjectDocument | undefined {
    return this.projectCollection.get(id);
  }

  public hasProject(id: ID<'project'>): boolean {
    return this.projectCollection.has(id);
  }

  public addProject(project: ProjectDocument): void {
    this.projectCollection.add(project);
  }

  public removeProject(id: ID<'project'>): boolean {
    return this.projectCollection.remove(id);
  }

  public clearProjects(): void {
    this.projectCollection.clear();
  }
}
