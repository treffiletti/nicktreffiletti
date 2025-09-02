/** Next.js + TS + MDX (no type-aware TS rules) */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:mdx/recommended', 'prettier'],
  settings: {
    // lets @/* resolve (doesn't trigger type-aware linting on its own)
    'import/resolver': { typescript: { project: './tsconfig.json' } },
    // lint fenced code blocks inside MDX files
    'mdx/code-blocks': true,
  },
  overrides: [
    // TS/TSX files
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // NOTE: no "project" key => no type-aware rules
      },
      plugins: ['@typescript-eslint'],
      rules: {
        // SAFE rules that don’t require type info
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        // TURN OFF type-aware rules to avoid parserServices requirement
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/require-await': 'off',
        // (optional) dial down noisy "no-unsafe-*" while you iterate
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
    // MDX files
    {
      files: ['**/*.mdx'],
      parser: 'eslint-mdx',
      extends: ['plugin:mdx/recommended'],
      rules: {
        // Don’t run TS rules on MDX prose/code blocks
        '@typescript-eslint/*': 'off',
        // Commonly noisy in MDX
        'mdx/no-jsx-html-comments': 'off',
        'mdx/no-unused-expressions': 'off',
      },
    },
  ],
};
