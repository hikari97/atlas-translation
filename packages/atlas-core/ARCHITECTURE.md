# atlas-core Architecture

```text
Application -> RuntimeKernel -> Service Registry -> Modules -> Runtime Services
```

`atlas-core` may depend on `atlas-types`, `atlas-document`, `atlas-command`, and `atlas-events`. It must not depend on apps or plugins.
