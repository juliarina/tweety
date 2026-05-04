import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  daStyle,

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];