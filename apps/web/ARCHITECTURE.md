# Atlas Web App Architecture

Establish the frontend application architecture for Atlas Studio web client.

## Folder Structure

The frontend application `apps/web` is structured as follows:

```text
apps/web/
├── src/
│   ├── components/    # Reusable shared UI components (States, ErrorBoundary)
│   ├── features/      # Feature-specific components and state
│   ├── hooks/         # Shared react hooks
│   ├── lib/           # Utility integrations (env configurations)
│   ├── pages/         # Next.js Pages router endpoints (dashboard, projects, editor, settings, auth)
│   ├── styles/        # Global stylesheet overrides
│   └── theme.ts       # Chakra UI theme configuration
├── tests/             # Package-local smoke & routing tests
├── ARCHITECTURE.md    # Architecture documentation
└── package.json       # App manifest and scripts
```

## Chakra UI Integration

We compose Chakra UI v2 for clean layout layouts.
- Root theme configuration is exported from `src/theme.ts`.
- `ChakraProvider` wraps the application in `src/pages/_app.tsx`.
- Supports theme mode switches out of the box.

## Canvas & Konva Rendering

Konva relies on DOM and canvas rendering APIs.
- Next.js server-side rendering (SSR) fails to compile Konva natively.
- Components utilizing `react-konva` must be loaded dynamically using Next.js `dynamic()` with `{ ssr: false }`.

## Testing

Testing is kept simple and offline-compatible:
- Uses Node.js builtin `--test` runner.
- Excluded from heavy bundler transpilation to maintain speed.
- Commands: `npm run test` and `npm run typecheck`.
