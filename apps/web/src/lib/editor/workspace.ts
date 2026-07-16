import type { StatelessTextResult } from '../data/statelessTranslation';

export interface EditorBubble {
  readonly _id: string;
  readonly addFontBorder: boolean;
  readonly confidence: number;
  readonly font: string;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly height: number;
  readonly lineWidth: number;
  readonly originalText: string;
  readonly rotation: number;
  readonly status: 'translated' | 'review' | 'approved';
  readonly strokeColor: string;
  readonly textAlign: 'left' | 'center' | 'right';
  readonly translatedText: string;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

export interface EditorPage {
  readonly _id: string;
  readonly bubbles: readonly EditorBubble[];
  readonly file: File;
  readonly fileName: string;
  readonly image: string;
  readonly inpaintedImageUrl?: string;
  readonly pageNumber: number;
  readonly status: 'pending' | 'processing' | 'translated' | 'failed';
}

export interface EditorWorkspaceState {
  readonly pages: readonly EditorPage[];
}

export interface EditorWorkspaceCommand {
  /** Returns the next immutable editor state. */
  execute: (state: EditorWorkspaceState) => EditorWorkspaceState;
}

export class AddEditorPagesCommand implements EditorWorkspaceCommand {
  public constructor(private readonly pages: readonly EditorPage[]) {}

  public execute(state: EditorWorkspaceState): EditorWorkspaceState {
    return { pages: [...state.pages, ...this.pages] };
  }
}

export class RemoveEditorPageCommand implements EditorWorkspaceCommand {
  public constructor(private readonly pageId: string) {}

  public execute(state: EditorWorkspaceState): EditorWorkspaceState {
    const remainingPages = state.pages.filter((page) => page._id !== this.pageId);

    return {
      pages: remainingPages.map((page, index) => ({
        ...page,
        pageNumber: index + 1,
      })),
    };
  }
}

export class SetPageStatusCommand implements EditorWorkspaceCommand {
  public constructor(
    private readonly pageId: string,
    private readonly status: EditorPage['status'],
  ) {}

  public execute(state: EditorWorkspaceState): EditorWorkspaceState {
    return {
      pages: state.pages.map((page) => (
        page._id === this.pageId ? { ...page, status: this.status } : page
      )),
    };
  }
}

export class ApplyTranslationResultCommand implements EditorWorkspaceCommand {
  public constructor(
    private readonly pageId: string,
    private readonly bubbles: readonly StatelessTextResult[],
    private readonly inpaintedImageUrl: string,
  ) {}

  public execute(state: EditorWorkspaceState): EditorWorkspaceState {
    return {
      pages: state.pages.map((page) => {
        if (page._id !== this.pageId) {
          return page;
        }

        return {
          ...page,
          bubbles: this.bubbles.map(toEditorBubble),
          inpaintedImageUrl: this.inpaintedImageUrl,
          status: 'translated' as const,
        };
      }),
    };
  }
}

export class UpdateEditorBubbleCommand implements EditorWorkspaceCommand {
  public constructor(
    private readonly pageId: string,
    private readonly bubbleId: string,
    private readonly update: Partial<EditorBubble>,
  ) {}

  public execute(state: EditorWorkspaceState): EditorWorkspaceState {
    return {
      pages: state.pages.map((page) => {
        if (page._id !== this.pageId) {
          return page;
        }

        return {
          ...page,
          bubbles: page.bubbles.map((bubble) => (
            bubble._id === this.bubbleId ? { ...bubble, ...this.update } : bubble
          )),
        };
      }),
    };
  }
}

function toEditorBubble(bubble: StatelessTextResult, index: number): EditorBubble {
  const fontSize = Number(bubble.font.match(/(\d+(?:\.\d+)?)px/i)?.[1] || 16);
  const fontFamily = bubble.font.replace(/.*?px\s*/i, '').trim() || 'WildWords';

  return {
    _id: `${index}-${bubble.x}-${bubble.y}`,
    addFontBorder: bubble.addFontBorder,
    confidence: 100,
    font: fontFamily,
    fontColor: bubble.fillColor,
    fontSize,
    height: bubble.height,
    lineWidth: bubble.lineWidth,
    originalText: bubble.originalText || '',
    rotation: bubble.rotation,
    status: 'translated',
    strokeColor: bubble.strokeColor,
    textAlign: bubble.textAlign,
    translatedText: bubble.text || '',
    width: bubble.width,
    x: bubble.x,
    y: bubble.y,
  };
}
