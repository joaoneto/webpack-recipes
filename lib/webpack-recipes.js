const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

let webpackConfig = [];
let hooks = {
  'after': []
};

function addWebpackConfig(webpackConfigFn) {
  webpackConfig.push(webpackConfigFn);
}

function getWebpackConfig(options) {
  return webpackConfig
    .map(webpackConfigFn => webpackConfigFn(options))
    .reduce((prev, next) => webpackMerge(prev, next), {});
}

function addHook(name, fn) {
  hooks[name].push(fn);
}

function getHooks(name) {
  return hooks[name];
}

module.exports = {
  addWebpackConfig,
  getWebpackConfig,
  addHook,
  getHooks,
};
