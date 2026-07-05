# Plugin Architecture

The plugin system is built around immutable plugin definitions.

The flow is:

1. Build or discover plugin definitions.
2. Register definitions in `DefaultPluginRegistry`.
3. Validate dependencies through `PluginDependencyGraph`.
4. Execute lifecycle methods through `DefaultPluginManager`.
5. Expose runtime capabilities through `PluginContext`.
