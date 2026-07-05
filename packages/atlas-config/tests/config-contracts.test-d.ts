import {
  applyEnvironmentOverlay,
  configPath,
  createConfigMetadata,
  createConfigNormalizer,
  createConfigParser,
  createConfigPluginRegistration,
  createConfigResolver,
  createConfigRuntimeIntegration,
  createConfigSchema,
  createConfigSchemaField,
  createConfigValidator,
  createConfigWatcher,
  createSchemaDefaults,
  createStaticConfigSource,
  formatConfigDiagnostic,
  getConfigValue,
  mergeConfigLayers,
  redactConfig,
  redactDiagnostics,
  serializeConfigSafely,
  setConfigValue,
  type ConfigChange,
  type ConfigDiagnostic,
  type ConfigObject,
  type ConfigResolveRequest,
  type ConfigSchema,
} from '../src';

const metadata = createConfigMetadata('runtime', 'Runtime config', {});
const apiKeyPath = configPath('provider', 'apiKey');
const enabledPath = configPath('provider', 'enabled');

const schema: ConfigSchema = createConfigSchema([
  createConfigSchemaField({
    path: apiKeyPath,
    type: 'string',
    required: true,
    defaultValue: 'development-key',
    enumValues: [],
    secret: true,
    deprecated: false,
    description: 'Provider API key.',
    validate: undefined,
    metadata,
  }),
  createConfigSchemaField({
    path: enabledPath,
    type: 'boolean',
    required: true,
    defaultValue: true,
    enumValues: [true, false],
    secret: false,
    deprecated: false,
    description: 'Provider enabled flag.',
    validate: undefined,
    metadata,
  }),
], metadata);

const defaults = createSchemaDefaults().defaults(schema);
getConfigValue(defaults, apiKeyPath)?.valueOf();

const source = createStaticConfigSource('memory', 10, {
  provider: {
    apiKey: 'secret-key',
  },
}, metadata);

const parser = createConfigParser(metadata);
const validator = createConfigValidator(metadata);
const normalizer = createConfigNormalizer();
const resolver = createConfigResolver(parser, validator, normalizer, createSchemaDefaults());

const request: ConfigResolveRequest = {
  schema,
  sources: [source],
  environment: { environment: 'test', variables: { ATLAS_ENV: 'test' } },
  overlays: [{
    environment: 'test',
    values: { provider: { enabled: false } },
    metadata,
  }],
  metadata,
};

const result = await resolver.resolve(request);
result.config?.values.provider?.valueOf();
result.diagnostics.length.valueOf();

const failingSource = {
  id: 'failing',
  priority: 20,
  metadata,
  async load(): Promise<ConfigObject> {
    throw new Error('Source unavailable');
  },
};

const failedResult = await resolver.resolve({ ...request, sources: [failingSource] });
failedResult.diagnostics.length.valueOf();

const layered = mergeConfigLayers([
  { name: 'base', priority: 0, values: { provider: { enabled: true } }, metadata },
  { name: 'override', priority: 1, values: { provider: { apiKey: 'override-key' } }, metadata },
], metadata);

const overlaid = applyEnvironmentOverlay(layered.values, request.environment, request.overlays);
const redacted = redactConfig(overlaid, [], schema);
getConfigValue(redacted, apiKeyPath)?.valueOf();

const diagnostic: ConfigDiagnostic = {
  code: 'config.secret.redacted',
  severity: 'warning',
  path: apiKeyPath,
  message: 'secret-key',
  metadata,
};
redactDiagnostics([diagnostic], [apiKeyPath])[0]?.message.toUpperCase();
formatConfigDiagnostic(diagnostic).toUpperCase();
serializeConfigSafely(redacted, schema).toUpperCase();

const objectWithValue: ConfigObject = setConfigValue({}, configPath('feature', 'name'), 'atlas');
getConfigValue(objectWithValue, configPath('feature', 'name'))?.valueOf();

const runtimeIntegration = createConfigRuntimeIntegration('runtime', schema, metadata);
runtimeIntegration.runtimeId.toUpperCase();

const pluginRegistration = createConfigPluginRegistration('plugin.translate', schema, defaults, metadata);
pluginRegistration.pluginId.toUpperCase();

const watcher = createConfigWatcher();
const change: ConfigChange = {
  previous: {},
  next: { provider: { enabled: true } },
  diagnostics: [],
};
const subscription = watcher.subscribe((candidate) => {
  candidate.next.provider?.valueOf();
});
watcher.publish(change);
subscription.unsubscribe();
