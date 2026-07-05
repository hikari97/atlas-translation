import { createRuntimeDiagnostics, type RuntimeDiagnosticCheck, type RuntimeDiagnostics } from '../src';

const diagnosticCheck: RuntimeDiagnosticCheck = {
  id: 'registry-health',
  name: 'Registry Health',
  severity: 'warning',
  metadata: {
    component: 'registry',
  },
  async run() {
    return {
      status: 'healthy',
      severity: 'info',
      message: 'Registry is available.',
      checkedAt: new Date('2026-07-05T00:00:00.000Z'),
      metadata: {},
    };
  },
};

const diagnostics: RuntimeDiagnostics = createRuntimeDiagnostics([diagnosticCheck], {
  scope: 'test',
});

const diagnosticsReport = await diagnostics.run();
diagnosticsReport.status.toUpperCase();
diagnosticsReport.checks[0]?.message.toUpperCase();
diagnosticsReport.generatedAt.toISOString();
