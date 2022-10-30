/*
 * Severity should be one of the following: 0 = off, 1 = warn, 2 = error
 */

module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
    },
    plugins: ['react', 'jsx-a11y', 'import', 'prettier', '@emotion'],
    extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
    rules: {
        'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        'class-methods-use-this': 'warn',
        'no-console': 'off',
        'no-debugger': 'warn',
        'prettier/prettier': ['error'],
        'react/destructuring-assignment': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
        'react/function-component-definition': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/label-has-associated-control': ['error', { some: ['nesting', 'id'] }],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/no-named-as-default': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
            },
        },
        'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx'],
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
            plugins: ['@typescript-eslint'],
            rules: {
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    {
                        vars: 'all',
                        args: 'after-used',
                        ignoreRestSiblings: false,
                    },
                ],
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': 'error',
                '@typescript-eslint/explicit-member-accessibility': 'off',
                '@typescript-eslint/no-object-literal-type-assertion': 'off',
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': ['error'],
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': ['error'],
                '@typescript-eslint/explicit-function-return-type': 'warn',
                '@typescript-eslint/no-explicit-any': 'warn',
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-useless-constructor': ['error'],
                'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
            },
        },
        {
            files: ['**/*.test.js', '**/*.test.ts', '**/*.test.jsx', '**/*.test.tsx'],
            env: {
                jest: true,
            },
            plugins: ['jest'],
            extends: ['plugin:jest/all'],
        },
    ],
};
