module.exports = {
    root: true,
    extends: ['@kapeta/eslint-config'],
    env: {
        node: true,
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
    },
    parserOptions: {
        project: `${__dirname}/tsconfig.json`,
        tsconfigRootDir: __dirname,
    },
};
