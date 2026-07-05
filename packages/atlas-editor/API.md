# API

## Editor

`Editor` is the root runtime coordinator. It owns immutable runtime state, registries, and subsystem references.

Public lifecycle methods:

- `initialize()`
- `start()`
- `suspend()`
- `resume()`
- `dispose()`

State updates go through `dispatch(command)`.

## Managers

- `WorkspaceManager`
- `DocumentManager`
- `ToolManager`
- `ModeManager`
- `SessionManager`

Each manager owns registration and lookup only. Activation is performed with editor commands.

## Integrations

Integration classes wrap public subsystem APIs with thin orchestration adapters:

- `HistoryIntegration`
- `CommandIntegration`
- `RendererIntegration`
- `InputIntegration`
- `SelectionIntegration`
- `PluginIntegration`

## Performance

`RuntimeMetrics` records runtime measurements and `PerformanceBudget` validates them against deterministic budget rules.
