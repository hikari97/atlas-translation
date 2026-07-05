import {
  DefaultControllerLifecycle,
  DefaultControllerMetadata,
  createController,
  createControllerContext,
  createControllerContextServices,
  createControllerExecutor,
  createControllerResult,
} from '../src';

const metadata = new DefaultControllerMetadata('health.show', 'Health Controller', '0.1.0');
const lifecycle = new DefaultControllerLifecycle();
const controller = createController(
  metadata,
  {
    asynchronous: true,
    contextMutation: false,
    responseCreation: true,
  },
  async () => createControllerResult({ healthy: true }, metadata),
);
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
const result = await createControllerExecutor(metadata, lifecycle).execute(controller, context);

console.log({
  completed: result.completed,
  controller: result.execution.controller.metadata.id,
  value: result.result?.value,
});
