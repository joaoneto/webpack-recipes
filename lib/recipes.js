const glob = require('glob');

let recipesFiles = [];

function addRecipesDir(dir) {
  recipesFiles.push(dir);
}

function getRecipes(fromPaths) {
  var recipes = glob()
}

function validate(webpackConfig) {
  return webpackConfig.hasOwnProperty('entry');
}

function init() {
  console.log('init');
}

module.exports = {
  init
};
