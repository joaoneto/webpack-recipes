#!/usr/bin/env node
const cli = require('./lib/cli');
const recipes = require('./lib/recipes');

const argv = cli
  .default('recipe-dir', './recipes')
  .argv;

console.log(argv['recipe-dir']);

cli.option('verbose', {
  alias: 'v',
  default: false
});
