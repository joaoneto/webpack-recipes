const path = require('path');
const sinon = require('sinon');
const { assert } = require('chai');

const recipeDir = path.resolve(__dirname, '../fixtures');

describe('Webpack Recipes lib/recipes', () => {
  beforeEach(() => {
    this.recipes = require('../../lib/recipes');
  });

  afterEach(() => {
    delete require.cache[require.resolve('../../lib/recipes')];
  });

  it('should be ok', () => {
    assert.isOk(this.recipes);
  });

  it('should set/get recipes dir', () => {
    let recipesDirs;

    this.recipes.setRecipeDir(recipeDir);
    recipesDirs = this.recipes.getRecipesDirs();

    assert.isArray(recipesDirs);
    assert.lengthOf(recipesDirs, 1);
  });

  it('should get recipes files', () => {
    let recipesFiles;

    this.recipes.setRecipeDir(recipeDir);
    recipesFiles = this.recipes.getRecipesFiles();

    assert.isArray(recipesFiles);
    assert.lengthOf(recipesFiles, 2);
  });
});
