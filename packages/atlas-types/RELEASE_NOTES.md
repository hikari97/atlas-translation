# Release Notes

## 0.1.0

Initial `atlas-types` foundation release.

### Added

- Foundation contracts: common primitives, JSON values, results, geometry, and shared enums.
- Workspace contracts: workspace, project, and page.
- Editor contracts: editor, layer, bubble, typography, font, selection, and canvas.
- Translation contracts.
- Resource contracts: asset and image.
- Platform contracts: plugin, workflow, history, and export.
- Root and grouped public API entry points.
- Package documentation, declaration tests, and release readiness documents.

### Verification

- `npm run typecheck`
- `npm run build`
- `npx tsc -p tsconfig.test.json`
- `npm ls --omit=dev --json`
- `npm pack --dry-run`
