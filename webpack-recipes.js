#!/usr/bin/env node
const path = require('path');
const async = require('async');
const webpackRecipes = require('./lib/webpack-recipes');
const cli = require('./lib/cli');
const recipes = require('./lib/recipes');

const rootDir = process.cwd();

recipes.setRecipesDirs([
  path.resolve(rootDir, 'recipes')
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

cli
  .default('scope', 'development')
  .help()
  .argv;
