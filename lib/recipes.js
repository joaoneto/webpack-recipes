const glob = require('glob');

let recipesDirs = [];
let recipesFiles = [];

function setRecipeDir(directory) {
  recipesDirs.push(directory);
  glob.sync(directory + '/**/*.js').map(file => recipesFiles.push(file));
}

function getRecipesDirs() {
  return recipesDirs;
}

function getRecipesFiles() {
  return recipesFiles;
}

module.exports = {
  setRecipeDir,
  getRecipesDirs,
  getRecipesFiles,
};
