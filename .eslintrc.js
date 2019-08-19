module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['/src'],
      },
    },
  },
  rules: {
    'max-len': ['error', { code: 120 }],

    'no-implicit-coercion': ['warn', {
      boolean: false,
      number: true,
      string: true,
      allow: [],
    }],

    'func-style': ['warn', 'expression'],
    'max-depth': ['error', 3],
    'max-lines': ['error', {
      max: 250,
      skipBlankLines: true,
      skipComments: true,
    }],
    'max-lines-per-function': ['warn', {
      max: 40,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    }],
    'max-params': ['warn', 4],
    'newline-before-return': 'warn',
    'prefer-object-spread': 'warn',

    'require-atomic-updates': 'warn',

    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/exports-last': 'warn',
    'import/no-relative-parent-imports': 'error',

    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-prop-types': ['warn', {
      ignoreCase: true,
      callbacksLast: false,
      requiredFirst: false,
      sortShapeProp: true,
    }],
    'react/jsx-sort-props': ['warn', {
      ignoreCase: true,
      callbacksLast: false,
      shorthandFirst: false,
      shorthandLast: false,
      noSortAlphabetically: false,
      reservedFirst: true,
    }],
    'react/destructuring-assignment': ['off', 'never'],
    'react/no-access-state-in-setstate': 'warn',
    'react/no-array-index-key': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unsafe': 'error',
    'react/jsx-props-no-spreading': 'off',

    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-autofocus': 'warn',
    
    // in order to use decorators in classes
    'lines-between-class-members': 'off',
  },
};
