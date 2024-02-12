import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    // // Rendering
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};
controlRecipes();

['hashchange', 'load'].forEach(event => {
  window.addEventListener(event, controlRecipes);
});
