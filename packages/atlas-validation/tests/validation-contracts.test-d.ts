import {
  DefaultValidationBuilder,
  DefaultValidationLifecycle,
  DefaultValidationMetadata,
  createValidation,
  createValidationCapability,
  createValidationContext,
  createValidationContextServices,
  createValidationEngine,
  createValidationExecutor,
  createValidationFactory,
  createValidationProvider,
  createValidationProviderRegistry,
  createValidationRegistry,
  createValidationResolver,
  createValidationResult,
  createValidationRule,
  type ValidationDescriptor,
  type ValidationIssue,
} from '../src';

const capability = createValidationCapability('required', 'Required');
const metadata = new DefaultValidationMetadata('image.required', 'Image Required Validation', '0.1.0', [capability]);
const lifecycle = new DefaultValidationLifecycle();
const context = createValidationContext(
  { imageId: 'image-1' },
  undefined,
  undefined,
  metadata,
  lifecycle,
  {
    validationId: 'image.required',
    inputPath: 'imageId',
    attributes: [],
  },
  createValidationContextServices(),
);

const rule = createValidationRule<typeof context.input>(metadata, lifecycle, async (validationContext) => {
  const issues: ValidationIssue[] = validationContext.input.imageId.length > 0
    ? []
    : [{ path: 'imageId', code: 'required', message: 'Image id is required.', severity: 'error' }];
  return createValidationResult(issues, metadata);
});

const validation = createValidation<typeof context.input>(
  metadata,
  {
    asynchronous: true,
    contextAware: true,
    ruleComposition: true,
  },
  async (validationContext) => rule.validate(validationContext),
);

const descriptor: ValidationDescriptor = {
  id: validation.metadata.id,
  name: validation.metadata.name,
  group: 'images',
  enabled: true,
  attributes: {},
};

const registry = createValidationRegistry();
registry.registerValidation(
  { id: validation.metadata.id, name: validation.metadata.name, value: validation, attributes: {} },
  descriptor,
);
const factory = createValidationFactory(metadata, lifecycle, {
  lazyCreation: true,
  descriptorCreation: true,
}, () => validation);
const resolver = createValidationResolver(registry, factory, metadata, lifecycle);
const executor = createValidationExecutor(metadata, lifecycle);
const engine = createValidationEngine(resolver, executor, metadata, lifecycle);
const builderResult = new DefaultValidationBuilder(metadata, lifecycle)
  .validation(descriptor, validation, [rule])
  .buildResult();
const provider = createValidationProvider(metadata, lifecycle, {
  registration: true,
  resolution: true,
  execution: true,
});
const providers = createValidationProviderRegistry();
providers.register({ id: provider.metadata.id, name: provider.metadata.name, value: provider, attributes: {} });

const result = await engine.run({
  descriptor,
  validationContext: context,
  rules: [rule],
});
const unresolved = await engine.run({
  descriptor: {
    id: 'missing',
    name: 'Missing',
    group: undefined,
    enabled: true,
    attributes: {},
  },
  validationContext: context,
  rules: [],
});

builderResult.definitions[0]?.rules[0]?.metadata.id;
result.valid;
unresolved.valid;
await provider.initialize();
await provider.healthCheck();
await provider.shutdown();
