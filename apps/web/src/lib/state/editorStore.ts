import { create } from 'zustand';

interface Bubble {
  readonly id: string;
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface EditorState {
  readonly zoom: number;
  readonly activeBubbleId: string | undefined;
  readonly bubbles: readonly Bubble[];
  readonly setZoom: (zoom: number) => void;
  readonly setActiveBubble: (id: string | undefined) => void;
  readonly updateBubbleText: (id: string, text: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  zoom: 1.0,
  activeBubbleId: undefined,
  bubbles: [],
  setZoom: (zoom) => set({ zoom }),
  setActiveBubble: (id) => set({ activeBubbleId: id }),
  updateBubbleText: (id, text) =>
    set((state: EditorState) => ({
      bubbles: state.bubbles.map((b: Bubble) => (b.id === id ? { ...b, text } : b)),
    })),
}));
