import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workerDirectory = dirname(scriptDirectory);
const virtualEnvironmentPython = process.platform === 'win32'
  ? join(workerDirectory, '.venv', 'Scripts', 'python.exe')
  : join(workerDirectory, '.venv', 'bin', 'python');
const configuredPython = process.env.ATLAS_AI_PYTHON?.trim();
const pythonExecutable = configuredPython || virtualEnvironmentPython;

if (!configuredPython && !existsSync(virtualEnvironmentPython)) {
  console.error([
    'Atlas AI Worker requires its local Python 3.12 virtual environment.',
    '',
    'Create it from the repository root:',
    '  python3.12 -m venv apps/ai-worker/.venv',
    '  apps/ai-worker/.venv/bin/pip install -r apps/ai-worker/requirements.txt',
    '',
    'Alternatively, set ATLAS_AI_PYTHON to a compatible Python executable.',
  ].join('\n'));
  process.exit(1);
}

const child = spawn(pythonExecutable, process.argv.slice(2), {
  cwd: workerDirectory,
  env: process.env,
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(`Unable to start Atlas AI Worker with ${pythonExecutable}: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
