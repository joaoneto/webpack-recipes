const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const rootDir = process.cwd();
const bundlrDir = path.resolve(__dirname, '..');

let webpackConfig = {};
let hooks = {
  'after': []
};

function addWebpackConfig(config) {
  webpackConfig = webpackMerge(webpackConfig, config);
}

function getWebpackConfig() {
  return webpackConfig;
}

function addHook(name, fn) {
  hooks[name].push(fn);
}

function getHooks(name) {
  return hooks[name];
}

module.exports = {
  rootDir,
  bundlrDir,
  addWebpackConfig,
  getWebpackConfig,
  addHook,
  getHooks,
};
