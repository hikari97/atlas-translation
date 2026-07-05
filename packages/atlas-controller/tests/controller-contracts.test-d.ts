import {
  DefaultControllerBuilder,
  DefaultControllerLifecycle,
  DefaultControllerMetadata,
  createController,
  createControllerCapability,
  createControllerContext,
  createControllerContextServices,
  createControllerDispatcher,
  createControllerEngine,
  createControllerExecutor,
  createControllerFactory,
  createControllerProvider,
  createControllerProviderRegistry,
  createControllerRegistry,
  createControllerResolver,
  createControllerResult,
  type ControllerDescriptor,
} from '../src';

const capability = createControllerCapability('response', 'Response Creation');
const metadata = new DefaultControllerMetadata('image.show', 'Show Image Controller', '0.1.0', [capability]);
const lifecycle = new DefaultControllerLifecycle();
const context = createControllerContext(
  undefined,
  undefined,
  undefined,
  metadata,
  lifecycle,
  {
    requestId: undefined,
    responseId: undefined,
    controllerId: 'image.show',
    attributes: [],
  },
  createControllerContextServices(),
);

const controller = createController(
  metadata,
  {
    asynchronous: true,
    contextMutation: true,
    responseCreation: true,
  },
  async (controllerContext) => {
    controllerContext.services.set('imageId', 'Image Identifier', 'image-1');
    return createControllerResult({ id: 'image-1' }, metadata);
  },
);

const descriptor: ControllerDescriptor = {
  id: controller.metadata.id,
  name: controller.metadata.name,
  group: 'images',
  enabled: true,
  attributes: {},
};

const registry = createControllerRegistry();
registry.registerController(
  { id: controller.metadata.id, name: controller.metadata.name, value: controller, attributes: {} },
  descriptor,
);

const factory = createControllerFactory(metadata, lifecycle, {
  lazyCreation: true,
  descriptorCreation: true,
}, () => controller);
const resolver = createControllerResolver(registry, factory, metadata, lifecycle);
const executor = createControllerExecutor(metadata, lifecycle);
const dispatcher = createControllerDispatcher(resolver, executor, metadata, lifecycle);
const engine = createControllerEngine(dispatcher, metadata, lifecycle);
const builderResult = new DefaultControllerBuilder(metadata, lifecycle)
  .controller(descriptor, controller)
  .group('api')
  .buildResult();

const provider = createControllerProvider(metadata, lifecycle, {
  registration: true,
  resolution: true,
  execution: true,
});
const providers = createControllerProviderRegistry();
providers.register({ id: provider.metadata.id, name: provider.metadata.name, value: provider, attributes: {} });

const result = await engine.run({
  descriptor,
  controllerContext: context,
});

builderResult.definitions[0]?.controller.metadata.id;
result.context.services.get<string>('imageId');
await provider.initialize();
await provider.healthCheck();
await provider.shutdown();
