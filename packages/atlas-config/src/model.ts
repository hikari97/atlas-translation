export type ConfigPrimitive = string | number | boolean | null;
export type ConfigValue = ConfigPrimitive | ConfigArray | ConfigObject;
export interface ConfigArray extends ReadonlyArray<ConfigValue> {}
export interface ConfigObject {
  readonly [key: string]: ConfigValue;
}
export type ConfigKey = string;
export type ConfigPath = readonly ConfigKey[];
export type ConfigScope = 'global' | 'runtime' | 'plugin' | 'workspace' | 'project' | 'environment' | 'custom';
export type ConfigFieldType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';
export type ConfigDiagnosticSeverity = 'info' | 'warning' | 'error';
export type ConfigDiagnosticCode =
  | 'config.parse.invalid-root'
  | 'config.validation.required'
  | 'config.validation.type'
  | 'config.validation.enum'
  | 'config.validation.custom'
  | 'config.resolve.failed'
  | 'config.secret.redacted'
  | 'config.merge.conflict'
  | 'config.watch.updated';

export interface ConfigMetadata {
  readonly scope: ConfigScope;
  readonly description: string | undefined;
  readonly attributes: ConfigObject;
}

export interface ConfigDiagnostic {
  readonly code: ConfigDiagnosticCode;
  readonly severity: ConfigDiagnosticSeverity;
  readonly path: ConfigPath;
  readonly message: string;
  readonly metadata: ConfigMetadata;
}

export interface ConfigResult<TValue> {
  readonly ok: boolean;
  readonly value: TValue | undefined;
  readonly diagnostics: readonly ConfigDiagnostic[];
}

export interface ConfigSchemaField {
  readonly path: ConfigPath;
  readonly type: ConfigFieldType;
  readonly required: boolean;
  readonly defaultValue: ConfigValue | undefined;
  readonly enumValues: readonly ConfigValue[];
  readonly secret: boolean;
  readonly deprecated: boolean;
  readonly description: string | undefined;
  readonly validate: ConfigFieldValidator | undefined;
  readonly metadata: ConfigMetadata;
}

export type ConfigFieldValidator = (value: ConfigValue, field: ConfigSchemaField) => ConfigDiagnostic | undefined;

export interface ConfigSchema {
  readonly fields: readonly ConfigSchemaField[];
  readonly metadata: ConfigMetadata;
}

export interface ConfigDefaults {
  defaults(schema: ConfigSchema): ConfigObject;
}

export interface ConfigSource {
  readonly id: string;
  readonly priority: number;
  readonly metadata: ConfigMetadata;
  load(): Promise<ConfigObject>;
}

export interface ParsedConfig {
  readonly sourceId: string;
  readonly values: ConfigObject;
  readonly diagnostics: readonly ConfigDiagnostic[];
}

export interface ConfigParser {
  parse(source: ConfigSource, raw: unknown): ParsedConfig;
}

export interface ConfigValidationResult {
  readonly valid: boolean;
  readonly diagnostics: readonly ConfigDiagnostic[];
}

export interface ConfigValidator {
  validate(schema: ConfigSchema, values: ConfigObject): ConfigValidationResult;
}

export interface NormalizedConfig {
  readonly values: ConfigObject;
  readonly metadata: ConfigMetadata;
}

export interface ConfigNormalizer {
  normalize(values: ConfigObject, metadata: ConfigMetadata): NormalizedConfig;
}

export interface ConfigMergeLayer {
  readonly name: string;
  readonly priority: number;
  readonly values: ConfigObject;
  readonly metadata: ConfigMetadata;
}

export interface ConfigMergeResult {
  readonly values: ConfigObject;
  readonly diagnostics: readonly ConfigDiagnostic[];
}

export interface ConfigEnvironmentOverlay {
  readonly environment: string;
  readonly values: ConfigObject;
  readonly metadata: ConfigMetadata;
}

export interface ConfigEnvironmentAdapter {
  readonly environment: string;
  readonly variables: Readonly<Record<string, string>>;
}

export interface ConfigRedactionRule {
  readonly path: ConfigPath;
  readonly replacement: string;
}

export interface ConfigResolver {
  resolve(request: ConfigResolveRequest): Promise<ConfigResolveResult>;
}

export interface ConfigResolveRequest {
  readonly schema: ConfigSchema;
  readonly sources: readonly ConfigSource[];
  readonly environment: ConfigEnvironmentAdapter | undefined;
  readonly overlays: readonly ConfigEnvironmentOverlay[];
  readonly metadata: ConfigMetadata;
}

export interface ConfigResolveResult {
  readonly config: NormalizedConfig | undefined;
  readonly diagnostics: readonly ConfigDiagnostic[];
}

export interface ConfigRuntimeIntegration {
  readonly runtimeId: string;
  readonly schema: ConfigSchema;
  readonly metadata: ConfigMetadata;
}

export interface ConfigPluginRegistration {
  readonly pluginId: string;
  readonly schema: ConfigSchema;
  readonly defaults: ConfigObject;
  readonly metadata: ConfigMetadata;
}

interface LoadedConfigSource {
  readonly source: ConfigSource;
  readonly raw: unknown;
  readonly diagnostics: readonly ConfigDiagnostic[];
}

export interface ConfigChange {
  readonly previous: ConfigObject;
  readonly next: ConfigObject;
  readonly diagnostics: readonly ConfigDiagnostic[];
}

export type ConfigChangeListener = (change: ConfigChange) => void;

export interface ConfigWatcher {
  subscribe(listener: ConfigChangeListener): ConfigSubscription;
  publish(change: ConfigChange): void;
}

export interface ConfigSubscription {
  unsubscribe(): void;
}

export const createConfigMetadata = (
  scope: ConfigScope,
  description: string | undefined = undefined,
  attributes: ConfigObject = {},
): ConfigMetadata => ({ scope, description, attributes });

export const createConfigDiagnostic = (
  code: ConfigDiagnosticCode,
  severity: ConfigDiagnosticSeverity,
  path: ConfigPath,
  message: string,
  metadata: ConfigMetadata,
): ConfigDiagnostic => ({ code, severity, path, message, metadata });

export const configPath = (...segments: readonly string[]): ConfigPath => segments;

export const getConfigValue = (values: ConfigObject, path: ConfigPath): ConfigValue | undefined =>
  path.reduce<ConfigValue | undefined>((current, segment) => (isConfigObject(current) ? current[segment] : undefined), values);

export const setConfigValue = (values: ConfigObject, path: ConfigPath, value: ConfigValue): ConfigObject => {
  const [head, ...tail] = path;
  if (head === undefined) {
    return values;
  }
  if (tail.length === 0) {
    return { ...values, [head]: value };
  }
  const current = values[head];
  const nested = isConfigObject(current) ? current : {};
  return { ...values, [head]: setConfigValue(nested, tail, value) };
};

export const isConfigObject = (value: ConfigValue | unknown): value is ConfigObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const createConfigSchema = (fields: readonly ConfigSchemaField[], metadata: ConfigMetadata): ConfigSchema => ({
  fields,
  metadata,
});

export const createConfigSchemaField = (field: ConfigSchemaField): ConfigSchemaField => field;

export const createSchemaDefaults = (): ConfigDefaults => ({
  defaults(schema) {
    return schema.fields.reduce<ConfigObject>(
      (values, field) => (field.defaultValue === undefined ? values : setConfigValue(values, field.path, field.defaultValue)),
      {},
    );
  },
});

export const createStaticConfigSource = (
  id: string,
  priority: number,
  values: ConfigObject,
  metadata: ConfigMetadata,
): ConfigSource => ({
  id,
  priority,
  metadata,
  async load() {
    return values;
  },
});

export const createConfigParser = (metadata: ConfigMetadata): ConfigParser => ({
  parse(source, raw) {
    if (!isConfigObject(raw)) {
      return {
        sourceId: source.id,
        values: {},
        diagnostics: [createConfigDiagnostic('config.parse.invalid-root', 'error', [], 'Config root must be an object.', metadata)],
      };
    }
    return { sourceId: source.id, values: raw, diagnostics: [] };
  },
});

export const createConfigValidator = (metadata: ConfigMetadata): ConfigValidator => ({
  validate(schema, values) {
    const diagnostics = schema.fields.flatMap((field) => validateField(field, values, metadata));
    return { valid: diagnostics.every((diagnostic) => diagnostic.severity !== 'error'), diagnostics };
  },
});

const validateField = (field: ConfigSchemaField, values: ConfigObject, metadata: ConfigMetadata): readonly ConfigDiagnostic[] => {
  const value = getConfigValue(values, field.path);
  const diagnostics: ConfigDiagnostic[] = [];
  if (value === undefined) {
    if (field.required) {
      diagnostics.push(createConfigDiagnostic('config.validation.required', 'error', field.path, 'Required config value is missing.', metadata));
    }
    return diagnostics;
  }
  if (!matchesConfigType(value, field.type)) {
    diagnostics.push(createConfigDiagnostic('config.validation.type', 'error', field.path, `Expected ${field.type} config value.`, metadata));
  }
  if (field.enumValues.length > 0 && !field.enumValues.some((candidate) => configValuesEqual(candidate, value))) {
    diagnostics.push(createConfigDiagnostic('config.validation.enum', 'error', field.path, 'Config value is outside allowed enum values.', metadata));
  }
  const customDiagnostic = field.validate?.(value, field);
  return customDiagnostic === undefined ? diagnostics : [...diagnostics, customDiagnostic];
};

export const matchesConfigType = (value: ConfigValue, type: ConfigFieldType): boolean => {
  if (type === 'array') {
    return Array.isArray(value);
  }
  if (type === 'object') {
    return isConfigObject(value);
  }
  if (type === 'null') {
    return value === null;
  }
  return typeof value === type;
};

export const createConfigNormalizer = (): ConfigNormalizer => ({
  normalize(values, metadata) {
    return { values: sortConfigObject(values), metadata };
  },
});

export const sortConfigObject = (values: ConfigObject): ConfigObject =>
  Object.keys(values)
    .sort()
    .reduce<ConfigObject>((sorted, key) => {
      const value = values[key];
      return value === undefined ? sorted : { ...sorted, [key]: normalizeConfigValue(value) };
    }, {});

const normalizeConfigValue = (value: ConfigValue): ConfigValue => {
  if (Array.isArray(value)) {
    return value.map(normalizeConfigValue);
  }
  if (isConfigObject(value)) {
    return sortConfigObject(value);
  }
  return value;
};

export const mergeConfigLayers = (layers: readonly ConfigMergeLayer[], metadata: ConfigMetadata): ConfigMergeResult => {
  const ordered = [...layers].sort((left, right) => left.priority - right.priority);
  return ordered.reduce<ConfigMergeResult>(
    (result, layer) => ({
      values: deepMergeConfig(result.values, layer.values),
      diagnostics: [...result.diagnostics, ...collectMergeConflicts(result.values, layer.values, [], layer.name, metadata)],
    }),
    { values: {}, diagnostics: [] },
  );
};

const collectMergeConflicts = (
  base: ConfigObject,
  override: ConfigObject,
  path: ConfigPath,
  layerName: string,
  metadata: ConfigMetadata,
): readonly ConfigDiagnostic[] =>
  Object.entries(override).flatMap(([key, value]) => {
    const existing = base[key];
    const nextPath = [...path, key];
    if (existing === undefined) {
      return [];
    }
    if (isConfigObject(existing) && isConfigObject(value)) {
      return collectMergeConflicts(existing, value, nextPath, layerName, metadata);
    }
    return configValuesEqual(existing, value)
      ? []
      : [
          createConfigDiagnostic(
            'config.merge.conflict',
            'warning',
            nextPath,
            `Config value was overridden by layer "${layerName}".`,
            metadata,
          ),
        ];
  });

export const deepMergeConfig = (base: ConfigObject, override: ConfigObject): ConfigObject =>
  Object.entries(override).reduce<ConfigObject>((merged, [key, value]) => {
    const existing = merged[key];
    if (isConfigObject(existing) && isConfigObject(value)) {
      return { ...merged, [key]: deepMergeConfig(existing, value) };
    }
    return { ...merged, [key]: value };
  }, base);

export const applyEnvironmentOverlay = (
  values: ConfigObject,
  environment: ConfigEnvironmentAdapter | undefined,
  overlays: readonly ConfigEnvironmentOverlay[],
): ConfigObject => {
  if (environment === undefined) {
    return values;
  }
  const overlay = overlays.find((candidate) => candidate.environment === environment.environment);
  return overlay === undefined ? values : deepMergeConfig(values, overlay.values);
};

export const redactConfig = (
  values: ConfigObject,
  rules: readonly ConfigRedactionRule[],
  schema: ConfigSchema,
): ConfigObject => {
  const schemaRules = schema.fields
    .filter((field) => field.secret)
    .map<ConfigRedactionRule>((field) => ({ path: field.path, replacement: '[REDACTED]' }));
  return [...schemaRules, ...rules].reduce<ConfigObject>(
    (redacted, rule) => (getConfigValue(redacted, rule.path) === undefined ? redacted : setConfigValue(redacted, rule.path, rule.replacement)),
    values,
  );
};

export const redactDiagnostics = (diagnostics: readonly ConfigDiagnostic[], secretPaths: readonly ConfigPath[]): readonly ConfigDiagnostic[] =>
  diagnostics.map((diagnostic) =>
    secretPaths.some((path) => configPathsEqual(path, diagnostic.path))
      ? { ...diagnostic, message: '[REDACTED]' }
      : diagnostic,
  );

export const serializeConfigSafely = (
  values: ConfigObject,
  schema: ConfigSchema,
  rules: readonly ConfigRedactionRule[] = [],
): string => JSON.stringify(redactConfig(values, rules, schema));

export const formatConfigDiagnostic = (diagnostic: ConfigDiagnostic): string => {
  const path = diagnostic.path.length === 0 ? '<root>' : diagnostic.path.join('.');
  return `${diagnostic.severity.toUpperCase()} ${diagnostic.code} at ${path}: ${diagnostic.message}`;
};

export const createConfigResolver = (
  parser: ConfigParser,
  validator: ConfigValidator,
  normalizer: ConfigNormalizer,
  defaults: ConfigDefaults,
): ConfigResolver => ({
  async resolve(request) {
    const loaded = await Promise.all(request.sources.map((source) => loadConfigSource(source, request.metadata)));
    const parsed = loaded.map(({ source, raw }) => parser.parse(source, raw));
    const layers: ConfigMergeLayer[] = [
      { name: 'defaults', priority: 0, values: defaults.defaults(request.schema), metadata: request.metadata },
      ...parsed.map((entry, index) => ({
        name: entry.sourceId,
        priority: request.sources[index]?.priority ?? index + 1,
        values: entry.values,
        metadata: request.metadata,
      })),
    ];
    const merged = mergeConfigLayers(layers, request.metadata);
    const overlaid = applyEnvironmentOverlay(merged.values, request.environment, request.overlays);
    const validation = validator.validate(request.schema, overlaid);
    const diagnostics = [
      ...loaded.flatMap((entry) => entry.diagnostics),
      ...parsed.flatMap((entry) => entry.diagnostics),
      ...merged.diagnostics,
      ...validation.diagnostics,
    ];
    return {
      config: validation.valid ? normalizer.normalize(overlaid, request.metadata) : undefined,
      diagnostics,
    };
  },
});

const loadConfigSource = async (source: ConfigSource, metadata: ConfigMetadata): Promise<LoadedConfigSource> => {
  try {
    return { source, raw: await source.load(), diagnostics: [] };
  } catch {
    return {
      source,
      raw: {},
      diagnostics: [
        createConfigDiagnostic(
          'config.resolve.failed',
          'error',
          [],
          `Config source "${source.id}" failed to load.`,
          metadata,
        ),
      ],
    };
  }
};

export const createConfigWatcher = (): ConfigWatcher => {
  const listeners = new Set<ConfigChangeListener>();
  return {
    subscribe(listener) {
      listeners.add(listener);
      return {
        unsubscribe() {
          listeners.delete(listener);
        },
      };
    },
    publish(change) {
      listeners.forEach((listener) => listener(change));
    },
  };
};

export const createConfigRuntimeIntegration = (
  runtimeId: string,
  schema: ConfigSchema,
  metadata: ConfigMetadata,
): ConfigRuntimeIntegration => ({ runtimeId, schema, metadata });

export const createConfigPluginRegistration = (
  pluginId: string,
  schema: ConfigSchema,
  defaults: ConfigObject,
  metadata: ConfigMetadata,
): ConfigPluginRegistration => ({ pluginId, schema, defaults, metadata });

export const configValuesEqual = (left: ConfigValue, right: ConfigValue): boolean => JSON.stringify(left) === JSON.stringify(right);

export const configPathsEqual = (left: ConfigPath, right: ConfigPath): boolean =>
  left.length === right.length && left.every((segment, index) => segment === right[index]);
