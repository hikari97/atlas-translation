import assert from 'node:assert/strict';
import test from 'node:test';

import {
  configPath,
  createConfigMetadata,
  createConfigNormalizer,
  createConfigParser,
  createConfigResolver,
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
  serializeConfigSafely,
} from '../dist/index.js';

const metadata = createConfigMetadata('runtime', 'Runtime config', {});
const secretPath = configPath('provider', 'apiKey');
const enabledPath = configPath('provider', 'enabled');
const schema = createConfigSchema([
  createConfigSchemaField({
    path: secretPath,
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

const createResolver = () =>
  createConfigResolver(createConfigParser(metadata), createConfigValidator(metadata), createConfigNormalizer(), createSchemaDefaults());

test('resolves defaults, source values, and environment overlays deterministically', async () => {
  const resolver = createResolver();
  const result = await resolver.resolve({
    schema,
    sources: [createStaticConfigSource('memory', 10, { provider: { apiKey: 'secret-key' } }, metadata)],
    environment: { environment: 'test', variables: { ATLAS_ENV: 'test' } },
    overlays: [{ environment: 'test', values: { provider: { enabled: false } }, metadata }],
    metadata,
  });

  assert.equal(result.config !== undefined, true);
  assert.equal(getConfigValue(result.config.values, secretPath), 'secret-key');
  assert.equal(getConfigValue(result.config.values, enabledPath), false);
  assert.equal(result.diagnostics.every((diagnostic) => diagnostic.severity !== 'error'), true);
});

test('reports source failures with deterministic diagnostics', async () => {
  const resolver = createResolver();
  const result = await resolver.resolve({
    schema,
    sources: [{
      id: 'failing',
      priority: 10,
      metadata,
      async load() {
        throw new Error('unavailable');
      },
    }],
    environment: undefined,
    overlays: [],
    metadata,
  });

  assert.equal(result.config !== undefined, true);
  assert.equal(getConfigValue(result.config.values, secretPath), 'development-key');
  assert.equal(result.diagnostics.some((diagnostic) => diagnostic.code === 'config.resolve.failed'), true);
});

test('emits merge conflict diagnostics when later layers override values', () => {
  const merged = mergeConfigLayers([
    { name: 'base', priority: 0, values: { provider: { enabled: true } }, metadata },
    { name: 'workspace', priority: 1, values: { provider: { enabled: false } }, metadata },
  ], metadata);

  assert.equal(getConfigValue(merged.values, enabledPath), false);
  assert.equal(merged.diagnostics[0]?.code, 'config.merge.conflict');
});

test('redacts secret values and safe serialization output', () => {
  const values = { provider: { apiKey: 'secret-key', enabled: true } };
  const redacted = redactConfig(values, [], schema);
  const serialized = serializeConfigSafely(values, schema);

  assert.equal(getConfigValue(redacted, secretPath), '[REDACTED]');
  assert.equal(serialized.includes('secret-key'), false);
  assert.equal(serialized.includes('[REDACTED]'), true);
});

test('formats diagnostics with code, severity, path, and message', () => {
  const diagnostic = {
    code: 'config.validation.required',
    severity: 'error',
    path: secretPath,
    message: 'Required config value is missing.',
    metadata,
  };

  assert.equal(
    formatConfigDiagnostic(diagnostic),
    'ERROR config.validation.required at provider.apiKey: Required config value is missing.',
  );
});

test('publishes in-memory config changes without filesystem watchers', () => {
  const watcher = createConfigWatcher();
  let received = 0;
  const subscription = watcher.subscribe((change) => {
    received += change.next.provider === undefined ? 0 : 1;
  });

  watcher.publish({ previous: {}, next: { provider: { enabled: true } }, diagnostics: [] });
  subscription.unsubscribe();
  watcher.publish({ previous: {}, next: { provider: { enabled: false } }, diagnostics: [] });

  assert.equal(received, 1);
});
