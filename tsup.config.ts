import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['lib/index.ts'],
    format: ['cjs', 'esm'],
    dts: false, // Generate types separately with tsc
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    external: ['react', 'react-dom'],
    outDir: 'dist',
    target: 'es2017',
    esbuildOptions(options: any) {
        options.banner = {
            js: '"use client";',
        };
    },
});
