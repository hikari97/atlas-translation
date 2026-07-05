export interface FrontendEnv {
  readonly apiUrl: string;
  readonly defaultLanguage: string;
  readonly enableOcr: boolean;
  readonly enableTranslation: boolean;
  readonly maxUploadSize: number;
}

const getEnvString = (key: string, defaultValue: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] ?? defaultValue;
  }
  return defaultValue;
};

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  if (typeof process !== 'undefined' && process.env) {
    const val = process.env[key];
    if (val === 'true') return true;
    if (val === 'false') return false;
  }
  return defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  if (typeof process !== 'undefined' && process.env) {
    const val = process.env[key];
    if (val !== undefined) {
      const parsed = Number(val);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return defaultValue;
};

export const env: FrontendEnv = {
  apiUrl: getEnvString('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api'),
  defaultLanguage: getEnvString('NEXT_PUBLIC_DEFAULT_LANGUAGE', 'en'),
  enableOcr: getEnvBoolean('NEXT_PUBLIC_ENABLE_OCR', true),
  enableTranslation: getEnvBoolean('NEXT_PUBLIC_ENABLE_TRANSLATION', true),
  maxUploadSize: getEnvNumber('NEXT_PUBLIC_MAX_UPLOAD_SIZE', 10 * 1024 * 1024), // 10MB
};

export const getFrontendEnv = (): FrontendEnv => ({ ...env });
