import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
                sourceType: 'module',
                ecmaVersion: 2021,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
    },
];
