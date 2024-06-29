module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  ignorePatterns: [".eslintrc.js", "*.d.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "no-shadow": 0,
    "@typescript-eslint/no-shadow": 0,
    camelcase: 0,
    "@typescript-eslint/camelcase": 0,
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
  },
}
