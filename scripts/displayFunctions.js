import { Recipe } from "./classRecipe.js";
import { wrapper } from "./constantes.js";
import { recipes } from "./recipes.js";

// Affichage des recettes à partir d'un array
export const displayAllRecipes = (array) => {
    array.forEach((recipe) => {
      let listeIngredients = [];
      recipe.ingredients.forEach((liste) => {
        listeIngredients.push(liste.ingredient);
      })
      recipe = new Recipe(recipe.name,recipe.time,recipe.ingredients,recipe.description)
    })
}

// Affichage des recettes selon scénarios
export const mainSearchDisplayMatchRecipes = (input, array) => {
    if (input.length <= 2) {
      displayAllRecipes(recipes);
    } else {
      wrapper.innerHTML = '';
      displayAllRecipes(array);
    } if (wrapper.childElementCount === 0) {
      wrapper.innerHTML += `
      <p class="noResult">Aucune recette ne correspond à votre critère... Vous pouvez chercher " tarte aux pommes ", " poisson ", etc.
      </p>
      `
    }
}