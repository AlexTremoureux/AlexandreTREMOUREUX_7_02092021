import { Recipe } from "./classRecipe.js";
import { wrapper } from "./constantes.js";

// Si aucun résultat ne match, affichage d'un message avec suggestion de recherche
export const noRecipesMatch = () => {
  wrapper.innerHTML = '';
  wrapper.innerHTML += `
      <p class="noResult">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`
}
// Affichage des recettes à partir d'un array
export const displayRecipes = (array) => {
  wrapper.innerHTML = '';
    array.forEach((recipe) => {
      let listeIngredients = [];
      recipe.ingredients.forEach((liste) => {
        listeIngredients.push(liste.ingredient);
      })
      recipe = new Recipe(recipe.name,recipe.time,recipe.ingredients,recipe.description)
    })
}
