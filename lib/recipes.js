const glob = require('glob');

let recipesDirs = [];
let recipesFiles = [];

function setRecipesDirs(directories) {
  directories.map(dir => recipesDirs.push(dir));

  recipesDirs.forEach(directory => {
    glob.sync(directory + '/**/*.js').map(file => recipesFiles.push(file));
  });
}

function getRecipesDirs() {
  return recipesDirs;
}

function getRecipesFiles() {
  return recipesFiles;
}

module.exports = {
  setRecipesDirs,
  getRecipesDirs,
  getRecipesFiles,
};
