import type { JsonObject } from '@atlas/atlas-types';

export interface IconDescriptor {
  readonly name: string;
  readonly label: string;
  readonly metadata?: JsonObject | undefined;
}

export class IconRegistry {
  private readonly icons = new Map<string, IconDescriptor>();

  public register(icon: IconDescriptor): void {
    this.icons.set(icon.name, icon);
  }

  public get(name: string): IconDescriptor | undefined {
    return this.icons.get(name);
  }

  public list(): readonly IconDescriptor[] {
    return [...this.icons.values()];
  }
}
