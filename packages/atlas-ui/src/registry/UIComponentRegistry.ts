import type { UIComponentDescriptor, UIComponentIdentifier } from '../contracts';

export class UIComponentRegistry {
  private readonly components = new Map<UIComponentIdentifier, UIComponentDescriptor>();

  public register(component: UIComponentDescriptor): void {
    if (this.components.has(component.id)) {
      throw new Error(`UI component is already registered: ${component.id}`);
    }
    this.components.set(component.id, component);
  }

  public get(id: UIComponentIdentifier): UIComponentDescriptor | undefined {
    return this.components.get(id);
  }

  public has(id: UIComponentIdentifier): boolean {
    return this.components.has(id);
  }

  public list(): readonly UIComponentDescriptor[] {
    return [...this.components.values()];
  }

  public clear(): void {
    this.components.clear();
  }
}
