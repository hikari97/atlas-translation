# atlas-command Architecture

`atlas-command` is the single command framework for document mutations.

```text
Command -> Bus -> Dispatcher -> Resolver -> Behaviors -> Handler -> Result
```

## Subsystems

- Command contracts describe executable intentions.
- Registries store command and handler descriptors.
- Resolver maps commands to handler descriptors.
- Dispatcher creates the execution path.
- Pipeline behaviors add validation, history recording, and other cross-cutting concerns.
- Transactions wrap execution scopes.
- History, undo, and redo store references to completed command executions.
- Composite and macro commands group command sequences.

The package does not depend on events or core services.
