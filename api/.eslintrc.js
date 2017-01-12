module.exports = {
  "extends": "google",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "max-len": ["error", 120],
    "object-curly-spacing": ["error", "always"],
    "new-cap": 0,
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed", { "requireForBlockBody": true }],
    "array-bracket-spacing": ["error", "always"]
  }
};
