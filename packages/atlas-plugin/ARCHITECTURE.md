# Architecture

Atlas Plugin is the extension boundary for Atlas Studio.

Plugins are represented as immutable `PluginDefinition` values. The registry stores definitions, the dependency graph validates and orders them, and the manager executes lifecycle methods through a `PluginContext`.

The package does not load remote code, render UI, install marketplace plugins, or mutate editor state directly.
