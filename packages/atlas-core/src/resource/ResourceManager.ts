import type { Disposable } from './Disposable';

export class ResourceManager {
  private readonly resources: Disposable[] = [];

  public add(resource: Disposable): void {
    this.resources.push(resource);
  }

  public async dispose(): Promise<void> {
    for (const resource of this.resources.splice(0)) {
      await resource.dispose();
    }
  }
}
