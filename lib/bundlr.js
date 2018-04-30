const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const rootDir = process.cwd();
const bundlrDir = path.resolve(__dirname, '..');

let webpackConfig = {};

function init() {

}

module.exports = {
  rootDir,
  bundlrDir,
  init,
};
