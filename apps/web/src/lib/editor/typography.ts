export type BubbleTextAlign = 'left' | 'center' | 'right';

export interface BubbleTypographySettings {
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontColor: string;
  readonly textAlign: BubbleTextAlign;
}

export const BUBBLE_FONT_SIZE_MIN = 8;
export const BUBBLE_FONT_SIZE_MAX = 72;

export const BUBBLE_FONT_FAMILIES = [
  'Manga Standard',
  'WildWords',
  'Komika Axis',
  'Avenir Next',
  'Segoe UI',
] as const;

export const BUBBLE_TEXT_ALIGNMENTS: readonly BubbleTextAlign[] = ['left', 'center', 'right'];

export const DEFAULT_BUBBLE_TYPOGRAPHY: BubbleTypographySettings = {
  fontFamily: 'Manga Standard',
  fontSize: 16,
  fontColor: '#20252b',
  textAlign: 'center',
};

export function clampBubbleFontSize(fontSize: number): number {
  if (Number.isNaN(fontSize)) {
    return DEFAULT_BUBBLE_TYPOGRAPHY.fontSize;
  }

  return Math.min(BUBBLE_FONT_SIZE_MAX, Math.max(BUBBLE_FONT_SIZE_MIN, Math.round(fontSize)));
}

export function isBubbleTextAlign(value: string): value is BubbleTextAlign {
  return BUBBLE_TEXT_ALIGNMENTS.includes(value as BubbleTextAlign);
}
