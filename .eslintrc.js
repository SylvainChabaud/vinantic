module.exports = {
  env: {
    browser: true, // Browser global variables like `window` etc.
    commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
    es6: true, // Enable all ECMAScript 6 features except for modules.
    jest: true, // Jest global variables like `it` etc.
    node: true, // Defines things like process.env when generating through node
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "@babel/eslint-parser", // Uses babel-eslint transforms.
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react"],
  root: true, // For configuration cascading.
  rules: {
    "arrow-body-style": "warn",
    "class-methods-use-this": "off",
    "no-console": "off",
    "semi-spacing": "error",
    "no-multi-spaces": "error",
    "no-trailing-spaces": [2, { skipBlankLines: false }],
    "max-len": "off",
    "space-in-parens": "error",
    "no-useless-catch": "off",
    "indent": ["error", 2],
    "no-unused-vars": "off",
  },
  settings: {
    react: {
      version: "detect", // Detect react version
    },
  },
};
