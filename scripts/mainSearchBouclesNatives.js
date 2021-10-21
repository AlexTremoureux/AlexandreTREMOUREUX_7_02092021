import {recipes} from './recipes.js'
import { inputTagDevices, inputTagIngredients, inputTagUstensils, listItemsDevices, listItemsIngredients, listItemsUstensils, search } from './constantes.js'
import { displayKeyWords, noRecipesMatch } from './displayFunctions.js';
import { getAppliance, getIngredients, getUstensils } from './searchFunctions.js';
import { comparaison, isInTheArray, normalize } from './utils.js';

export const searchBouclesNatives = () => {
    let arrayRecipesMatch = [];
    const inputValueToLower = normalize(search.value);

    // Affichage des recettes correspondantes aux saisies de l'input
    // Si moins de 3 caractères saisis, affichage des recettes, et des items des différents select non filtrés
    if(inputValueToLower.length < 3) {
        arrayRecipesMatch = recipes
        displayKeyWords(getIngredients(arrayRecipesMatch), inputTagIngredients, listItemsIngredients, arrayRecipesMatch)
        displayKeyWords(getAppliance(arrayRecipesMatch), inputTagDevices, listItemsDevices, arrayRecipesMatch)
        displayKeyWords(getUstensils(arrayRecipesMatch), inputTagUstensils, listItemsUstensils, arrayRecipesMatch)

        return displayRecipes(arrayRecipesMatch);
    };

    // Itération sur la liste de toutes les recettes existantes
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let arrayWordsTitleRecipe = [normalize(recipe.name)];
        let arrayWordsDescriptionRecipe = normalize(recipe.description).split(" ");
        let ingredientsOfRecipe = recipe.ingredients;
        
        // Si le titre de la recette courante correspond à l'input, ajout de la recette au tableau
        for (let j = 0; j < arrayWordsTitleRecipe.length; j++) {
            let isTrue = comparaison(arrayWordsTitleRecipe[j], inputValueToLower);
            if (isTrue) {
                arrayRecipesMatch = [...arrayRecipesMatch, recipe];
            };
        };
        // Si l'id de la recette courante est présente dans le tableau on passe à la recette suivante
        if (isInTheArray(recipe.id, arrayRecipesMatch)) {
            continue;
        };

        // Si un mot de la description de la recette courante correspond à l'input, ajout de la recette au tableau
        for (let k = 0; k < arrayWordsDescriptionRecipe.length; k++) {
            let isTrue = comparaison(arrayWordsDescriptionRecipe[k], inputValueToLower)
            if (isTrue) {
                arrayRecipesMatch = [...arrayRecipesMatch, recipe];
                break;
            };
        };
        // Si l'id de la recette courante est présente dans le tableau on passe à la recette suivante
        if (isInTheArray(recipe.id, arrayRecipesMatch)) {
            continue;
        };

        // Si un des ingrédients de la recette courante correspond à l'input, ajout de la recette au tableau
        for (let m = 0; m < ingredientsOfRecipe.length; m++) {
            const listOfIngredient = ingredientsOfRecipe[m];
            let arrayOfIngredientsRecipe = [normalize(listOfIngredient.ingredient)];
            for (let n = 0; n < arrayOfIngredientsRecipe.length; n++) {
                let isTrue = comparaison(arrayOfIngredientsRecipe[n], inputValueToLower);
                if (isTrue) {
                    arrayRecipesMatch = [...arrayRecipesMatch, recipe];
                };
            } 
        }
    }

    // Si l'array des résultats matchant avec l'input à une longueur de 0, message d'erreur
    if (!arrayRecipesMatch.length) {
        return noRecipesMatch();
    };

     // Sinon, affichage des recettes et des items des différents select filtrés selon les données saisies
     displayKeyWords(getIngredients(arrayRecipesMatch), inputTagIngredients, listItemsIngredients, arrayRecipesMatch)
    displayKeyWords(getAppliance(arrayRecipesMatch), inputTagDevices, listItemsDevices, arrayRecipesMatch)
    displayKeyWords(getUstensils(arrayRecipesMatch), inputTagUstensils, listItemsUstensils, arrayRecipesMatch)
     return displayRecipes(arrayRecipesMatch);
};
