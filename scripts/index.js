import {recipes} from './recipes.js'
import { search } from './constantes.js'
import { displayRecipes } from './displayFunctions.js';
import { searchFunctionV1 } from './mainSearchVersionBuiltIn.js';
import { selectDevices, selectIngredient, selectUstensils } from './searchByTags.js';

// Affichage de toutes les recettes au chargement de la page
displayRecipes(recipes);

// Barre de recherche principale V1
search.addEventListener('keyup', () => {
  searchFunctionV1();
})

// initialisation du select ingredients
selectIngredient();
selectDevices();
selectUstensils();
