import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Bubble { id: string; text: string; x: number; y: number; }

interface EditorState {
  zoom: number;
  activeBubbleId: string | undefined;
  bubbles: Bubble[];
}

const initialState: EditorState = { zoom: 1, activeBubbleId: undefined, bubbles: [] };

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setZoom: (state, action: PayloadAction<number>) => { state.zoom = action.payload; },
    setActiveBubble: (state, action: PayloadAction<string | undefined>) => { state.activeBubbleId = action.payload; },
    updateBubbleText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const b = state.bubbles.find((b) => b.id === action.payload.id);
      if (b) b.text = action.payload.text;
    },
  },
});

export const { setZoom, setActiveBubble, updateBubbleText } = editorSlice.actions;
export default editorSlice.reducer;
