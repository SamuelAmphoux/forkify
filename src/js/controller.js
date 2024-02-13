import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    // // Rendering
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
controlRecipes();

const controlSearchResults = async function () {
  try {
    // 1) Get the query from the form input
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSubmit(controlSearchResults);
};
init();

searchView.getQuery();
