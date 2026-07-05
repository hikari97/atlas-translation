import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  external: [
    '@atlas/atlas-types',
    '@atlas/atlas-document',
    '@atlas/atlas-command',
    '@atlas/atlas-events',
    '@atlas/atlas-core',
    '@atlas/atlas-plugin',
    '@atlas/atlas-renderer',
    'react',
    '@chakra-ui/react'
  ]
});
