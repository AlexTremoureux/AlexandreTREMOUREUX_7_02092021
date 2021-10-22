import {recipes} from './recipes.js'
import { search } from './constantes.js'
import { displayRecipes, initSelect, noRecipesMatch } from './displayFunctions.js';
import { searchFunctionBuiltIn } from './mainSearchVersionBuiltIn.js';
import { searchBouclesNatives } from './mainSearchBouclesNatives.js';
import { normalize } from './utils.js';

const filters = (() => {

  let copieArrayRecipes = recipes;

  const filterMainSearch = (() => {
    
    search.addEventListener('keyup', () => {
      // On réinitialise l'array à sa valeur initiale
      copieArrayRecipes = recipes;
      const inputValueToLower = normalize(search.value);
      
      // Si moins de 3 caractères saisis, affichage des recettes, et des items des différents select non filtrés
      if(inputValueToLower.length < 3) {
        initSelect(copieArrayRecipes);
        return displayRecipes(copieArrayRecipes);
      };
      // On applique le premier filtre correspondant à la valeur de l'input mainSearch
      copieArrayRecipes = searchFunctionBuiltIn(copieArrayRecipes, inputValueToLower);
      if (!copieArrayRecipes.length) {
        return noRecipesMatch();
      };
      // Affichage des recettes et des items des différents select filtrés selon les données saisies
      initSelect(copieArrayRecipes);
      return displayRecipes(copieArrayRecipes);
    });

  }) ();

  // Si aucune entrée sur l'input, affichage des recettes et des items des différents select non filtrés
  initSelect(copieArrayRecipes);
  return displayRecipes(copieArrayRecipes);
}) ();
