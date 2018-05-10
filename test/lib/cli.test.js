const sinon = require('sinon');
const { assert } = require('chai');

describe('Webpack Recipes lib/cli', () => {
  beforeEach(() => {
    this.cli = require('../../lib/cli');
  });

  afterEach(() => {
    delete require.cache[require.resolve('../../lib/cli')];
  });

  it('should cli be ok', () => {
    assert.isOk(this.cli);
  });
});
