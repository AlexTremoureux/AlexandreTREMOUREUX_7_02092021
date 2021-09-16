import {recipes} from './recipes.js'
import { search } from './constantes.js'
import { displayRecipes, noRecipesMatch } from './displayFunctions.js';

export const searchFunctionV1 = () => {
    const inputValueToLower = search.value.toLowerCase();
    // Retourne les recettes dont le titre inclu la valeur saisie par l'utilisateur
    const resultName = recipes.filter(recipe => recipe.name.toLowerCase().includes(inputValueToLower));
    // Retourne les recettes dont la description inclue la valeur saisie par l'utilisateur
    const resultDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(inputValueToLower));
    // Retourne les recettes dont les ingrédients incluent la valeur saisie par l'utilisateur
    const resultIngredient = recipes.filter(recipe => recipe.ingredients.map(ingre => ingre.ingredient.toLowerCase()).includes(inputValueToLower));
    // Suppression des doublons et création d'un array
    const arrayRecipesMatch = Array.from (new Set ([... resultName, ... resultDescription, ... resultIngredient]));
    // Affichage des recettes correspondantes aux saisies de l'input
    // Si moins de 3 caractères saisis, affichage des recettes non filtrées
    // Si l'array des résultats matchant avec l'input à une longueur de 0, message d'erreur
    // Sinon, affichage des recettes filtrées selon les données saisies
    if(inputValueToLower.length < 3) {
      return displayRecipes(recipes)
    } if (!arrayRecipesMatch.length) {
      return noRecipesMatch()
    }
    return displayRecipes(arrayRecipesMatch)
}
