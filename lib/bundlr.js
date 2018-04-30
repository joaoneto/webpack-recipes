const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const rootDir = process.cwd();
const bundlrDir = path.resolve(__dirname, '..');

let webpackConfig = {};

function addWebpackConfig(config) {
  webpackConfig = webpackMerge(webpackConfig, config);
}

function getWebpackConfig() {
  return webpackConfig;
}

module.exports = {
  rootDir,
  bundlrDir,
  addWebpackConfig,
  getWebpackConfig,
};
