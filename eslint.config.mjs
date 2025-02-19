// @ts-check

import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tsEslint.config(
  {
    ignores:
    [
      'logs',
      '**/*.log',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/report.*.json',
      '**/debug.log',
      '**/node_modules/',
      '**/jspm_packages/',
      '**/.DS_Store',
      '**/*.swp',
      '**/dist',
      '**/dist-ssr',
      '**/*.local',
    ],
  },
  eslint.configs.recommended,
  // TODO: when https://github.com/airbnb/javascript/issues/2961 is done, change
  ...compat.config({
    extends: 'airbnb-base',
    env: {
      es2020: true,
      node: true,
    },
    rules: {
      indent: 'off',
      'linebreak-style': 'off',
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'max-len': ['error', {
        code: 160,
        ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"',
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      }],
      'arrow-body-style': 'off',
      'no-shadow': 'off',
      'class-methods-use-this': 'off',
      'no-unused-vars': 'off',
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-use-before-define': ['error', {
        functions: false,
      }],
      'id-length': [2, { exceptions: ['i', 'j'], properties: 'never' }],
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': [0, {
        'packageDir ': './src/',
      }],
      'import/no-unresolved': 'error',
      'import/order': ['error', {
        pathGroups: [
          {
            pattern: 'src/models/**',
            group: 'type',
          }, {
            pattern: 'vue-router/auto**',
            group: 'builtin',
          }, {
            pattern: 'src/models/**',
            group: 'type',
          },
        ],
        groups: [['builtin', 'external'], ['type'], ['internal', 'parent', 'sibling', 'index']],
        'newlines-between': 'always',
      }],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
          moduleDirectory: ['node_modules', 'src/', 'docs/'],
        },
        alias: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'svg'],
          map: [
            ['src', './src'],
            ['test', './test'],
          ],
        },
      },
    },
  }),
  ...tsEslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-vars': [
        process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },
);
