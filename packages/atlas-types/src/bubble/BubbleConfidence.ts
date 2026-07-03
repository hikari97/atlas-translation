/**
 * Confidence scores associated with detected and generated bubble data.
 */
export interface BubbleConfidence {
  readonly detection: number;
  readonly ocr?: number;
  readonly translation?: number;
  readonly review?: number;
}
