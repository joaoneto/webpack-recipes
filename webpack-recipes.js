#!/usr/bin/env node
const glob = require('glob');
const path = require('path');
const async = require('async');
const webpackRecipes = require('./lib/webpack-recipes');
const cli = require('./lib/cli');
const recipes = require('./lib/recipes');

const rootDir = process.cwd();

recipes.setRecipeDir(path.resolve(rootDir, 'recipes'));

glob.sync(path.resolve(process.cwd(), './node_modules/*-recipe*/recipes')).map(dir => {
  recipes.setRecipeDir(dir);
});

async.eachSeries(recipes.getRecipesFiles(),
  (recipeFile, next) => {
    const { recipe, webpackConfig } = require(recipeFile);
    webpackRecipes.addWebpackConfig(webpackConfig);
    webpackRecipes.addHook('after', recipe);
    next();
  },
  (err) => {
    err && console.error(err);
    const hooks = webpackRecipes.getHooks('after');
    webpackRecipes.getHooks('after').map(recipe => {
      if (recipe.command) {
        cli.command(recipe.command.command, recipe.command.describe, recipe.command.builder, (argv) => {
          recipe.command.handler(argv, webpackRecipes.getWebpackConfig(argv));
        });
      }
    });
  }
);

cli
  .default('scope', 'development')
  .help()
  .argv;
