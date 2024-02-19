import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

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
    resultsView.renderSpinner();
    // 1) Get the query from the form input
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (page) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSubmit(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

searchView.getQuery();
