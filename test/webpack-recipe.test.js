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
    this.webpackRecipes.webpackRecipesDir = path.resolve(__dirname, './fixtures');
  });

  afterEach(() => {
    restoreProcess();
  });

  it('should get recipe files', () => {
    const argv = [
      require.resolve('../webpack-recipes')
    ];

    stubProcess(argv);
    runWebpackRecipesCli();

    console.log('getRecipesFiles', this.recipes.getRecipesFiles());

    assert.isOk(this.recipes.getRecipesFiles());
  });
});
