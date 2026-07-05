import { createRuntimeError, createRuntimeErrorHandler, type RuntimeError, type RuntimeErrorHandler } from '../src';

const runtimeError: RuntimeError = createRuntimeError(
  'error-1',
  'pipeline',
  'high',
  'Pipeline execution failed.',
  true,
  {
    component: 'pipeline',
    operation: 'execute',
    correlationId: 'correlation-1',
    attributes: {},
  },
  new Date('2026-07-05T00:00:00.000Z'),
  {
    source: 'test',
  },
);

const handler: RuntimeErrorHandler = createRuntimeErrorHandler(
  {
    name: 'test-handler',
  },
  async (error) => ({
    handled: true,
    recoverable: error.recoverable,
    hints: [{ action: 'retry', description: 'Retry the pipeline once dependencies are healthy.', automatic: false }],
    metadata: {
      category: error.category,
    },
  }),
);

const handlingResult = await handler.handle(runtimeError);
handlingResult.handled.valueOf();
handlingResult.hints[0]?.action.toUpperCase();
