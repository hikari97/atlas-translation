# Atlas Config API

Atlas Config exposes configuration contracts from `@atlas/atlas-config`.

## Core

- `ConfigValue`
- `ConfigObject`
- `ConfigPath`
- `ConfigMetadata`
- `ConfigDiagnostic`

## Schema and Resolution

- `ConfigSchema`
- `ConfigSchemaField`
- `ConfigSource`
- `ConfigParser`
- `ConfigValidator`
- `ConfigNormalizer`
- `ConfigResolver`

## Operations

- `createConfigSchema`
- `createConfigSchemaField`
- `createSchemaDefaults`
- `createStaticConfigSource`
- `createConfigParser`
- `createConfigValidator`
- `createConfigNormalizer`
- `createConfigResolver`
- `mergeConfigLayers`
- `applyEnvironmentOverlay`
- `redactConfig`
- `redactDiagnostics`
- `serializeConfigSafely`
- `formatConfigDiagnostic`
- `createConfigWatcher`
- `createConfigRuntimeIntegration`
- `createConfigPluginRegistration`

Consumers should import from the package entry point only.
