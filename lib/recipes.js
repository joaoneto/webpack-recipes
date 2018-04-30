const glob = require('glob');

let recipesDirs = [];
let recipesFiles = [];

function setRecipesDirs(directories) {
  directories.map(dir => recipesDirs.push(dir));
}

function getRecipesDirs() {
  return recipesFiles;
}

function getRecipesFiles() {
  recipesDirs.forEach(directory => {
    glob.sync(directory + '/**/*.js').map(file => recipesFiles.push(file));
  });
  return recipesFiles;
}

module.exports = {
  setRecipesDirs,
  getRecipesDirs,
  getRecipesFiles,
};
