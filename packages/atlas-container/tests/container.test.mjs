import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ContainerAsyncProviderError,
  ContainerCycleError,
  ContainerDuplicateRegistrationError,
  ContainerMissingBindingError,
  applyContainerModules,
  asyncFactoryProvider,
  classProvider,
  createContainer,
  createContainerModule,
  createContainerToken,
  createPluginContainer,
  createRuntimeContainer,
  createTestContainer,
  factoryProvider,
  formatContainerDiagnostic,
  inspectContainer,
  overrideService,
  registerConfigValue,
  tokensEqual,
  valueProvider,
} from '../dist/index.js';

test('creates unique typed tokens with safe labels', () => {
  const left = createContainerToken('logger');
  const right = createContainerToken('logger');

  assert.equal(left.name, 'logger');
  assert.equal(tokensEqual(left, right), false);
});

test('registers and resolves value, class, and factory providers', () => {
  const loggerToken = createContainerToken('logger');
  const serviceToken = createContainerToken('service');
  class Service {
    constructor(logger) {
      this.logger = logger;
    }
  }
  const factoryToken = createContainerToken('factory');
  const container = createContainer();

  container.register(loggerToken, valueProvider({ name: 'logger' }), { lifetime: 'singleton' });
  container.register(serviceToken, classProvider(Service, [loggerToken]));
  container.register(factoryToken, factoryProvider((logger) => ({ logger }), [loggerToken]));

  assert.equal(container.resolve(serviceToken).logger.name, 'logger');
  assert.equal(container.resolve(factoryToken).logger.name, 'logger');
});

test('enforces singleton, transient, and scoped lifetimes', () => {
  const singletonToken = createContainerToken('singleton');
  const transientToken = createContainerToken('transient');
  const scopedToken = createContainerToken('scoped');
  const container = createContainer();

  container.register(singletonToken, factoryProvider(() => ({ created: Date.now() })), { lifetime: 'singleton' });
  container.register(transientToken, factoryProvider(() => ({ created: Symbol('transient') })), { lifetime: 'transient' });
  container.register(scopedToken, factoryProvider(() => ({ created: Symbol('scoped') })), { lifetime: 'scoped' });

  const firstScope = container.createScope('first');
  const secondScope = container.createScope('second');

  assert.equal(container.resolve(singletonToken), firstScope.resolve(singletonToken));
  assert.notEqual(container.resolve(transientToken), container.resolve(transientToken));
  assert.equal(firstScope.resolve(scopedToken), firstScope.resolve(scopedToken));
  assert.notEqual(firstScope.resolve(scopedToken), secondScope.resolve(scopedToken));
});

test('supports child scope overrides without mutating root registrations', () => {
  const token = createContainerToken('value');
  const root = createContainer();
  const scope = root.createScope('child');

  root.registerValue(token, 'root');
  scope.registerValue(token, 'child');

  assert.equal(root.resolve(token), 'root');
  assert.equal(scope.resolve(token), 'child');
});

test('reports duplicate, missing, async sync, and circular dependency errors', async () => {
  const duplicateToken = createContainerToken('duplicate');
  const asyncToken = createContainerToken('async');
  const leftToken = createContainerToken('left');
  const rightToken = createContainerToken('right');
  const container = createContainer();

  container.registerValue(duplicateToken, 'one');
  assert.throws(() => container.registerValue(duplicateToken, 'two'), ContainerDuplicateRegistrationError);
  assert.throws(() => container.resolve(createContainerToken('missing')), ContainerMissingBindingError);

  container.register(asyncToken, asyncFactoryProvider(async () => 'async'));
  assert.throws(() => container.resolve(asyncToken), ContainerAsyncProviderError);
  assert.equal(await container.resolveAsync(asyncToken), 'async');

  container.register(leftToken, factoryProvider((right) => right, [rightToken]));
  container.register(rightToken, factoryProvider((left) => left, [leftToken]));
  assert.throws(() => container.resolve(leftToken), ContainerCycleError);
});

test('composes modules and runtime bootstrap helpers', () => {
  const token = createContainerToken('module-value');
  const module = createContainerModule('module', (container) => {
    container.registerValue(token, 'value');
  });
  const container = applyContainerModules(createContainer(), [module]);
  const runtimeContainer = createRuntimeContainer({ modules: [module] });

  assert.equal(container.resolve(token), 'value');
  assert.equal(runtimeContainer.resolve(token), 'value');
});

test('registers config values through adapter validation', () => {
  const token = createContainerToken('config');
  const container = createContainer();
  const diagnostics = registerConfigValue(container, token, {
    value: { enabled: true },
    validate(value) {
      return value.enabled === true ? [] : ['disabled'];
    },
  });

  assert.deepEqual(diagnostics, []);
  assert.equal(container.resolve(token).enabled, true);
});

test('creates restricted plugin facades with scoped registrations', () => {
  const rootToken = createContainerToken('root');
  const pluginToken = createContainerToken('plugin');
  const root = createContainer();
  const plugin = createPluginContainer(root, 'translate');

  root.registerValue(rootToken, 'root');
  plugin.register(pluginToken, 'plugin');

  assert.equal(plugin.resolve(rootToken), 'root');
  assert.equal(plugin.resolve(pluginToken), 'plugin');
  assert.equal(root.has(pluginToken), false);
});

test('exposes diagnostics snapshots without service values', () => {
  const token = createContainerToken('secret-service');
  const container = createContainer();

  container.registerValue(token, { secret: 'hidden' }, { source: 'test', tags: ['secret'] });
  const snapshot = inspectContainer(container);

  assert.equal(snapshot.registrations[0].token, 'secret-service');
  assert.equal('secret' in snapshot.registrations[0], false);
  assert.equal(formatContainerDiagnostic(new ContainerMissingBindingError(token).diagnostic).includes('secret-service'), true);
});

test('supports isolated test containers and explicit overrides', () => {
  const token = createContainerToken('service');
  const container = createTestContainer();

  container.registerValue(token, 'production');
  overrideService(container, token, 'test');

  assert.equal(container.resolve(token), 'test');
});
