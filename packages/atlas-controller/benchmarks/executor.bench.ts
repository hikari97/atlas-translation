import {
  DefaultControllerLifecycle,
  DefaultControllerMetadata,
  createController,
  createControllerContext,
  createControllerContextServices,
  createControllerExecutor,
  createControllerResult,
} from '../src';

const iterations = 1000;
const metadata = new DefaultControllerMetadata('benchmark', 'Benchmark Controller', '0.1.0');
const lifecycle = new DefaultControllerLifecycle();
const controller = createController(
  metadata,
  {
    asynchronous: true,
    contextMutation: true,
    responseCreation: true,
  },
  async (context) => {
    context.services.set('benchmark', 'Benchmark Marker', true);
    return createControllerResult(true, metadata);
  },
);
const executor = createControllerExecutor(metadata, lifecycle);
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  const context = createControllerContext(
    undefined,
    undefined,
    undefined,
    metadata,
    lifecycle,
    {
      requestId: undefined,
      responseId: undefined,
      controllerId: controller.metadata.id,
      attributes: [],
    },
    createControllerContextServices(),
  );
  await executor.execute(controller, context);
}

console.log({ iterations, elapsedMs: performance.now() - startedAt });
