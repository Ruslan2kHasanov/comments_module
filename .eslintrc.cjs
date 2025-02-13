module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        "prettier"
    ],
    plugins: ['react-refresh', '@typescript-eslint', 'react', 'prettier'],
    ignorePatterns: ['build', '.eslintrc.cjs', 'node_modules', 'react-app-env.d.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/button-has-type': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-static-element-interactions': 'warn',
        'react/require-default-props': 'off',
        'import/no-absolute-path': 'off',
        'import/order': 'error',
        "import/prefer-default-export": 'off',
        'import/extensions': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/default-param-last': 'off',
        '@typescript-eslint/naming-convention': 'warn',
        '@typescript-eslint/no-use-before-define': 'warn',
        'no-prototype-builtins': 'warn',
        'arrow-body-style': 'error',
        'react/jsx-curly-brace-presence': 'warn',
        'react/function-component-definition': 'off',
        'react/jsx-no-constructed-context-values': 'off',
        "no-console": ["warn", { allow: ["error"] }],

        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['event'],
            },
        ],
        'prettier/prettier': 'error',
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
}