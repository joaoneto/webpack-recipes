/* eslint-env mocha */
const sinon = require('sinon');
const { assert } = require('chai');

describe('webpack-recipes bin tests', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('should get recipe files', () => {
    assert.isOk(recipes.getRecipesFiles());
  });
});
