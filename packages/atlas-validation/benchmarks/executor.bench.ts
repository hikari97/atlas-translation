import {
  DefaultValidationLifecycle,
  DefaultValidationMetadata,
  createValidationContext,
  createValidationContextServices,
  createValidationExecutor,
  createValidationResult,
  createValidationRule,
} from '../src';

const iterations = 1000;
const metadata = new DefaultValidationMetadata('benchmark', 'Benchmark Validation', '0.1.0');
const lifecycle = new DefaultValidationLifecycle();
const rule = createValidationRule<{ value: string }>(metadata, lifecycle, async (context) =>
  createValidationResult(context.input.value.length > 0 ? [] : [{ path: 'value', code: 'required', message: 'Value is required.', severity: 'error' }], metadata),
);
const executor = createValidationExecutor(metadata, lifecycle);
const startedAt = performance.now();

for (let index = 0; index < iterations; index += 1) {
  const context = createValidationContext(
    { value: 'ok' },
    undefined,
    undefined,
    metadata,
    lifecycle,
    {
      validationId: 'benchmark',
      inputPath: 'value',
      attributes: [],
    },
    createValidationContextServices(),
  );
  await executor.execute([rule], context);
}

console.log({ iterations, elapsedMs: performance.now() - startedAt });
