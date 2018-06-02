module.exports.recipe = {
  name: 'core fixture',
  version: '1.0.0',
  description: 'Core recipe fixture',
  command:{
    command: 'example',
    describe: 'example command',
    builder: {
      port: {
        describe: 'port to bind on',
        default: 8080
      }
    },
    handler: (argv, webpackConfig) => {
      return 'this is after hook';
    }
  }
};

module.exports.webpackConfig = function (argv) {
  return {
    entry: {
      app: argv.app
    }
  }
};
