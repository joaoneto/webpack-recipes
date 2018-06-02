# Webpack Recipes
Modular and pluggable command line for compiling and running webpack builds. Organize in *recipes*, each piece of your webpack build.


Installation:
```shell
npm install -g webpack-recipes
```

### Recipes directory:
Create a directory called *recipes* at the root of your project, so all .js files will be included.
```shell
cd /my/project
mkdir recipes
```
### Recipes
Recipes files must be a .js file and should export *recipe* and *webpackConfig*
```javascript
module.exports.recipe = {
  name: 'test-app',
  version: '0.0.1',
  description: 'Sample App',
  scope: 'development'
};
```

The webpack configuration object must be a function that receives *argv* as a parameter
```javascript
module.exports.webpackConfig = function (argv) {
  return {
    entry: {
      'test-app': './test-app.js'
    },
    ...
  };
};
```

### Examples:
- Simple recipe example *(app)*: https://github.com/joaoneto/webpack-recipes-example
- DevServer recipe *(plugin)*: https://github.com/joaoneto/webpack-recipes-devserver
- ES6 minimum build recipe *(plugin)*: https://github.com/joaoneto/webpack-recipes-es6
