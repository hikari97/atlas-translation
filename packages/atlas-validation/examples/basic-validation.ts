import {
  DefaultValidationLifecycle,
  DefaultValidationMetadata,
  createValidationContext,
  createValidationContextServices,
  createValidationExecutor,
  createValidationResult,
  createValidationRule,
} from '../src';

const metadata = new DefaultValidationMetadata('required', 'Required Validation', '0.1.0');
const lifecycle = new DefaultValidationLifecycle();
const context = createValidationContext(
  { title: 'Atlas' },
  undefined,
  undefined,
  metadata,
  lifecycle,
  {
    validationId: 'required',
    inputPath: 'title',
    attributes: [],
  },
  createValidationContextServices(),
);
const rule = createValidationRule<typeof context.input>(metadata, lifecycle, async (validationContext) => {
  const issues = validationContext.input.title.length > 0
    ? []
    : [{ path: 'title', code: 'required', message: 'Title is required.', severity: 'error' as const }];
  return createValidationResult(issues, metadata);
});
const result = await createValidationExecutor(metadata, lifecycle).execute([rule], context);

console.log({
  completed: result.completed,
  valid: result.valid,
  issues: result.issues.length,
});
