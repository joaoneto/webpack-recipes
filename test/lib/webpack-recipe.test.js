const sinon = require('sinon');
const { assert } = require('chai');

describe('Webpack Recipes lib/webpack-recipes', function () {
  this.recipeFile = require('../fixtures/recipes/core');

  beforeEach(() => {
    this.webpackRecipes = require('../../lib/webpack-recipes');
  });

  afterEach(() => {
    delete require.cache[require.resolve('../../lib/webpack-recipes')];
  });

  it('should be ok', () => {
    assert.isOk(this.webpackRecipes);
  });

  it('should add webpack config', () => {
    let mergedWebpackConfig;
    const { recipe, webpackConfig } = this.recipeFile;
    const argv = { app: ['./app'] };

    this.webpackRecipes.addWebpackConfig(webpackConfig);
    mergedWebpackConfig = this.webpackRecipes.getWebpackConfig(argv);
    assert.deepInclude(mergedWebpackConfig, { entry: { app: ['./app'] } });
  });

  it('should add and merge webpack config', () => {
    let mergedWebpackConfig;
    const { recipe, webpackConfig } = this.recipeFile;
    const argv = { app: './app' };

    this.webpackRecipes.addWebpackConfig(webpackConfig);
    this.webpackRecipes.addWebpackConfig(() => ({ entry: { vendor: './vendor' } }));
    mergedWebpackConfig = this.webpackRecipes.getWebpackConfig(argv);

    assert.deepInclude(mergedWebpackConfig, { entry: { app: './app', vendor: './vendor' } });
  });

  it('should add/get `after` hook', () => {
    this.webpackRecipes.addHook('after', () => {});
    let hooks = this.webpackRecipes.getHooks('after');

    assert.isArray(hooks);
    assert.lengthOf(hooks, 1);
    assert.isFunction(hooks[0]);
  });
});
