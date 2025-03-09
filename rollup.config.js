import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/fivem/client/main.ts',
    output: {
      file: 'dist/client/bundle.client.js',
      format: 'iife',
      name: 'FiveMClientBundle',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.fivem.client.json' }),
    ],
  },
  {
    input: 'src/fivem/server/main.ts',
    output: {
      file: 'dist/server/bundle.server.js',
      format: 'iife',
      name: 'FiveMServerBundle',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.fivem.server.json' }),
    ],
  },
];
