/** Opinionated, Next.js + TS + MDX */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals', // Next.js recommended
    'plugin:mdx/recommended', // sensible MDX rules
    'prettier', // turn off rules that fight Prettier
  ],
  settings: {
    // make @/* imports resolve correctly
    'import/resolver': { typescript: { project: './tsconfig.json' } },
    // lint fenced code blocks inside .mdx
    'mdx/code-blocks': true,
  },
  overrides: [
    // Typescript files
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
      },
    },
    // MDX files
    {
      files: ['**/*.mdx'],
      // the mdx parser so JSX-in-Markdown is parsed correctly
      parser: 'eslint-mdx',
      rules: {
        // MDX tends to trip on JSX comments and “unused expression” in prose—relax them
        'mdx/no-jsx-html-comments': 'off',
        'mdx/no-unused-expressions': 'off',
      },
    },
  ],
};
