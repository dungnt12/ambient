// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettier = require('eslint-config-prettier');
const ds = require('./eslint');

module.exports = defineConfig([
  expoConfig,
  prettier,
  {
    ignores: ['dist/*', '.expo/*', 'node_modules/*', 'ios/*', 'android/*', 'eslint/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { ds },
    rules: {
      'ds/no-hardcoded-design-values': 'error',
      'ds/no-raw-color-literal': 'error',
      'ds/no-raw-jsx-text': 'error',
      'ds/max-use-state': ['error', { max: 4 }],
      'ds/max-component-lines': ['error', { max: 200 }],
      'ds/no-sync-state-effect': 'warn',
      'ds/icons-lucide-only': 'error',
      'ds/no-inline-card-pattern': 'error',
    },
  },
  {
    // Showcase is a gallery/demo surface — needs arbitrary swatch sizes and
    // labels. Keep icons-lucide-only + raw-color-literal on for safety.
    files: ['src/showcase/**/*.{ts,tsx}'],
    rules: {
      'ds/no-hardcoded-design-values': 'off',
      'ds/no-raw-jsx-text': 'off',
    },
  },
]);
