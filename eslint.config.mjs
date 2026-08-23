import js from '@eslint/js';

/** ponytail: basic flat config avoiding circular ref bug in eslint-config-next v16 + eslint 9 */
export default [
  js.configs.recommended,
  {
    ignores: ['node_modules', '.next', 'out', '.git'],
  },
];
