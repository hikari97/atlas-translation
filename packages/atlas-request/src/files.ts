import type { RequestAttributes, RequestLifecycleRecord } from './shared';

export interface RequestFileMetadata {
  readonly originalFilename: string;
  readonly mimeType: string;
  readonly size: number;
  readonly attributes: RequestAttributes;
}

export interface RequestFile {
  readonly name: string;
  readonly metadata: RequestFileMetadata;
  readonly content: unknown;
}

export interface RequestFileCollectionMetadata {
  readonly attributes: RequestAttributes;
}

export interface RequestFileCollection {
  has(name: string): boolean;
  get(name: string): RequestFile | undefined;
  getAll(name: string): readonly RequestFile[];
  keys(): readonly string[];
  values(): readonly RequestFile[];
}

export interface RequestFileLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RequestFiles extends RequestFileCollection {
  readonly metadata: RequestFileCollectionMetadata;
  readonly lifecycle: RequestFileLifecycle;
}

export class DefaultRequestFiles implements RequestFiles {
  private readonly files = new Map<string, readonly RequestFile[]>();

  public readonly lifecycle: RequestFileLifecycle;

  public constructor(files: readonly RequestFile[] = [], public readonly metadata: RequestFileCollectionMetadata = { attributes: {} }, now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    files.forEach((file) => {
      const existing = this.files.get(file.name) ?? [];
      this.files.set(file.name, [...existing, file]);
    });
  }

  public has(name: string): boolean {
    return this.files.has(name);
  }

  public get(name: string): RequestFile | undefined {
    return this.files.get(name)?.[0];
  }

  public getAll(name: string): readonly RequestFile[] {
    return this.files.get(name) ?? [];
  }

  public keys(): readonly string[] {
    return Array.from(this.files.keys());
  }

  public values(): readonly RequestFile[] {
    return Array.from(this.files.values()).flat();
  }
}
