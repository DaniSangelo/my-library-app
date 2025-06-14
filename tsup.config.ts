import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'node18',
  clean: true,
  sourcemap: true,
  dts: false,
  tsconfig: './tsconfig.build.json',
});
