export interface RendererMetadata {
  readonly displayName: string;
  readonly version: string;
  readonly description?: string | undefined;
  readonly author?: string | undefined;
  readonly keywords?: readonly string[] | undefined;
}
