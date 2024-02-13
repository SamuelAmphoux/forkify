import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}${recipeId}`);

    const {
      id,
      title,
      publisher,
      source_url: sourceUrl,
      image_url: image,
      servings,
      cooking_time: cookingTime,
      ingredients,
    } = data.data.recipe;

    state.recipe = {
      id,
      title,
      publisher,
      sourceUrl,
      image,
      servings,
      cookingTime,
      ingredients,
    };
  } catch (err) {
    console.error(`${err} 🧑‍💻`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      const { id, title, publisher, image_url: image } = recipe;
      return {
        id,
        title,
        publisher,
        image,
      };
    });
  } catch (err) {
    console.error(`${err} 🧑‍💻`);
    throw err;
  }
};
