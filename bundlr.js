#!/usr/bin/env node
const path = require('path');
const async = require('async');
const bundlr = require('./lib/bundlr');
const cli = require('./lib/cli');
const recipes = require('./lib/recipes');

recipes.setRecipesDirs([
  path.resolve(bundlr.bundlrDir, 'recipes'),
  path.resolve(bundlr.rootDir, 'recipes')
]);

async.eachSeries(recipes.getRecipesFiles(), (recipeFile, next) => {
    const { recipe, webpackConfig } = require(recipeFile);
    if (recipe.command) {
      cli.command(recipe.command.command, recipe.command.describe, recipe.command.builder, (argv) => {
        recipe.command.handler(argv);
        bundlr.addWebpackConfig(webpackConfig(argv));
        next();
      });
    } else {
      bundlr.addWebpackConfig(webpackConfig({}));
      next();
    }
  },
  (err) => {
    err && console.error(err);
    console.log(bundlr.getWebpackConfig());
  }
);

cli
  .default('scope', 'development')
  .help()
  .argv;
