/* eslint-env mocha */
const path = require('path');
const sinon = require('sinon');
const { assert } = require('chai');

const stubProcess = function (argv) {
  sinon.stub(process, 'argv').get(() => argv);
  sinon.stub(process, 'cwd').returns(path.resolve(__dirname, './fixtures'));
};

const restoreProcess = function (argv) {
  process.argv.restore && process.argv.restore();
  process.cwd.restore && process.cwd.restore();
};

const runWebpackRecipesCli = function () {
  require('../webpack-recipes');
  delete require.cache[require.resolve('../webpack-recipes')];
};

describe('Webpack Recipes CLI', () => {
  beforeEach(() => {
    this.recipes = require('../lib/recipes');
    this.webpackRecipes = require('../lib/webpack-recipes');
  });

  afterEach(() => {
    restoreProcess();
    delete require.cache[require.resolve('../lib/recipes')];
    delete require.cache[require.resolve('../lib/webpack-recipes')];
  });

  it('should get recipes files', () => {
    const argv = [
      require.resolve('../webpack-recipes')
    ];

    stubProcess(argv);
    runWebpackRecipesCli();

    const recipesFiles = this.recipes.getRecipesFiles();
    assert.isArray(recipesFiles);
    assert.lengthOf(recipesFiles, 1);
  });

  it('should get recipes dirs', () => {
    const argv = [
      require.resolve('../webpack-recipes')
    ];

    stubProcess(argv);
    runWebpackRecipesCli();

    const recipesDirs = this.recipes.getRecipesDirs();
    assert.isArray(recipesDirs);
    assert.lengthOf(recipesDirs, 1);
  });

  it('should get webpack config', () => {
    const argv = [
      require.resolve('../webpack-recipes')
    ];

    stubProcess(argv);
    runWebpackRecipesCli();

    const webpackConfig = this.webpackRecipes.getWebpackConfig();
    assert.deepInclude(webpackConfig, { entry: { app: './app' } });
  });

  it('should get webpack recipes hooks', () => {
    const argv = [
      require.resolve('../webpack-recipes')
    ];

    stubProcess(argv);
    runWebpackRecipesCli();

    const webpackRecipesHooks = this.webpackRecipes.getHooks('after');
    assert.isArray(webpackRecipesHooks);
    assert.lengthOf(webpackRecipesHooks, 1);
    assert.isFunction(webpackRecipesHooks[0]);
  });

});
