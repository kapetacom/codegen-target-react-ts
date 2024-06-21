module.exports = {
    extends: ['@kapeta/eslint-config'],
    env: {
        node: true,
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/require-await': 'off',
    },
    parserOptions: {
        project: `${__dirname}/tsconfig.json`,
        tsconfigRootDir: __dirname,
    },
};
