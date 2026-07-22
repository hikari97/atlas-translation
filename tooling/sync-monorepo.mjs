import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const toolingDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = dirname(toolingDirectory);
const packagesDirectory = join(repositoryRoot, 'packages');
const dependencyFields = ['dependencies', 'devDependencies', 'peerDependencies'];
const sharedCompilerOptions = new Set([
  'target',
  'moduleResolution',
  'lib',
  'declaration',
  'declarationMap',
  'sourceMap',
  'strict',
  'noEmitOnError',
  'forceConsistentCasingInFileNames',
  'isolatedModules',
  'skipLibCheck',
  'composite',
]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function toProjectPath(fromDirectory, targetPath) {
  return relative(fromDirectory, targetPath).replaceAll('\\', '/');
}

function getWorkspacePackages() {
  return readdirSync(packagesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(packagesDirectory, entry.name))
    .filter((packageDirectory) => existsSync(join(packageDirectory, 'package.json')))
    .map((packageDirectory) => ({
      directory: packageDirectory,
      manifestPath: join(packageDirectory, 'package.json'),
    }));
}

function getInternalDependencies(manifest, workspaceNames) {
  return dependencyFields
    .flatMap((field) => Object.keys(manifest[field] ?? {}))
    .filter((dependencyName, index, names) => (
      workspaceNames.has(dependencyName) && names.indexOf(dependencyName) === index
    ))
    .sort();
}

function syncManifest(workspace, workspaceNames) {
  const manifest = readJson(workspace.manifestPath);

  for (const field of dependencyFields) {
    const dependencies = manifest[field];
    if (!dependencies) {
      continue;
    }

    for (const dependencyName of Object.keys(dependencies)) {
      if (workspaceNames.has(dependencyName)) {
        dependencies[dependencyName] = 'workspace:*';
      }
    }
  }

  writeJson(workspace.manifestPath, manifest);
  return manifest;
}

function syncTypeScriptProject(workspace, manifest, workspaceByName) {
  const tsconfigPath = join(workspace.directory, 'tsconfig.json');
  if (!existsSync(tsconfigPath)) {
    return;
  }

  const currentConfig = readJson(tsconfigPath);
  const compilerOptions = { ...currentConfig.compilerOptions };

  for (const option of sharedCompilerOptions) {
    delete compilerOptions[option];
  }

  const references = getInternalDependencies(manifest, new Set(workspaceByName.keys()))
    .map((dependencyName) => ({
      path: toProjectPath(
        workspace.directory,
        join(workspaceByName.get(dependencyName).directory, 'tsconfig.build.json'),
      ),
    }));

  writeJson(tsconfigPath, {
    extends: '../../tsconfig.base.json',
    compilerOptions,
    include: currentConfig.include ?? ['src/**/*.ts'],
    exclude: currentConfig.exclude ?? ['dist', 'node_modules'],
  });

  writeJson(join(workspace.directory, 'tsconfig.build.json'), {
    extends: './tsconfig.json',
    compilerOptions: {
      composite: true,
    },
    ...(references.length > 0 ? { references } : {}),
  });
}

const workspaces = getWorkspacePackages();
const workspaceByName = new Map(
  workspaces.map((workspace) => [readJson(workspace.manifestPath).name, workspace]),
);
const manifests = new Map(
  workspaces.map((workspace) => [
    workspace.directory,
    syncManifest(workspace, new Set(workspaceByName.keys())),
  ]),
);

for (const workspace of workspaces) {
  syncTypeScriptProject(workspace, manifests.get(workspace.directory), workspaceByName);
}

writeJson(join(repositoryRoot, 'tsconfig.json'), {
  files: [],
  references: workspaces
    .filter((workspace) => existsSync(join(workspace.directory, 'tsconfig.json')))
    .map((workspace) => ({
      path: toProjectPath(
        repositoryRoot,
        join(workspace.directory, 'tsconfig.build.json'),
      ),
    })),
});

console.log(`Synchronized ${workspaces.length} TypeScript workspaces.`);
