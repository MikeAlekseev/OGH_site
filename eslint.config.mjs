import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
    {
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            // Enforce spaces inside curly braces for objects, imports, and exports
            'object-curly-spacing': ['error', 'always'],
            // Enforce single quotes for JS/TS; allow double quotes only in JSX attributes
            'quotes': ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
            'jsx-quotes': ['error', 'prefer-double'],
            'padding-line-between-statements': [
                'error',
                // Вставлять пробел после блока переменных
                { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
                { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] },
                // Вставлять пробел перед return
                { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
                // Вставлять пробел перед break
                { 'blankLine': 'always', 'prev': '*', 'next': 'break' },
            ],
            'semi': ['error', 'never'],
            'react-hooks/refs': 'off',
        },
    },
])

export default eslintConfig
