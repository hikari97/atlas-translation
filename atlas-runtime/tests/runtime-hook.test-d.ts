import { createRuntimeHook, type RuntimeHook, type RuntimeHookContext, type RuntimeHookMetadata } from '../src';

const hookMetadata: RuntimeHookMetadata = {
  name: 'Before Runtime Start',
  description: 'Runs before runtime start.',
  attributes: {
    module: 'runtime',
  },
};

const hookContext: RuntimeHookContext = {
  event: undefined,
  attributes: {
    source: 'test',
  },
};

const hook: RuntimeHook = createRuntimeHook('hook-1', 'before.runtime.start', 'normal', hookMetadata, async (context) => {
  context.attributes.source;
});

hook.id.toUpperCase();
hook.type.toUpperCase();
hook.priority.toUpperCase();
hook.metadata.name.toUpperCase();
await hook.execute(hookContext);
