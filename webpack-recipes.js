#!/usr/bin/env node
const path = require('path');
const async = require('async');
const webpackRecipes = require('./lib/webpack-recipes');
const cli = require('./lib/cli');
const recipes = require('./lib/recipes');

recipes.setRecipesDirs([
  path.resolve(webpackRecipes.webpackRecipesDir, 'recipes'),
  path.resolve(webpackRecipes.rootDir, 'recipes')
]);

async.eachSeries(recipes.getRecipesFiles(), (recipeFile, next) => {
    const { recipe, webpackConfig } = require(recipeFile);
    const { hooks } = recipe;

    // add hooks to run after
    if (hooks && hooks.after) {
      webpackRecipes.addHook('after', hooks.after);
    }

    if (recipe.command) {
      cli.command(recipe.command.command, recipe.command.describe, recipe.command.builder, (argv) => {
        recipe.command.handler(argv);
        webpackRecipes.addWebpackConfig(webpackConfig(argv));
        next();
      });
    } else {
      webpackRecipes.addWebpackConfig(webpackConfig({}));
      next();
    }
  },
  (err) => {
    err && console.error(err);
    const webpackConfig = webpackRecipes.getWebpackConfig();
    webpackRecipes.getHooks('after').map(hook => hook(webpackConfig));
  }
);

const argv = cli
  .default('scope', 'development')
  .help()
  .argv;

console.log('recipes.getRecipesFiles()', recipes.getRecipesFiles());
