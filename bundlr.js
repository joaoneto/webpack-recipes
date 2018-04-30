#!/usr/bin/env node
const path = require('path');
const bundlr = require('./lib/bundlr');
const cli = require('./lib/cli');
const recipes = require('./lib/recipes');

const argv = cli
  // .usage('Usage: $0 <command> [options]')
  .default('recipes-dir', './recipes')
  .default('scope', 'development')
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .demandCommand()
  .help()
  .argv;

recipes.setRecipesDirs([
  path.resolve(bundlr.bundlrDir, 'recipes'),
  path.resolve(bundlr.rootDir, argv['recipes-dir'])
]);

recipes.getRecipesFiles().forEach((recipeFile) => {
  const { recipe, webpackConfig } = require(recipeFile);
  if (recipe.command) {
    cli.command(recipe.command);
  }
  // bundlr.addWebpackConfig(webpackConfig);
});

cli
  .demandCommand()
  .argv;
