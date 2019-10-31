module.exports = {
  env: {
    jest: true,
    es6: true
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    allowImportExportEverywhere: true
  }
};
