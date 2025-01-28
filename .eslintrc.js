module.exports = {
  plugins: ['@typescript-eslint', 'jest'],
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@next/next/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // Import/Export Rules
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 'off',
    'no-restricted-exports': 'off',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',

    // React Rules
    'react/jsx-curly-brace-presence': 0,
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-prop-types': 'warn',
    'react/no-children-prop': 0,
    'react/no-unstable-nested-components': 'off',
    'react/jsx-key': 'error',
    'react/no-deprecated': 'error',
    'react/no-unescaped-entities': ['warn'],
    'react/jsx-no-bind': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/button-has-type': 'off',
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,
    'react/destructuring-assignment': 0,
    'react/no-access-state-in-setstate': 'error',
    'react/no-this-in-sfc': 'warn',
    'react/prop-types': 'warn',

    // TypeScript Rules
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',

    // JavaScript Style Rules
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-console': 'error',
    'consistent-return': 'error',
    'no-delete-var': 'error',
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-var': 'error',
    'dot-notation': 'warn',
    'prefer-const': 'warn',
    'array-callback-return': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-eval': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-object-spread': 'warn',
    'prefer-destructuring': [
      1,
      {
        object: true,
        array: false,
      },
    ],

    // JSX Accessibility Rules
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',

    // Restricted Syntax Rules
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Comment[regex=/eslint-disable/]',
        message: 'Disabling eslint rules is not allowed in this project.',
      },
    ],
  },
};
