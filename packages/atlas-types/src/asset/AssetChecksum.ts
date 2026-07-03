/**
 * Integrity metadata for an asset payload.
 */
export interface AssetChecksum {
  readonly algorithm: 'sha-256' | 'sha-384' | 'sha-512' | 'md5';
  readonly value: string;
}
