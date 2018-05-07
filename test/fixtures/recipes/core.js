module.exports.recipe = {
  name: 'core fixture',
  version: '1.0.0',
  description: 'Core recipe fixture',
  scope: 'all',
  dependencies: {
  },
  hooks: {
    after: () => {
      return 'hook';
    }
  }
};

module.exports.webpackConfig = function (argv) {
  return {
    entry: {
      app: './app'
    }
  }
};
