const sinon = require('sinon');
const { assert } = require('chai');

describe('Webpack Recipes lib/webpack-recipes', () => {
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
    let webpackConfig;

    this.webpackRecipes.addWebpackConfig({ entry: ['./app'] });
    webpackConfig = this.webpackRecipes.getWebpackConfig();

    assert.deepInclude(webpackConfig, { entry: ['./app'] });
  });

  it('should add and merge webpack config', () => {
    let webpackConfig;

    this.webpackRecipes.addWebpackConfig({ entry: ['./app'] });
    this.webpackRecipes.addWebpackConfig({ entry: ['./vendor'] });
    webpackConfig = this.webpackRecipes.getWebpackConfig();

    assert.deepInclude(webpackConfig, { entry: ['./app', './vendor'] });
  });

  it('should add/get `after` hook', () => {
    let hooks;

    this.webpackRecipes.addHook('after', () => 'this is after hook');
    hooks = this.webpackRecipes.getHooks('after');

    assert.isArray(hooks);
    assert.lengthOf(hooks, 1);
    assert.isFunction(hooks[0]);
  });
});
