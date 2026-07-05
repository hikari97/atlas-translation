import type { ID } from '@atlas/atlas-types';
import { Editor } from './Editor';

export class EditorManager {
  private readonly editors = new Map<ID<'editor'>, Editor>();

  public register(editor: Editor): void {
    this.editors.set(editor.id, editor);
  }

  public get(id: ID<'editor'>): Editor | null {
    return this.editors.get(id) ?? null;
  }

  public list(): readonly Editor[] {
    return [...this.editors.values()];
  }
}
