import {recipes} from './recipes.js'
import { allIngredients, search } from './constantes.js'
import { displayDevices, displayIngredients, displayRecipes, displayUstensils, noRecipesMatch } from './displayFunctions.js';
import { getAppliance, getIngredients, getUstensils } from './searchFunctions.js';


export const searchFunctionV1 = () => {
    // Utilisation de NFD qui décompose les caractères spéciaux. Le "è" de "Crème" finit par s'exprimer par "e" + "`", ensuite on remplace les caractères spéciaux par "".
    const inputValueToLower = search.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // Retourne les recettes dont le titre inclu la valeur saisie par l'utilisateur
    const resultName = recipes.filter(recipe => recipe.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputValueToLower));
    // Retourne les recettes dont la description inclue la valeur saisie par l'utilisateur
    const resultDescription = recipes.filter(recipe => recipe.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputValueToLower));
    // Retourne les recettes dont les ingrédients incluent la valeur saisie par l'utilisateur
    const resultIngredient = recipes.filter(recipe => recipe.ingredients.map(ingre => ingre.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()).includes(inputValueToLower));
    // Suppression des doublons et création d'un array
    const arrayRecipesMatch = Array.from (new Set ([... resultName, ... resultDescription, ... resultIngredient]));

    // Affichage des recettes correspondantes aux saisies de l'input
    // Si moins de 3 caractères saisis, affichage des recettes, et des items des différents select non filtrés
    if(inputValueToLower.length < 3) {
      displayIngredients(allIngredients)
      return displayRecipes(recipes)
    } if (!arrayRecipesMatch.length) {
      // Si l'array des résultats matchant avec l'input à une longueur de 0, message d'erreur
      return noRecipesMatch()
    }
    // Sinon, affichage des recettes et des items des différents select filtrés selon les données saisies
    displayIngredients(getIngredients(arrayRecipesMatch))
    displayDevices(getAppliance(arrayRecipesMatch))
    displayUstensils(getUstensils(arrayRecipesMatch))
    return displayRecipes(arrayRecipesMatch)
}
