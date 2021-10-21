import {recipes} from './recipes.js'
import { inputTagDevices, inputTagIngredients, inputTagUstensils, listItemsDevices, listItemsIngredients, listItemsUstensils, search } from './constantes.js'
import { displayKeyWords, displayRecipes, noRecipesMatch } from './displayFunctions.js';
import { searchFunctionBuiltIn } from './mainSearchVersionBuiltIn.js';
import { selectDevices, selectIngredient, selectUstensils } from './searchByTags.js';
import { searchBouclesNatives } from './mainSearchBouclesNatives.js';
import { normalize } from './utils.js';
import { getAppliance, getIngredients, getUstensils } from './searchFunctions.js';

let arrayOfRecipes = recipes;

// Affichage de toutes les recettes
displayRecipes(arrayOfRecipes) // recipes

// Initialisation des selects et remplissage des mots clés
selectIngredient(getIngredients(arrayOfRecipes), arrayOfRecipes)
selectDevices(getAppliance(arrayOfRecipes), arrayOfRecipes)
selectUstensils(getUstensils(arrayOfRecipes), arrayOfRecipes)

displayKeyWords(getIngredients(arrayOfRecipes), inputTagIngredients, listItemsIngredients, arrayOfRecipes)
displayKeyWords(getAppliance(arrayOfRecipes), inputTagDevices, listItemsDevices, arrayOfRecipes)
displayKeyWords(getUstensils(arrayOfRecipes), inputTagUstensils, listItemsUstensils, arrayOfRecipes)


// --------------Filtre MainSearch---------------
const filtreMainSearch = (arrayRecipes) => {
  let copieArrayRecipes = arrayRecipes;
  search.addEventListener('keyup', () => {
    // On réinitialise la copie de l'array à sa valeur initiale
    copieArrayRecipes = arrayRecipes;
    const inputValueToLower = normalize(search.value)
    // Si moins de 3 caractères saisis, affichage des recettes, et des items des différents select non filtrés
    if(inputValueToLower.length < 3) {
      return displayRecipes(copieArrayRecipes)
    }
    // On applique le premier filtre correspondant à la valeur de l'input
    copieArrayRecipes = searchFunctionBuiltIn(copieArrayRecipes, inputValueToLower);
    if (!copieArrayRecipes.length) {
      return noRecipesMatch()
    }
    // Affichage des recettes et des items des différents select filtrés selon les données saisies
    displayRecipes(copieArrayRecipes)

    selectIngredient(getIngredients(copieArrayRecipes), copieArrayRecipes)
    selectDevices(getAppliance(copieArrayRecipes), copieArrayRecipes)
    selectUstensils(getUstensils(copieArrayRecipes), copieArrayRecipes)
    
    displayKeyWords(getIngredients(copieArrayRecipes), inputTagIngredients, listItemsIngredients, copieArrayRecipes)
    displayKeyWords(getAppliance(copieArrayRecipes), inputTagDevices, listItemsDevices, copieArrayRecipes)
    displayKeyWords(getUstensils(copieArrayRecipes), inputTagUstensils, listItemsUstensils, copieArrayRecipes)
  })
}

filtreMainSearch(arrayOfRecipes)