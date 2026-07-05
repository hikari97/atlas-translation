# atlas-events Architecture

```text
Publisher -> EventBus -> Behaviors -> Subscribers
```

The package owns messaging infrastructure only. It does not use browser APIs, networking, rendering, apps, plugins, command, or core.
