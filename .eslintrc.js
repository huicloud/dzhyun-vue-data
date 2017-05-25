module.exports = {
  "extends": ["vue", "airbnb"],
  "parser": "babel-eslint",
  "globals" : {
    window: true,
  },
  "plugins": [
    "html",
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules" : {
    "padded-blocks": 0,
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
    // "no-multi-assign": 0
    // "global-require": 0,
    // "indent": [0, "tab"], // 去掉tab约定,IDE会有问题
    // "func-names": 0,
    // "new-cap": ["error", { "capIsNew": false }],
    // "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    // "no-param-reassign": ["error", { "props": false }]

    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", "vue"] }],
    "react/react-in-jsx-scope": 0,
    "react/no-unknown-property": [1, { "ignore": ["class"] }],
    "jsx-quotes": [2, "prefer-double"],
    "no-unused-vars": [2, { "vars": "all", "args": "none" }],
    "semi": [1, "always"],
    "comma-dangle": [1, "always-multiline"]
  },
};
