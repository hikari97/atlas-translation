# Testing

`atlas-document` uses strict TypeScript validation and package builds as its primary QA layer.

## Commands

```bash
npm run typecheck
npm run build
npm run test:types
```

## Test Files

- `document.test.ts`: document hierarchy construction.
- `collection.test.ts`: collection lookup and enumeration.
- `traversal.test.ts`: traversal strategy wiring.
- `serialization.test.ts`: serializer/deserializer contracts.
- `snapshot.test.ts`: snapshot creation.
- `diff.test.ts`: snapshot diff contract.
- `mutation.test.ts`: mutation pipeline contract.
- `public-api.test.ts`: root and subpath exports.
- `integration.test.ts`: cross-package type compatibility.
