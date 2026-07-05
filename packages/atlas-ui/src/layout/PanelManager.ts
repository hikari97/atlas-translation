import type { ID } from '@atlas/atlas-types';

export interface UIPanel {
  readonly id: ID<'ui-panel'>;
  readonly title: string;
  readonly visible: boolean;
}

export class PanelManager {
  private readonly panels = new Map<ID<'ui-panel'>, UIPanel>();

  public register(panel: UIPanel): void {
    this.panels.set(panel.id, panel);
  }

  public get(id: ID<'ui-panel'>): UIPanel | undefined {
    return this.panels.get(id);
  }

  public list(): readonly UIPanel[] {
    return [...this.panels.values()];
  }
}
