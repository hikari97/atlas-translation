# Folder Structure

```text
packages/atlas-types/
├── src/
│   ├── common/
│   ├── geometry/
│   ├── enums/
│   ├── workspace/
│   ├── project/
│   ├── page/
│   ├── editor/
│   ├── layer/
│   ├── bubble/
│   ├── typography/
│   ├── font/
│   ├── selection/
│   ├── canvas/
│   ├── translation/
│   ├── asset/
│   ├── image/
│   ├── plugin/
│   ├── workflow/
│   ├── history/
│   ├── export/
│   ├── foundation/
│   ├── resource/
│   ├── platform/
│   └── index.ts
├── dist/
├── docs/
└── tests/
```

Domain folders own their public barrel exports. Group folders collect related domains into stable import paths.
